import { createClient, SupabaseClient } from "@supabase/supabase-js";

let admin: SupabaseClient | null = null;

/**
 * Supabase client with the service role key: bypasses Row Level Security.
 * Server-only (API routes). Never import this from browser code.
 */
export function getSupabaseAdmin(): SupabaseClient {
	if (!admin) {
		const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
		const key =
			process.env.SUPABASE_SERVICE_ROLE_KEY ??
			process.env.SERVICE_ROLE_SECRET;
		if (!url || !key) {
			throw new Error(
				"NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SERVICE_ROLE_SECRET) must be set"
			);
		}
		admin = createClient(url, key, {
			auth: { persistSession: false, autoRefreshToken: false },
		});
	}
	return admin;
}
