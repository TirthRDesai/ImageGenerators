import { GeneratedImageRecords } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import { publicImageUrl, supabase } from "@/utils/supabase";

type Response = {
	message: string;
	data?: GeneratedImageRecords[];
};

const MAX_PAGE_SIZE = 50;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Response>
) {
	if (req.method !== "POST" && req.method !== "GET") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	// Inclusive row range, e.g. from=0, to=11 for the first page of 12.
	const from = Number(
		typeof req.query.from === "string" ? req.query.from : req.body?.from ?? 0
	);
	const to = Number(
		typeof req.query.to === "string" ? req.query.to : req.body?.to ?? 10
	);
	if (
		!Number.isInteger(from) ||
		!Number.isInteger(to) ||
		from < 0 ||
		to < from ||
		to - from >= MAX_PAGE_SIZE
	) {
		return res.status(400).json({ message: "Invalid range" });
	}

	// The gallery is public: Row Level Security allows anyone to read generated_images.
	const { data, error } = await supabase
		.from("generated_images")
		.select("id, created_at, username, model_id, prompt, storage_path")
		.order("created_at", { ascending: false })
		.order("id", { ascending: false })
		.range(from, to);

	if (error) {
		console.error("FetchRecords failed", error);
		return res.status(500).json({ message: "Error fetching image records" });
	}

	return res.status(200).json({
		message: "Image records fetched successfully",
		data: data.map((row) => ({
			id: row.id,
			created_at: row.created_at,
			image_name: row.storage_path.split("/").pop(),
			generated_by: row.username,
			model_used: row.model_id,
			prompt: row.prompt,
			url: publicImageUrl(row.storage_path),
		})),
	});
}
