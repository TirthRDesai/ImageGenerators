import React, { useContext, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import login_bg from "@/public/login_bg.jpg";
import { useUser } from "@/context/context";

interface SignUpFormProps {
	action: string;
	setAction: React.Dispatch<React.SetStateAction<string>>;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ action, setAction }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");

	const { signup } = useUser();

	const signupFunc = async () => {
		await signup(name, email, username, password);
		setName("");
		setEmail("");
		setPassword("");
		setUsername("");
		setAction("login");
	};

	return (
		<main
			className="w-screen h-screen flex justify-center items-center"
			style={{
				backgroundImage: `url(${login_bg.src})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					signupFunc();
				}}
				className="flex flex-col items-start justify-start border-2 border-white rounded-md px-3 py-5 gap-4 lg:min-w-[32rem] backdrop-blur-lg bg-opacity-10 bg-white"
			>
				<span className="font-semibold text-2xl text-center w-full text-white">
					Sign Up
				</span>
				<div className="grid w-full items-center gap-1.5 text-white">
					<Label htmlFor="name">Name</Label>
					<Input
						type="text"
						id="name"
						className="w-full"
						name="name"
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>

				<div className="grid w-full items-center gap-1.5 text-white">
					<Label htmlFor="email">Email</Label>
					<Input
						type="email"
						id="email"
						className="w-full"
						name="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div className="grid w-full items-center gap-1.5 text-white">
					<Label htmlFor="username">Username</Label>
					<Input
						type="text"
						id="username"
						className="w-full"
						name="username"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>

				<div className="grid w-full items-center gap-1.5 text-white">
					<Label htmlFor="password">Password</Label>
					<Input
						type="password"
						id="password"
						name="password"
						className="w-full"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<div className="w-full px-20 flex items-center justify-center">
					<Button className="w-full bg-white text-black hover:bg-slate-300">
						Submit
					</Button>
				</div>

				<div className="w-full flex flex-row items-center justify-between ">
					<span
						className="text-sm text-white text-center cursor-pointer hover:underline"
						onClick={() => {
							setAction("login");
						}}
					>
						Already have an account? Sign In.
					</span>
					<span
						className="text-sm text-white text-center cursor-pointer hover:underline"
						onClick={() => {
							setAction("forgotpassword");
						}}
					>
						Forgot Password?
					</span>
				</div>
			</form>
		</main>
	);
};

export default SignUpForm;
