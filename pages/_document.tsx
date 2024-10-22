import Background from "@/components/Dashboard/Background";
import { Toaster } from "@/components/ui/toaster";
import { Html, Head, Main, NextScript } from "next/document";
import { ThemeProvider } from "@/components/theme-provider";

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body className="antialiased">
				<Background />
				<Main />
				<NextScript />
				<Toaster />
			</body>
		</Html>
	);
}
