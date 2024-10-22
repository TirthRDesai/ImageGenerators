import { useToast } from "@/hooks/use-toast";
import { Users } from "@/types";
import { createContext, useState, ReactNode, useContext } from "react";

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

export const ContextProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<Users | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	const { toast } = useToast();

	const login = async (
		username: string,
		password: string,
		is_encrypted: boolean = false
	) => {
		const response = await fetch("/api/users/login", {
			method: "POST",
			body: JSON.stringify({ username, password, is_encrypted }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.status != 200) {
			toast({
				title: "Error",
				description: "Invalid username or password",
				duration: 5000,
			});
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

		toast({
			title: "Success",
			description: "Logged in successfully",
			duration: 5000,
		});

		setIsLoggedIn(true);
		return true;
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("username");
		localStorage.removeItem("email");
		localStorage.removeItem("password");

		setIsLoggedIn(false);

		toast({
			title: "Success",
			description: "Logged out successfully",
			duration: 5000,
		});
		window.location.href = "/";
	};

	const signup = async (
		name: string,
		email: string,
		username: string,
		password: string
	) => {
		const response = await fetch("/api/users/signup", {
			method: "POST",
			body: JSON.stringify({ name, email, username, password }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.status != 200) {
			toast({
				title: "Error",
				description: "Failed to create account",
				duration: 5000,
			});
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

		toast({
			title: "Success",
			description: "Account created successfully",
			duration: 5000,
		});
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
