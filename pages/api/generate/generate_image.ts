import { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		return res
			.status(405)
			.json({ message: "Method not allowed", status: false });
	}

	const { model_id, prompt, username } = req.body;
	const user_token = nanoid(16);
	const response = await fetch(
		"https://imgenerator.td-server.com/generate/image",
		{
			method: "POST",
			body: JSON.stringify({ model_id, prompt, username, user_token }),

			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	const data = await response.json();
	if (response.status != 200) {
		return res.status(response.status).json({ err: data.message });
	}

	return res.status(200).json(data);
}
