// import { createClient } from "@supabase/supabase-js";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
// 	req: NextApiRequest,
// 	res: NextApiResponse
// ) {
// 	const supabase = createClient(
// 		process.env.NEXT_PUBLIC_SUPABASE_URL || "",
// 		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
// 	);

// 	const filenames = await supabase.storage.from("generated-images").list("");

// 	let data: {
// 		image_name: string;
// 		generated_by: string;
// 		model_used: string;
// 		prompt: string;
// 	}[] = [];

// 	filenames.data?.forEach((filename) => {
// 		data.push({
// 			image_name: filename.name,
// 			generated_by: "t",
// 			model_used: "a",
// 			prompt: "prompt",
// 		});
// 	});

// 	const response = await supabase
// 		.from("generated image records")
// 		.insert(data);

// 	if (response.error) {
// 		console.log("Error occurred ");
// 		res.status(500).json({
// 			success: false,
// 			message: response.error.message,
// 		});
// 	}

// 	res.status(200).json({ success: true });
// }
