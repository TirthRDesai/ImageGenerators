import React, { useEffect, useState } from "react";
import Ripple from "../ui/ripple";
import WordRotate from "../ui/word-rotate";
import { useTheme } from "next-themes";
import { ModelDataType } from "@/types";
import Image from "next/image";
import { useModels } from "@/context/ModelsContext";

function ImageGenerating() {
	const { model_data, isGenerating, generated_images, error } = useModels();

	return (
		<div className="relative flex h-[500px] w-[500px] flex-col items-center justify-center overflow-hidden rounded-xl border bg-background md:shadow-xl">
			{isGenerating ? (
				<>
					<WordRotate
						className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-white"
						words={["Generating", "Image", "Please", "Wait"]}
						duration={3000}
					/>

					<Ripple />
				</>
			) : error ? (
				<div className="text-center text-xl text-white/80">
					An error occurred while generating the image. Please try
					again.
				</div>
			) : generated_images.length > 0 ? (
				<>
					<Image
						src={generated_images[generated_images.length - 1]}
						width={500}
						alt="generated_image"
						height={500}
					/>
				</>
			) : (
				<div className="text-center text-xl text-white/80">
					Waiting for your prompt...
				</div>
			)}
		</div>
	);
}

export default ImageGenerating;
