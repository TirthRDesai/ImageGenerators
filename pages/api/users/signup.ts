import { supabase } from "@/utils/supabase";
import { NextApiRequest, NextApiResponse } from "next";
import CryptoJS from "crypto-js";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const body: {
		username: string;
		password: string;
		name: string;
		email: string;
	} = req.body;

	const { username, password, name, email } = body;

	const response = await supabase
		.from("users")
		.insert({
			username,
			name,
			email,
			password: CryptoJS.AES.encrypt(
				password,
				process.env.ENCRYPTION_KEY || ""
			).toString(),
		})
		.select();

	if (response.error) {
		res.status(400).json({ error: response.error.message });
		return;
	}

	res.status(200).json({
		message: "User created successfully",
		data: response.data[0],
	});
}
