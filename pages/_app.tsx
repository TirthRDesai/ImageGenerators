import { ContextProvider, useUser } from "@/context/context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CheckForNavbar from "@/components/CheckForNavbar";
import { ThemeProvider } from "@/components/theme-provider";
import { ModelsContextProvider } from "@/context/ModelsContext";
import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="dark"
			disableTransitionOnChange
		>
			<ContextProvider>
				<ModelsContextProvider>
					<QueryClientProvider client={queryClient}>
						<CheckForNavbar />
						<Component {...pageProps} />
						<Toaster />
					</QueryClientProvider>
				</ModelsContextProvider>
			</ContextProvider>
		</ThemeProvider>
	);
}
