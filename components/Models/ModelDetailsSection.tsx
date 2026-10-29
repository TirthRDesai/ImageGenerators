import React, { useEffect, useRef, useState } from "react";
import { Open_Sans, Raleway } from "next/font/google";
import BlurFade from "../ui/blur-fade";
import { Url } from "next/dist/shared/lib/router/router";
import { Textarea } from "@headlessui/react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useModels } from "@/context/ModelsContext";
import { useUser } from "@/context/context";
import { authFetch } from "@/utils/authFetch";
import GenerateImageFunction from "./GenerateImageFunction";
import useSWR from "swr";

const openSans = Open_Sans({
	subsets: ["latin"],
	weight: ["400", "700"],
});

const raleway = Raleway({
	subsets: ["latin"],
	weight: ["400", "700"],
});

const ModelHeading = ({
	model_name,
}: {
	model_name: string | undefined | null;
}) => {
	return (
		<BlurFade
			className={`${openSans.className} text-4xl font-bold text-foreground`}
			inView
			delay={0.2}
		>
			{model_name}
		</BlurFade>
	);
};

const ModelAuthor = ({
	author,
	model_url,
}: {
	author: string | null | undefined;
	model_url: Url | undefined;
}) => {
	return (
		<BlurFade
			className={
				" text-base font-medium text-foreground " + openSans.className
			}
			inView
			delay={0.4}
		>
			<span className="ml-1">By:</span>
			<span
				className="ml-2 hover:underline hover:underline-offset-2 cursor-pointer"
				onClick={() => {
					if (model_url) {
						window.open(model_url.toString(), "_blank");
					}
				}}
			>
				{author}
			</span>
		</BlurFade>
	);
};

const GenerateButton: React.FC<{
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ onClick }) => {
	return (
		<button
			className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gray-800/30 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-out mt-2 hover:shadow-xl hover:shadow-gray-600/50 border-2 border-white/20"
			onClick={(e) => {
				onClick(e);
			}}
		>
			<span className={"text-sm " + openSans.className}>Generate</span>
			<div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
				<div className="relative h-full w-10 bg-white/20"></div>
			</div>
		</button>
	);
};

function ModelDetailsSection() {
	const {
		model_data,
		setModelData,
		prompt,
		setPrompt,
		setIsGenerating,
		isGenerating,
		error,
		setError,
		generated_images,
		setGeneratedImages,
		all_prompts,
		setAllPrompts,
	} = useModels();
	const { isLoggedIn, authReady } = useUser();

	const promptInputRef = useRef(null);

	// Always-current copies for the polling loop, which outlives the render it started in.
	const imagesRef = useRef(generated_images);
	imagesRef.current = generated_images;
	const promptsRef = useRef(all_prompts);
	promptsRef.current = all_prompts;
	const mountedRef = useRef(true);

	useEffect(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, []);

	// Signed-out visitors go back to the login page, once the stored session has been checked.
	useEffect(() => {
		if (authReady && !isLoggedIn) {
			window.location.href = "/";
		}
	}, [authReady, isLoggedIn]);

	// Copies the finished image into the gallery (Supabase) and returns its public URL.
	const saveImage = async (token: string): Promise<string | null> => {
		for (let attempt = 0; attempt < 3; attempt++) {
			try {
				const saved = await authFetch("/api/generate/finalize", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ token }),
				});
				if (saved.ok) {
					const result = await saved.json();
					if (typeof result.url === "string") return result.url;
				}
			} catch {
				// retry below
			}
			await new Promise((resolve) => setTimeout(resolve, 1500));
		}
		return null;
	};

	// The backend runs a job queue: poll the job status, then load the finished image.
	const pollJob = async (token: string, submittedPrompt: string) => {
		const deadline = Date.now() + 15 * 60_000;
		let failures = 0;
		while (mountedRef.current && Date.now() < deadline) {
			await new Promise((resolve) => setTimeout(resolve, 2000));
			if (!mountedRef.current) return;
			try {
				const res = await authFetch(
					"/api/generate/status?token=" + encodeURIComponent(token)
				);
				if (!res.ok) throw new Error("status " + res.status);
				const job = await res.json();
				failures = 0;
				if (job.status === "completed") {
					const url = await saveImage(token);
					if (!mountedRef.current) return;
					if (!url) {
						setError("The image was generated but could not be saved.");
						setIsGenerating(false);
						return;
					}
					setGeneratedImages([...imagesRef.current, url]);
					setAllPrompts([...promptsRef.current, submittedPrompt]);
					setIsGenerating(false);
					return;
				}
				if (job.status === "failed") {
					setError("Image generation failed.");
					setIsGenerating(false);
					return;
				}
			} catch (e) {
				// One failed poll is fine (network blip); give up after several in a row.
				if (++failures >= 5) {
					setError("Lost connection while generating the image.");
					setIsGenerating(false);
					return;
				}
			}
		}
		if (mountedRef.current) {
			setError("Image generation timed out.");
			setIsGenerating(false);
		}
	};

	const handleGenerate = async () => {
		if (!model_data || !isLoggedIn) {
			setError("Missing model or user.");
			return;
		}

		if (prompt.trim() === "") {
			setError("Please enter a prompt.");
			return;
		}

		setError(null);
		setIsGenerating(true);

		// The server takes the username from the signed-in session.
		const response = await authFetch("/api/generate/generate_image", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				prompt: prompt,
				model_id: model_data.model_id,
			}),
		});

		if (!response.ok) {
			setError("Failed to generate image.");
			setIsGenerating(false);
			return;
		}

		const data2 = await response.json();
		const { status, message } = data2;
		if (!status) {
			console.error(message);
			setError(message);
			setIsGenerating(false);
			return;
		}

		if (!data2.token) {
			setError("No token received for image generation.");
			setIsGenerating(false);
			return;
		}

		await pollJob(data2.token, prompt);
	};

	return (
		<section className="flex flex-col items-start justify-between pt-10 gap-2 w-full md:w-1/2">
			<ModelHeading model_name={model_data ? model_data.name : null} />
			<ModelAuthor
				author={model_data ? "civitai" : null}
				model_url={model_data?.url}
			/>
			<BlurFade
				inView
				delay={0.6}
				className="mt-10"
			>
				<Label className={"text-base cursor-text " + raleway.className}>
					Enter your prompt:
				</Label>
			</BlurFade>

			<BlurFade
				inView
				delay={0.8}
				className="w-full"
			>
				<Textarea
					ref={promptInputRef}
					className={
						"bg-transparent text-foreground border border-primary w-full resize-none p-2 rounded-lg h-[200px] backdrop-blur-md tracking-wider text-sm " +
						raleway.className
					}
					value={prompt}
					onChange={(e) => {
						setPrompt(e.target.value);
					}}
					placeholder="Describe the image you want to generate here..."
				/>
			</BlurFade>
			<BlurFade
				inView
				delay={1}
			>
				{!isGenerating ? (
					<GenerateButton
						onClick={async (
							e: React.MouseEvent<HTMLButtonElement>
						) => {
							e.preventDefault();

							await handleGenerate();
						}}
					/>
				) : (
					<div className="px-3 h-full flex items-center justify-center">
						<div className="models_section_loader"></div>
					</div>
				)}
			</BlurFade>
		</section>
	);
}

export default ModelDetailsSection;
