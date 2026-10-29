import { supabase } from "@/utils/supabase";

/** fetch() for our own API routes, with the signed-in user's access token attached. Browser-side only. */
export async function authFetch(
	input: RequestInfo | URL,
	init: RequestInit = {}
): Promise<Response> {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const headers = new Headers(init.headers);
	if (session) headers.set("Authorization", `Bearer ${session.access_token}`);

	return fetch(input, { ...init, headers });
}
