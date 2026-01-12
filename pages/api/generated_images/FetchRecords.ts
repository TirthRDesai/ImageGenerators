import { GeneratedImageRecords } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

type Response = {
	message: string;
	data?: GeneratedImageRecords[];
};

const getBackendBaseUrl = () => {
	return (
		process.env.NEXT_PUBLIC_BACKEND_URL ||
		process.env.BACKEND_URL ||
		"https://imgenerator.td-server.com"
	);
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Response>
) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const { from = 0, to = 10 } = req.body ?? {};

	try {
		const baseUrl = getBackendBaseUrl();
		const url = new URL("/generate/fetch_generated_images/", baseUrl);
		url.searchParams.set("ffrom", String(from));
		url.searchParams.set("to", String(to));

		const response = await fetch(url.toString(), {
			method: "POST",
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error("Backend error:", response.status, errorText);
			return res
				.status(500)
				.json({ message: "Error fetching image records" });
		}

		const payload = await response.json();

		return res.status(200).json({
			message: payload?.message || "Image records fetched successfully",
			data: payload?.data || [],
		});
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: "Error fetching image records" });
	}
}
