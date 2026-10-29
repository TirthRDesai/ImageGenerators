/**
 * Server-side client for the Cloudflare Gateway in front of the image backend.
 *
 * API routes run on Vercel's servers, so there is no browser Origin header to route on.
 * The gateway identifies this site by X-Site-Id + X-Gateway-Key instead.
 * Server-only: never import this from browser code, it reads secrets.
 */
export async function gatewayFetch(
	path: string,
	init: RequestInit = {}
): Promise<Response> {
	const base = process.env.GATEWAY_URL;
	const siteId = process.env.GATEWAY_SITE_ID;
	const key = process.env.GATEWAY_KEY;
	if (!base || !siteId || !key) {
		throw new Error(
			"GATEWAY_URL, GATEWAY_SITE_ID and GATEWAY_KEY must all be set"
		);
	}

	const headers = new Headers(init.headers);
	headers.set("X-Site-Id", siteId);
	headers.set("X-Gateway-Key", key);

	return fetch(new URL(path, base), {
		...init,
		headers,
		signal: init.signal ?? AbortSignal.timeout(20_000),
	});
}

/** FastAPI errors use `detail`; the gateway's own errors use `message`. */
export async function backendMessage(
	response: Response,
	fallback: string
): Promise<string> {
	const body = await response.json().catch(() => null);
	const detail = body?.detail ?? body?.message;
	return typeof detail === "string" ? detail : fallback;
}

export const TOKEN_PATTERN = /^[\w-]{8,64}$/;
