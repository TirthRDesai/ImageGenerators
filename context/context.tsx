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
	login: (
		username: string,
		password: string,
		is_encrypted: boolean
	) => Promise<boolean>;
	signup: (
		name: string,
		username: string,
		email: string,
		password: string
	) => Promise<boolean>;
	logout: () => void;
	page: pageType | "login";
	setPage: (page: pageType) => void;
}

const context = createContext<ContextType | undefined>(undefined);

let hasCheckedHealthOnce = false;
const HEALTH_RECHECK_MS = 5 * 60 * 1000;

export const ContextProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<Users | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
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

	

	const login = async (
		username: string,
		password: string,
		is_encrypted: boolean = false
	) => {
		if (!username || !password) return false;
		const isHealthy = await checkServerHealth();
		if (!isHealthy) return false;

		const response = await fetch("/api/users/login", {
			method: "POST",
			body: JSON.stringify({ username, password, is_encrypted }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.status != 200) {
			toast.error("Invalid username or password", { duration: 5000 });
			setUser(null);
			setIsLoggedIn(false);
			return false;
		}

		const {
			message,
			data,
		}: {
			message: string;
			data: Users;
		} = await response.json();
		setUser(data);

		localStorage.setItem("username", data.username);
		localStorage.setItem("email", data.email);
		localStorage.setItem("password", data.password);

		toast.success("Logged in successfully", { duration: 5000 });

		setIsLoggedIn(true);
		return true;
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("username");
		localStorage.removeItem("email");
		localStorage.removeItem("password");

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
		const isHealthy = await checkServerHealth();
		if (!isHealthy) return false;

		const response = await fetch("/api/users/signup", {
			method: "POST",
			body: JSON.stringify({ name, email, username, password }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.status != 200) {
			toast.error("Failed to create account", { duration: 5000 });
			setUser(null);
			setIsLoggedIn(false);
			return false;
		}

		const {
			message,
			data,
		}: {
			message: string;
			data: Users;
		} = await response.json();

		setUser(data);

		localStorage.setItem("username", data.username);
		localStorage.setItem("email", data.email);
		localStorage.setItem("password", data.password);

		setIsLoggedIn(true);

		toast.success("Account created successfully", { duration: 5000 });
		return true;
	};

	const [page, setPage] = useState<pageType>("login");

	return (
		<context.Provider
			value={{ user, isLoggedIn, login, logout, signup, page, setPage }}
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
