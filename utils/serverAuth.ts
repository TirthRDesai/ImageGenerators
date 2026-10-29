import type { NextApiRequest } from "next";
import { getSupabaseAdmin } from "@/utils/supabaseAdmin";

export interface AuthedUser {
	id: string;
	username: string;
	email: string | undefined;
}

/**
 * Identifies the signed-in user from the `Authorization: Bearer <access token>` header
 * (see utils/authFetch.ts). Returns null when the token is missing or invalid.
 * The username comes from the profiles table, never from the request body.
 */
export async function getAuthedUser(
	req: NextApiRequest
): Promise<AuthedUser | null> {
	const header = req.headers.authorization;
	const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
	if (!token) return null;

	const admin = getSupabaseAdmin();
	const { data, error } = await admin.auth.getUser(token);
	if (error || !data.user) return null;

	const { data: profile } = await admin
		.from("profiles")
		.select("username")
		.eq("id", data.user.id)
		.maybeSingle();
	if (!profile) return null;

	return {
		id: data.user.id,
		username: profile.username,
		email: data.user.email,
	};
}
