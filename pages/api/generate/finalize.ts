import { NextApiRequest, NextApiResponse } from "next";
import { backendMessage, gatewayFetch, TOKEN_PATTERN } from "@/utils/gateway";
import { getAuthedUser } from "@/utils/serverAuth";
import { getSupabaseAdmin } from "@/utils/supabaseAdmin";

const BUCKET = "generated-images";

/**
 * Called by the browser once a job reports "completed".
 * Copies the finished image from the backend into Supabase Storage, records it in the gallery,
 * and returns its public URL. Safe to call twice for the same token.
 */
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		return res
			.status(405)
			.json({ message: "Method not allowed", status: false });
	}

	const token = req.body?.token;
	if (typeof token !== "string" || !TOKEN_PATTERN.test(token)) {
		return res
			.status(400)
			.json({ message: "A valid token is required", status: false });
	}

	try {
		const user = await getAuthedUser(req);
		if (!user) {
			return res
				.status(401)
				.json({ message: "Please sign in", status: false });
		}

		const admin = getSupabaseAdmin();
		const path = `${user.id}/${token}.png`;
		const url = admin.storage.from(BUCKET).getPublicUrl(path).data
			.publicUrl;

		const findExisting = async () =>
			(
				await admin
					.from("generated_images")
					.select("id")
					.eq("storage_path", path)
					.maybeSingle()
			).data;

		const existing = await findExisting();
		if (existing) {
			return res.status(200).json({ status: true, url, id: existing.id });
		}

		// The job record is the source of truth for model and prompt, not the browser.
		const statusResponse = await gatewayFetch(
			"/api/status/" + encodeURIComponent(token)
		);
		if (!statusResponse.ok) {
			return res.status(statusResponse.status).json({
				status: false,
				message: await backendMessage(statusResponse, "Job not found"),
			});
		}
		const job = await statusResponse.json();
		if (job.username !== user.username) {
			return res
				.status(404)
				.json({ message: "Job not found", status: false });
		}
		if (job.status !== "completed") {
			return res
				.status(409)
				.json({ message: "The image is not ready yet", status: false });
		}

		const imageResponse = await gatewayFetch(
			"/api/get_image/" + encodeURIComponent(token),
			{ signal: AbortSignal.timeout(60_000) }
		);
		if (!imageResponse.ok) {
			return res.status(imageResponse.status).json({
				status: false,
				message: await backendMessage(
					imageResponse,
					"Failed to get image"
				),
			});
		}
		const image = Buffer.from(await imageResponse.arrayBuffer());

		const upload = await admin.storage.from(BUCKET).upload(path, image, {
			contentType: imageResponse.headers.get("content-type") ?? "image/png",
			upsert: true,
		});
		if (upload.error) throw upload.error;

		const inserted = await admin
			.from("generated_images")
			.insert({
				user_id: user.id,
				username: user.username,
				model_id: job.model_id,
				prompt: job.prompt,
				storage_path: path,
			})
			.select("id")
			.single();

		let id: number | undefined = inserted.data?.id;
		if (inserted.error) {
			// A concurrent request saved the same image first.
			if (inserted.error.code !== "23505") throw inserted.error;
			id = (await findExisting())?.id;
		}

		// Free the job in the backend's memory. Best effort: the image is already safe in Supabase.
		// Awaited: a serverless function may be frozen as soon as it has responded.
		await gatewayFetch("/api/delete/" + encodeURIComponent(token), {
			method: "DELETE",
			signal: AbortSignal.timeout(5_000),
		}).catch(() => {});

		return res.status(200).json({ status: true, url, id });
	} catch (error) {
		console.error("finalize failed", error);
		return res
			.status(502)
			.json({ status: false, message: "Could not save the image" });
	}
}
