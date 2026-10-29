import { NextApiRequest, NextApiResponse } from "next";
import { backendMessage, gatewayFetch, TOKEN_PATTERN } from "@/utils/gateway";
import { getAuthedUser } from "@/utils/serverAuth";

/**
 * Returns { status: "queued" | "running" | "completed" | "failed", error } for the signed-in user's own job.
 * Only these fields are passed on: the backend's job record also contains server file paths.
 */
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "GET" && req.method !== "POST") {
		return res
			.status(405)
			.json({ message: "Method not allowed", status: false });
	}

	const tokenFromQuery = req.query.token;
	const tokenFromBody = req.body?.token;
	const token =
		typeof tokenFromQuery === "string" ? tokenFromQuery : tokenFromBody;

	if (typeof token !== "string" || !TOKEN_PATTERN.test(token)) {
		return res
			.status(400)
			.json({ message: "A valid token is required", status: false });
	}

	res.setHeader("Cache-Control", "no-store");
	try {
		const user = await getAuthedUser(req);
		if (!user) {
			return res
				.status(401)
				.json({ message: "Please sign in", status: false });
		}

		const response = await gatewayFetch(
			"/api/status/" + encodeURIComponent(token)
		);
		if (!response.ok) {
			return res.status(response.status).json({
				status: false,
				message: await backendMessage(
					response,
					"Failed to fetch status"
				),
			});
		}

		const job = await response.json();
		if (job.username !== user.username) {
			return res
				.status(404)
				.json({ status: false, message: "Job not found" });
		}
		return res.status(200).json({
			status: job.status,
			error: job.error ?? null,
		});
	} catch (error) {
		console.error("status failed", error);
		return res
			.status(502)
			.json({ status: false, message: "Image backend is unavailable" });
	}
}
