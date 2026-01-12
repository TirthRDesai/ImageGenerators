import Jobs, { JobType } from "@/models/Jobs";
import { ModelData } from "@/models/ModelData";
import { ModelDataType } from "@/types";
import { supabase } from "@/utils/supabase";
import { decode } from "base64-arraybuffer";
import { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { model_id, prompt, username } = req.body;
	const user_token = nanoid(16);
	const response = await fetch(
		"https://imgenerator.td-server.com/generate/image",
		{
			method: "POST",
			body: JSON.stringify({ model_id, prompt, username, user_token }),

			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	const data = await response.json();
	if (response.status != 200) {
		return res.status(response.status).json({ err: data.message });
	}

	return res.status(200).json(data);
}
