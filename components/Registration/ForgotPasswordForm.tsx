import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import login_bg from "@/public/login_bg.jpg";

interface ForgotPasswordFormProps {
	action: string;
	setAction: React.Dispatch<React.SetStateAction<string>>;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
	action,
	setAction,
}) => {
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
					//TODO: ADD FORGOT PASSWORD FUNCTION
				}}
				className="flex flex-col items-start justify-start border-2 border-white rounded-md px-3 py-5 gap-4 lg:min-w-[32rem] backdrop-blur-lg bg-opacity-10 bg-white"
			>
				<span className="font-semibold text-2xl text-center w-full text-white">
					Forgot Password
				</span>

				<div className="text-justify w-full px-10 items-center flex justify-center">
					<span className="text-sm text-slate-300 font-semibold text-center">
						Enter your registered email address and we'll send you a
						password reset link.
					</span>
				</div>

				<div className="grid w-full items-center gap-1.5 text-white">
					<Label htmlFor="email">Email</Label>
					<Input
						type="email"
						id="email"
						className="w-full"
						name="email"
						placeholder="email"
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
							setAction("signup");
						}}
					>
						Don't have an account yet? Sign Up
					</span>
					<span
						className="text-sm text-white text-center cursor-pointer hover:underline"
						onClick={() => {
							setAction("login");
						}}
					>
						Login
					</span>
				</div>
			</form>
		</main>
	);
};

export default ForgotPasswordForm;
