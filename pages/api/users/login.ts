import { supabase } from "@/utils/supabase";
import { NextApiRequest, NextApiResponse } from "next";
import CryptoJS from "crypto-js";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		return res
			.status(405)
			.json({ message: "Method not allowed", status: false });
	}

	const body: {
		username: string;
		password: string;
		is_encrypted: boolean;
	} = req.body;

	const { username, password, is_encrypted } = body;

	const response = await fetch(
		"https://imgenerator.td-server.com/auth/login",
		{
			method: "POST",
			body: JSON.stringify({ username, password, is_encrypted }),
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	if (response.status != 200) {
		return res
			.status(response.status)
			.json({ message: "Invalid credentials" });
	}
	const data = await response.json();
	console.log(data);
	return res
		.status(200)
		.json({ message: "Login successful", data: data.user });
}
