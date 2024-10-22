import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { from, to } = req.body;

	const url =
		"https://picsum.photos/v2/list?page=" + (from / 12 + 1) + "&limit=12";

	const response = await fetch(url);
	const data = await response.json();

	return res.status(200).json({
		success: true,
		message: "Image Data Fetched Successfully",
		data,
	});
}
