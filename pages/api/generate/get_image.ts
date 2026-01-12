import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { token } = req.query;
	if (!token || typeof token !== "string") {
		return res
			.status(400)
			.json({ message: "Token is required", status: false });
	}

	const url =
		"https://imgenerator.td-server.com/generate/get_image/" + token;
	const response = await fetch(url);
	if (!response.ok) {
		return res
			.status(500)
			.json({ message: "Failed to fetch image", status: false });
	}

	const data = await response.json();
	if (!data.status) {
		return res
			.status(500)
			.json({ message: data.message || "Failed to get image", status: false });
	}

	return res.status(200).json(data.data);
}
