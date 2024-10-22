import { ModelData } from "@/models/ModelData";
import { supabase } from "@/utils/supabase";
import { decode } from "base64-arraybuffer";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { model_id, prompt, username } = req.body;

	const model_data = ModelData.find((value, index) => {
		return value.id === parseInt(model_id);
	});

	if (!model_data) {
		res.status(404).json({ err: "Model not found" });
		return;
	}

	if (!username) {
		res.status(400).json({ err: "Username is required" });
		return;
	}

	if (!prompt) {
		res.status(400).json({ err: "Prompt is required" });
		return;
	}

	const run = model_data.query;

	const { response, url, err } = await run(prompt)
		.then(async (response: Blob) => {
			const url = URL.createObjectURL(response);
			console.log(url);
			const { data, error } = await supabase
				.from("generated image records")
				.insert({
					generated_by: username,
					model_used: model_data.id,
					prompt: prompt,
				})
				.select();

			if (error) {
				return { response: null, url: "", err: error };
			}
			const filename = `generated_${data[0].image_name}.jpg`;
			const buffer = Buffer.from(await response.arrayBuffer());

			const file = new File([buffer], filename, {
				type: "image/jpeg",
			});

			const { data: file_response, error: file_error } =
				await supabase.storage
					.from("generated-images")
					.upload(filename, file, {
						contentType: "image/jpeg",
					});

			if (file_error) {
				return { response: null, url: "", err: file_error };
			}
			URL.revokeObjectURL(url);

			const response3 = await supabase.storage
				.from("generated-images")
				.createSignedUrl(filename, 60 * 60 * 24 * 7);

			if (response3.error) {
				console.error(response3.error);
				return { response: null, url: "", err: response3.error };
			}

			return { response, url: response3.data.signedUrl, err: null };
		})
		.catch((err: any) => {
			return { response: null, url: "", err: err };
		});

	return res.status(200).json({
		res: response,
		url,
		err,
	});
}
