import Background from "@/components/Dashboard/Background";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link
					rel="icon"
					href="/favicon.png"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			<body className="antialiased h-full w-full text-foreground">
				<Background />
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
