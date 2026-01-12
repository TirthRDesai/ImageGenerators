import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// GET TOKEN
	const tokenFromQuery = req.query.token;
	const tokenFromBody = req.body?.token;
	const token =
		typeof tokenFromQuery === "string" ? tokenFromQuery : tokenFromBody;

	if (req.method !== "GET" && req.method !== "POST") {
		return res
			.status(405)
			.json({ message: "Method not allowed", status: false });
	}

	if (!token || typeof token !== "string") {
		return res
			.status(400)
			.json({ message: "Token is required", status: false });
	}

	// CHECK STATUS

	const url =
		"https://imgenerator.td-server.com/generate/get_status/" + token;
	const response = await fetch(url, { method: "GET" });
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
