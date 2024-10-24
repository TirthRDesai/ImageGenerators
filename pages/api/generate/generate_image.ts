import Jobs, { JobType } from "@/models/Jobs";
import { ModelData } from "@/models/ModelData";
import { ModelDataType } from "@/types";
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

	// let job_appended = false;
	// let job_id = "";
	// while (!job_appended) {
	// 	job_id = generateJobId().trim();
	// 	job_appended = Jobs.some((item) => item.job_id === job_id);
	// 	if (!job_appended) {
	// 		const data: JobType = {
	// 			job_id,
	// 			username,
	// 			prompt,
	// 			model_id,
	// 			status: "pending",
	// 			res: null,
	// 			url: "",
	// 			err: null,
	// 		};
	// 		Jobs.push(data);
	// 		break;
	// 	}
	// }
	// console.log("/////////////////////////////////////////////////////");
	// console.log(Jobs);
	// console.log("/////////////////////////////////////////////////////");

	// res.status(200).json({
	// 	job_id,
	// 	message: "Job Started Successfully",
	// 	code: 200,
	// });

	const { response, url, err } = await generate({
		username,
		model_data,
		prompt,
	});

	if (err) {
		res.status(500).json({ err });
		return;
	}

	return res.status(200).json({
		res: response,
		url,
		err,
	});
}

function generateJobId() {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = " ";
	const charactersLength = characters.length;
	for (let i = 0; i < 30; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		);
	}

	return result;
}

async function generate({
	username,
	model_data,
	prompt,
	job_id,
}: {
	username: string;
	model_data: ModelDataType;
	prompt: string;
	job_id?: string;
}) {
	console.log("Generating Image");
	const run = model_data.query;

	const { response, url, err } = await run(prompt)
		.then(async (response: Blob) => {
			console.log("Image Generated");
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

	const job_index = Jobs.findIndex((item) => item.job_id === job_id);
	if (job_index !== -1) {
		console.log("Updating Job");
		Jobs[job_index].status = "complete";
		Jobs[job_index].res = response;
		Jobs[job_index].url = url;
		Jobs[job_index].err = err;
		console.log("Job Updated");
		console.log(Jobs[job_index]);
		console.log(Jobs);
	}

	return {
		response,
		url,
		err,
	};

	// return res.status(200).json({
	// 	res: response,
	// 	url,
	// 	err,
	// });
}
