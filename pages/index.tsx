import Dashboard from "@/pages/Dashboard";
import Navbar from "@/components/Dashboard/Navbar";
import ForgotPasswordForm from "@/components/Registration/ForgotPasswordForm";
import LoginForm from "@/components/Registration/LoginForm";
import SignUpForm from "@/components/Registration/SignUpForm";
import { useUser } from "@/context/context";

import { useEffect, useState } from "react";

export default function Home() {
	let { user, isLoggedIn, login, logout, page, setPage } = useUser();

	const [action, setAction] = useState("login");

	useEffect(() => {
		if (!isLoggedIn) {
			const email = localStorage.getItem("email");
			const password = localStorage.getItem("password");
			const username = localStorage.getItem("username");
			if (email && username && password) {
				login(username, password, true);
			}
		} else {
			window.location.href = "/Dashboard";
		}
	}, [isLoggedIn]);

	return (
		<div>
			{action == "login" ? (
				<LoginForm
					action={action}
					setAction={setAction}
				/>
			) : action == "signup" ? (
				<SignUpForm
					action={action}
					setAction={setAction}
				/>
			) : (
				<ForgotPasswordForm
					action={action}
					setAction={setAction}
				/>
			)}
		</div>
	);
}
