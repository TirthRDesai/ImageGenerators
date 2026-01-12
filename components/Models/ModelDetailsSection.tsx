import React, { useEffect, useRef, useState } from "react";
import { Open_Sans, Raleway } from "@next/font/google";
import BlurFade from "../ui/blur-fade";
import { Url } from "next/dist/shared/lib/router/router";
import { Textarea } from "@headlessui/react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useModels } from "@/context/ModelsContext";
import { useUser } from "@/context/context";
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

	const promptInputRef = useRef(null);
	const [token, setToken] = useState<string | null>(null);
	const [statusUrl, setStatusUrl] = useState<string | null>(null);
	const [imageFetchToken, setImageFetchToken] = useState<string | null>(null);

	const fetcher = (url: string) =>
		fetch(url).then((res) => {
			if (!res.ok) throw new Error("Network error");
			return res.json();
		});

	useEffect(() => {
		if (isGenerating && token) {
			setStatusUrl(`/api/generate/status?token=${token}`);
		} else {
			setStatusUrl(null);
		}
	}, [isGenerating, token]);

	const { data, error: swrError } = useSWR(
		isGenerating ? statusUrl : null,
		fetcher,
		{
			refreshInterval: 20000,
			revalidateOnFocus: false,
			dedupingInterval: 5_000,
		}
	);

	useEffect(() => {
		if (!swrError) {
			return;
		}
		setError("Failed to check job status.");
		setIsGenerating(false);
	}, [swrError, setError, setIsGenerating]);

	useEffect(() => {
		if (!data) {
			return;
		}
		if (data.status === "failed") {
			if (!token || imageFetchToken === token) {
				setError("Image generation failed.");
				setIsGenerating(false);
				return;
			}
			setImageFetchToken(token);
			const fetchImage = async () => {
				const response = await fetch(
					`/api/generate/get_image?token=${token}`
				);
				if (!response.ok) {
					setError("Failed to fetch generated image.");
					setIsGenerating(false);
					return;
				}
				const imageData = await response.json();
				const url = imageData.result?.url || imageData.url;
				if (!url) {
					setError("No image URL returned.");
					setIsGenerating(false);
					return;
				}
				setGeneratedImages([...generated_images, url]);
				setAllPrompts([...all_prompts, prompt]);
				setIsGenerating(false);
			};
			fetchImage();
			return;
		}
		if (data.status === "completed") {
			if (!token || imageFetchToken === token) {
				return;
			}
			setImageFetchToken(token);
			const fetchImage = async () => {
				const response = await fetch(
					`/api/generate/get_image?token=${token}`
				);
				if (!response.ok) {
					setError("Failed to fetch generated image.");
					setIsGenerating(false);
					return;
				}
				const imageData = await response.json();
				const url = imageData.result?.url || imageData.url;
				if (!url) {
					setError("No image URL returned.");
					setIsGenerating(false);
					return;
				}
				setGeneratedImages([...generated_images, url]);
				setAllPrompts([...all_prompts, prompt]);
				setIsGenerating(false);
			};
			fetchImage();
		}
	}, [
		data,
		imageFetchToken,
		prompt,
		setError,
		setIsGenerating,
		setAllPrompts,
		setGeneratedImages,
		token,
	]);

	const handleGenerate = async () => {
		const username = localStorage.getItem("username");

		if (!model_data || !username) {
			setError("Missing model or user.");
			return;
		}

		if (prompt.trim() === "") {
			setError("Please enter a prompt.");
			return;
		}

		setError(null);
		setIsGenerating(true);

		const response = await fetch("/api/generate/generate_image", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				prompt: prompt,
				model_id: model_data.model_id,
				username: username,
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

		setToken(data2.token);
	};

	return (
		<section className="flex flex-col items-start justify-between pt-10 gap-2 w-1/2">
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
