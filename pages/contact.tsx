import React, { useEffect } from "react";
import { Open_Sans, Raleway } from "@next/font/google";
import Background from "@/components/Dashboard/Background";
import BlurFade from "@/components/ui/blur-fade";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/context";

const openSans = Open_Sans({
	subsets: ["latin"],
	weight: ["400", "700"],
});

const raleway = Raleway({
	subsets: ["latin"],
	weight: ["400", "700"],
});

function Contact() {
	const { setPage } = useUser();

	useEffect(() => {
		setPage("Contact");
	}, []);

	return (
		<main className="w-screen h-screen overflow-x-hidden lg:overflow-y-hidden ">
			<Background />
			<section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pt-28">
				<BlurFade
					inView
					delay={0.1}
					className="flex flex-col gap-4"
				>
					<h1
						className={`text-3xl font-bold text-foreground md:text-4xl ${openSans.className}`}
					>
						Contact IM-G-enerators
					</h1>
					<p
						className={`text-base text-white/70 ${raleway.className}`}
					>
						Got a model idea, a bug report, or a collaboration
						request? Send a message and we will get back to you.
					</p>
				</BlurFade>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					<BlurFade
						inView
						delay={0.2}
						className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
					>
						<p
							className={`text-xs uppercase text-white/50 ${raleway.className}`}
						>
							Email
						</p>
						<p
							className={`mt-2 text-lg text-foreground ${openSans.className}`}
						>
							support@imgenerators.com
						</p>
					</BlurFade>
					<BlurFade
						inView
						delay={0.3}
						className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
					>
						<p
							className={`text-xs uppercase text-white/50 ${raleway.className}`}
						>
							Response Time
						</p>
						<p
							className={`mt-2 text-lg text-foreground ${openSans.className}`}
						>
							Usually within 24 hours
						</p>
					</BlurFade>
					<BlurFade
						inView
						delay={0.4}
						className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
					>
						<p
							className={`text-xs uppercase text-white/50 ${raleway.className}`}
						>
							Location
						</p>
						<p
							className={`mt-2 text-lg text-foreground ${openSans.className}`}
						>
							Remote, worldwide
						</p>
					</BlurFade>
				</div>

				<BlurFade
					inView
					delay={0.5}
					className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
				>
					<form className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div className="flex flex-col gap-2">
							<Label
								className={`text-white/80 ${raleway.className}`}
							>
								Name
							</Label>
							<Input
								placeholder="Your name"
								className="text-white/90 border-white/30 focus-visible:ring-white/40"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label
								className={`text-white/80 ${raleway.className}`}
							>
								Email
							</Label>
							<Input
								placeholder="you@example.com"
								className="text-white/90 border-white/30 focus-visible:ring-white/40"
							/>
						</div>
						<div className="flex flex-col gap-2 md:col-span-2">
							<Label
								className={`text-white/80 ${raleway.className}`}
							>
								Topic
							</Label>
							<Input
								placeholder="Bug, feedback, collaboration..."
								className="text-white/90 border-white/30 focus-visible:ring-white/40"
							/>
						</div>
						<div className="flex flex-col gap-2 md:col-span-2">
							<Label
								className={`text-white/80 ${raleway.className}`}
							>
								Message
							</Label>
							<Textarea
								placeholder="Tell us what you need..."
								className="min-h-[120px] text-white/90 resize-none border-white/30 focus-visible:ring-white/40"
							/>
						</div>
						<div className="md:col-span-2 ">
							<Button
								type="button"
								className={`rounded-md bg-white/10 px-6 py-5 text-base text-white transition hover:bg-white/20 ${openSans.className}`}
							>
								Send message
							</Button>
						</div>
					</form>
				</BlurFade>
			</section>
		</main>
	);
}

export default Contact;
