import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// GET TOKEN

	const { token } = req.query;
	if (!token || typeof token !== "string") {
		return res
			.status(400)
			.json({ message: "Token is required", status: false });
	}

	// CHECK STATUS

	const url =
		"https://imgenerator.td-server.com/generate/get_status/" + token;
	const response = await fetch(url);
	if (!response.ok) {
		return res
			.status(500)
			.json({ message: "Failed to fetch status", status: false });
	}

	const data = await response.json();
	console.log(data);
	if (!data.status) {
		return res
			.status(500)
			.json({ message: "Failed to get status", status: false });
	}
	return res.status(200).json(data.data);
}
