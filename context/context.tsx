import { Users } from "@/types";
import { toast } from "sonner";
import {
	createContext,
	useState,
	ReactNode,
	useContext,
	useEffect,
	useRef,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";

export type pageType =
	| "login"
	| "signup"
	| "forgotpassword"
	| "Home"
	| "Models"
	| "Contact";

interface ContextType {
	user: Users | null;
	isLoggedIn: boolean;
	/** False until the stored session (if any) has been checked. */
	authReady: boolean;
	/** `username` may also be an email address. */
	login: (username: string, password: string) => Promise<boolean>;
	signup: (
		name: string,
		email: string,
		username: string,
		password: string
	) => Promise<boolean>;
	logout: () => void;
	page: pageType | "login";
	setPage: (page: pageType) => void;
}

const context = createContext<ContextType | undefined>(undefined);

let hasCheckedHealthOnce = false;

export const ContextProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<Users | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [authReady, setAuthReady] = useState<boolean>(false);
	const [serverHealth, setServerHealth] = useState<boolean>(true);
	const previousServerHealth = useRef(serverHealth);

	const updateServerHealth = (nextHealth: boolean) => {
		if (previousServerHealth.current && !nextHealth) {
			toast.error(
				"Backend service is down. We have notified the admins. Please try again later.",
				{ duration: 8000, position: "bottom-right" }
			);
		}
		previousServerHealth.current = nextHealth;
		setServerHealth(nextHealth);
	};

	const checkServerHealth = async () => {
		let didCancel = false;
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 6000);

		try {
			const response = await fetch("/api/proxy/health", {
				cache: "no-store",
				signal: controller.signal,
			});
			if (didCancel) return false;
			const isHealthy = response.ok;
			updateServerHealth(isHealthy);
			return isHealthy;
		} catch {
			if (didCancel) return false;
			updateServerHealth(false);
			return false;
		} finally {
			clearTimeout(timeoutId);
		}
	};

	useEffect(() => {
		if (hasCheckedHealthOnce) return;
		hasCheckedHealthOnce = true;
		checkServerHealth();
	}, []);

	// The Supabase session is the single source of truth for who is signed in.
	useEffect(() => {
		let active = true;

		const applySession = async (session: Session | null) => {
			if (!session) {
				if (!active) return;
				setUser(null);
				setIsLoggedIn(false);
				setAuthReady(true);
				return;
			}
			const { data } = await supabase
				.from("profiles")
				.select("id, username, name")
				.eq("id", session.user.id)
				.maybeSingle();
			if (!active) return;
			if (data) {
				setUser({
					id: data.id,
					username: data.username,
					name: data.name,
					email: session.user.email ?? "",
				});
				setIsLoggedIn(true);
			} else {
				setUser(null);
				setIsLoggedIn(false);
			}
			setAuthReady(true);
		};

		supabase.auth.getSession().then(({ data }) => applySession(data.session));
		const { data: listener } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				// Deferred: calling Supabase from inside this callback can deadlock the client.
				setTimeout(() => void applySession(session), 0);
			}
		);

		return () => {
			active = false;
			listener.subscription.unsubscribe();
		};
	}, []);

	const login = async (username: string, password: string) => {
		if (!username || !password) return false;

		const response = await fetch("/api/users/login", {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			toast.error(
				response.status === 401
					? "Invalid username or password"
					: "Login is unavailable right now. Please try again.",
				{ duration: 5000 }
			);
			return false;
		}

		const { session }: { session: { access_token: string; refresh_token: string } } =
			await response.json();
		const { error } = await supabase.auth.setSession(session);
		if (error) {
			toast.error("Could not start your session", { duration: 5000 });
			return false;
		}

		toast.success("Logged in successfully", { duration: 5000 });
		return true;
	};

	const logout = async () => {
		await supabase.auth.signOut();
		setUser(null);
		setIsLoggedIn(false);

		toast.success("Logged out successfully", { duration: 5000 });
		window.location.href = "/";
	};

	const signup = async (
		name: string,
		email: string,
		username: string,
		password: string
	) => {
		if (!name || !email || !username || !password) return false;

		const response = await fetch("/api/users/signup", {
			method: "POST",
			body: JSON.stringify({ name, email, username, password }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			const body = await response.json().catch(() => null);
			toast.error(body?.message ?? "Failed to create account", {
				duration: 5000,
			});
			return false;
		}

		toast.success("Account created successfully", { duration: 5000 });
		// Sign in right away with the credentials just used.
		return login(email, password);
	};

	const [page, setPage] = useState<pageType>("login");

	return (
		<context.Provider
			value={{
				user,
				isLoggedIn,
				authReady,
				login,
				logout,
				signup,
				page,
				setPage,
			}}
		>
			{children}
		</context.Provider>
	);
};

export const useUser = () => {
	const currentContext = useContext(context);
	if (!currentContext) {
		throw new Error("useUser must be used within a ContextProvider");
	}
	return currentContext;
};
