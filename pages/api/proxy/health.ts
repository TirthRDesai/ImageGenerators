import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

type Response = {
	message: string;
	error?: string;
};

async function sendTelegram(text: string) {
	const token = process.env.TELEGRAM_BOT_TOKEN;
	const chatId = process.env.TELEGRAM_CHAT_ID;
	if (!token || !chatId) return;

	await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			chat_id: chatId,
			text,
			disable_web_page_preview: true,
		}),
	});
}

const lastSent: Record<string, number> = {};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Response>
) {
	const base = process.env.BACKEND_URL;
	if (!base) {
		return NextResponse.json(
			{ error: "FASTAPI_BASE_URL not set" },
			{ status: 500 }
		);
	}

	const url = new URL(base);
	try {
		const response = await fetch(url.toString(), {
			method: "GET",
		});

		if (!response.ok) {
			const now = Date.now();
			const cooldown =
				Number(process.env.ALERT_COOLDOWN_SECONDS || "600") * 1000;
			const lastTime = lastSent["fastapi"] || 0;
			if (now - lastTime > cooldown) {
				await sendTelegram(
					`⚠️ Alert: FastAPI backend is down! Status: ${response.status}`
				);
				lastSent["fastapi"] = now;
			}
			return res.status(500).json({ message: "FastAPI backend is down" });
		}
		return res.status(200).json({ message: "FastAPI backend is healthy" });
	} catch (error: any) {
		return res.status(500).json({
			message: "Error connecting to FastAPI backend",
			error: error.message,
		});
	}
}
