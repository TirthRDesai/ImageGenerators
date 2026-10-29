import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
import { getSupabaseAdmin } from "@/utils/supabaseAdmin";

/**
 * Accepts a username or an email plus a password. Usernames are resolved to an email here,
 * on the server, so emails are never exposed to the browser.
 * Returns the session tokens; the browser hands them to supabase.auth.setSession().
 */
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		return res
			.status(405)
			.json({ message: "Method not allowed", status: false });
	}

	const { username, password } = req.body ?? {};
	if (typeof username !== "string" || typeof password !== "string") {
		return res
			.status(400)
			.json({ message: "Username and password are required", status: false });
	}

	// Same answer for "no such user" and "wrong password".
	const invalid = () =>
		res.status(401).json({ message: "Invalid credentials", status: false });

	try {
		const admin = getSupabaseAdmin();
		const identifier = username.trim().toLowerCase();

		let email: string | null = identifier.includes("@") ? identifier : null;
		if (!email) {
			const profile = await admin
				.from("profiles")
				.select("id")
				.eq("username", identifier)
				.maybeSingle();
			if (profile.data) {
				const found = await admin.auth.admin.getUserById(profile.data.id);
				email = found.data.user?.email ?? null;
			}
		}
		if (!email) return invalid();

		const anon = createClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
			{ auth: { persistSession: false, autoRefreshToken: false } }
		);
		const { data, error } = await anon.auth.signInWithPassword({
			email,
			password,
		});
		if (error || !data.session) return invalid();

		const profile = await admin
			.from("profiles")
			.select("username, name")
			.eq("id", data.user.id)
			.maybeSingle();

		return res.status(200).json({
			message: "Login successful",
			status: true,
			session: {
				access_token: data.session.access_token,
				refresh_token: data.session.refresh_token,
			},
			data: {
				id: data.user.id,
				email: data.user.email,
				username: profile.data?.username,
				name: profile.data?.name,
			},
		});
	} catch (error) {
		console.error("login failed", error);
		return res
			.status(500)
			.json({ message: "Login is unavailable right now", status: false });
	}
}
