import type { NextApiRequest, NextApiResponse } from "next";

async function sendTelegram(text: string) {
	const token = process.env.TELEGRAM_BOT_TOKEN;
	const chatId = process.env.TELEGRAM_CHAT_ID;
	if (!token || !chatId) return;

	const res = await fetch(
		`https://api.telegram.org/bot${token}/sendMessage`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				chat_id: chatId,
				text,
				disable_web_page_preview: true,
			}),
		},
	);
	return res;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "POST") {
		const { name, email, topic, message } = req.body;

		if (!name || !email || !topic || !message) {
			return res.status(400).json({ error: "All fields are required." });
		}
		const msg =
			"Contact Form Submission from IM-G-enerators:\n" +
			`Name: ${name}\n` +
			`Email: ${email}\n` +
			`Topic: ${topic}\n` +
			`Message: ${message}`;
		const msg_res = await sendTelegram(msg);
		if (!msg_res || !msg_res.ok) {
			return res
				.status(500)
				.json({ error: "Failed to send message via Telegram." });
		}
		res.status(200).json({ message: "Message sent successfully." });
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
