import { ModelData } from "@/models/ModelData";
import { supabase } from "@/utils/supabase";

export default async function GenerateImageFunction(body: any) {
	return;
	// const { model_id, prompt, username } = body;

	// const model_data = ModelData.find((value, index) => {
	// 	return value.model_id === model_id;
	// });

	// if (!model_data) {
	// 	return { err: "Model not found", status: 400 };
	// }

	// if (!username) {
	// 	return { err: "Username is required", status: 400 };
	// }

	// if (!prompt) {
	// 	return { err: "Prompt is required", status: 400 };
	// }

	// const { response, url, err } = await generate({
	// 	username,
	// 	model_id,
	// 	prompt,
	// });

	// if (err) {
	// 	return { err, status: 400 };
	// }

	// return {
	// 	res: response,
	// 	url,
	// 	err,
	// 	status: 200,
	// };
}

async function generate({
	username,
	model_id,
	prompt,
}: {
	username: string;
	model_id: string;
	prompt: string;
}) {
	console.log("Generating Image");

	// const run = model_data.query;

	// const { response, url, err } = await run(prompt)
	// 	.then(async (response: Blob) => {
	// 		console.log("Image Generated");
	// 		const url = URL.createObjectURL(response);
	// 		console.log(url);
	// 		const { data, error } = await supabase
	// 			.from("generated image records")
	// 			.insert({
	// 				generated_by: username,
	// 				model_used: model_data.id,
	// 				prompt: prompt,
	// 			})
	// 			.select();

	// 		if (error) {
	// 			return { response: null, url: "", err: error };
	// 		}
	// 		const filename = `generated_${data[0].image_name}.jpg`;
	// 		const buffer = Buffer.from(await response.arrayBuffer());

	// 		const file = new File([buffer], filename, {
	// 			type: "image/jpeg",
	// 		});

	// 		const { data: file_response, error: file_error } =
	// 			await supabase.storage
	// 				.from("generated-images")
	// 				.upload(filename, file, {
	// 					contentType: "image/jpeg",
	// 				});

	// 		if (file_error) {
	// 			return { response: null, url: "", err: file_error };
	// 		}
	// 		URL.revokeObjectURL(url);

	// 		const response3 = await supabase.storage
	// 			.from("generated-images")
	// 			.createSignedUrl(filename, 60 * 60 * 24 * 7);

	// 		if (response3.error) {
	// 			console.error(response3.error);
	// 			return { response: null, url: "", err: response3.error };
	// 		}

	// 		return { response, url: response3.data.signedUrl, err: null };
	// 	})
	// 	.catch((err: any) => {
	// 		return { response: null, url: "", err: err };
	// 	});

	// const job_index = Jobs.findIndex((item) => item.job_id === job_id);
	// if (job_index !== -1) {
	// 	console.log("Updating Job");
	// 	Jobs[job_index].status = "complete";
	// 	Jobs[job_index].res = response;
	// 	Jobs[job_index].url = url;
	// 	Jobs[job_index].err = err;
	// 	console.log("Job Updated");
	// 	console.log(Jobs[job_index]);
	// 	console.log(Jobs);
	// }

	// return {
	// 	response,
	// 	url,
	// 	err,
	// };
}
