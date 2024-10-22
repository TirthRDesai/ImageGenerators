import { GeneratedImageRecords } from "@/types";
import { supabase } from "@/utils/supabase";
import { NextApiRequest, NextApiResponse } from "next";

type Response = {
	message: string;
	data?: GeneratedImageRecords[];
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Response>
) {
	const { from, to } = req.body;

	try {
		let imageRecords = await FetchImageRecords(from, to);

		for (let i = 0; i < imageRecords.length; i = i + 1) {
			const record = imageRecords[i];

			const url_response = await supabase.storage
				.from("generated-images")
				.createSignedUrl(
					"generated_" + record.image_name + ".jpg",
					60 * 60 * 24,
					{
						download: false,
					}
				);

			if (url_response.error) {
				console.error(url_response.error);
				continue;
			}

			imageRecords[i].url = url_response.data.signedUrl;
		}

		return res.status(200).json({
			message: "Image records fetched successfully",
			data: imageRecords,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error fetching image records" });
	}
}

const FetchImageRecords = async (from: number, to: number) => {
	const { data, error } = await supabase
		.from("generated image records")
		.select("*")
		.range(from, to)
		.order("created_at", { ascending: false });

	if (error) {
		throw new Error(error.message);
	}
	return data;
};
