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
		name: string;
		email: string;
	} = req.body;

	const { username, password, name, email } = body;

	const response = await fetch(
		"https://imgenerator.td-server.com/auth/signup",
		{
			method: "POST",
			body: JSON.stringify({ username, password, name, email }),
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	const data = await response.json();
	console.log(data);
	return res
		.status(200)
		.json({ message: "User created successfully", data: data.user });
}
