import { NextApiRequest, NextApiResponse } from "next";
import { getSupabaseAdmin } from "@/utils/supabaseAdmin";

const USERNAME_PATTERN = /^[a-z0-9_]{3,24}$/;
const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		return res
			.status(405)
			.json({ message: "Method not allowed", status: false });
	}

	const { name, email, username, password } = req.body ?? {};
	if (
		typeof name !== "string" ||
		typeof email !== "string" ||
		typeof username !== "string" ||
		typeof password !== "string"
	) {
		return res
			.status(400)
			.json({ message: "All fields are required", status: false });
	}

	const cleanUsername = username.trim().toLowerCase();
	const cleanEmail = email.trim().toLowerCase();
	const cleanName = name.trim().slice(0, 80);

	if (!USERNAME_PATTERN.test(cleanUsername)) {
		return res.status(400).json({
			message:
				"Username must be 3-24 characters: lowercase letters, numbers or underscore",
			status: false,
		});
	}
	if (!EMAIL_PATTERN.test(cleanEmail)) {
		return res
			.status(400)
			.json({ message: "Enter a valid email address", status: false });
	}
	if (password.length < 8 || password.length > 72) {
		return res.status(400).json({
			message: "Password must be 8-72 characters",
			status: false,
		});
	}

	try {
		const admin = getSupabaseAdmin();

		const taken = await admin
			.from("profiles")
			.select("id")
			.eq("username", cleanUsername)
			.maybeSingle();
		if (taken.data) {
			return res
				.status(409)
				.json({ message: "That username is already taken", status: false });
		}

		// The profile row is created by a database trigger from user_metadata.
		// Accounts are created pre-verified, so no confirmation email is sent.
		const { error } = await admin.auth.admin.createUser({
			email: cleanEmail,
			password,
			email_confirm: true,
			user_metadata: { username: cleanUsername, name: cleanName },
		});
		if (error) {
			if (/already|registered|exists/i.test(error.message)) {
				return res.status(409).json({
					message: "An account with this email already exists",
					status: false,
				});
			}
			console.error("signup failed", error);
			return res
				.status(400)
				.json({ message: "Could not create the account", status: false });
		}

		return res
			.status(201)
			.json({ message: "Account created", status: true });
	} catch (error) {
		console.error("signup failed", error);
		return res
			.status(500)
			.json({ message: "Could not create the account", status: false });
	}
}
