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
		is_encrypted: boolean;
	} = req.body;

	const { username, password, is_encrypted } = body;

	const response = await supabase
		.from("users")
		.select("*")
		.eq("username", username);

	if (response.error) {
		return res.status(400).json({ error: response.error.message });
	}

	let decryptedPassword = "";
	if (response.data && response.data.length > 0) {
		decryptedPassword = CryptoJS.AES.decrypt(
			response.data[0].password,
			process.env.ENCRYPTION_KEY || ""
		).toString(CryptoJS.enc.Utf8);
	}

	let decryptedPassword2 = password;
	if (is_encrypted == true) {
		decryptedPassword2 = CryptoJS.AES.decrypt(
			response.data[0].password,
			process.env.ENCRYPTION_KEY || ""
		).toString(CryptoJS.enc.Utf8);
	}

	if (decryptedPassword === decryptedPassword2) {
		return res
			.status(200)
			.json({ message: "Login successful", data: response.data[0] });
	} else {
		console.log(
			"Wrong Password: " + decryptedPassword + " " + decryptedPassword2
		);
		return res.status(401).json({ message: "Invalid credentials" });
	}
}
