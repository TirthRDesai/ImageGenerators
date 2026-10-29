import { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";
import { backendMessage, gatewayFetch } from "@/utils/gateway";
import { getAuthedUser } from "@/utils/serverAuth";

const MAX_PROMPT_LENGTH = 4000;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		return res
			.status(405)
			.json({ message: "Method not allowed", status: false });
	}

	const { model_id, prompt } = req.body ?? {};
	if (
		typeof model_id !== "string" ||
		typeof prompt !== "string" ||
		!prompt.trim() ||
		prompt.length > MAX_PROMPT_LENGTH
	) {
		return res.status(400).json({
			message: "A model and a prompt (up to 4000 characters) are required",
			status: false,
		});
	}

	try {
		// The username comes from the verified session, never from the request body.
		const user = await getAuthedUser(req);
		if (!user) {
			return res
				.status(401)
				.json({ message: "Please sign in", status: false });
		}

		const user_token = nanoid(16);
		const response = await gatewayFetch("/api/generate", {
			method: "POST",
			body: JSON.stringify({
				model_id,
				prompt,
				username: user.username,
				user_token,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			return res.status(response.status).json({
				status: false,
				message: await backendMessage(
					response,
					"Image generation failed"
				),
			});
		}

		const data = await response.json();
		return res
			.status(200)
			.json({ status: true, token: data.token ?? user_token });
	} catch (error) {
		console.error("generate_image failed", error);
		return res
			.status(502)
			.json({ status: false, message: "Image backend is unavailable" });
	}
}
