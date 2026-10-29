import Dashboard from "@/pages/Dashboard";
import Navbar from "@/components/Dashboard/Navbar";
import ForgotPasswordForm from "@/components/Registration/ForgotPasswordForm";
import LoginForm from "@/components/Registration/LoginForm";
import SignUpForm from "@/components/Registration/SignUpForm";
import { useUser } from "@/context/context";

import { useEffect, useState } from "react";

export default function Home() {
	let { isLoggedIn } = useUser();

	const [action, setAction] = useState("login");

	// A stored Supabase session signs the user in automatically; once signed in, go to the dashboard.
	useEffect(() => {
		if (isLoggedIn) {
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
