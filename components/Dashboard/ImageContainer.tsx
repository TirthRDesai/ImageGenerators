import { GeneratedImageRecords } from "@/types";
import React, { useEffect, useState } from "react";
import BlurFade from "../ui/blur-fade";
import Image from "next/image";

function ImageContainer({
	item,
	index,
}: {
	item: GeneratedImageRecords;
	index: number;
}) {
	const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

	return (
		<BlurFade
			delay={0.25 * ((index % 4) + 1)}
			inView
			isImageLoaded={isImageLoaded}
			duration={0.8}
			className="grid w-full md:w-1/3 lg:w-1/4 place-items-center overflow-x-scroll mt-4 rounded-lg lg:mt-6 lg:overflow-visible px-6 selection:bg-transparent"
		>
			<figure className="relative w-full aspect-square group/item cursor-pointer">
				<Image
					className="object-fit object-center w-full h-full aspect-square rounded-xl "
					src={item.url}
					alt={item.image_name || "image"}
					width={500}
					height={500}
					priority={true}
					fetchPriority="high"
					onLoad={() => {
						setIsImageLoaded(true);
					}}
				/>
				<figcaption className="absolute bottom-0 left-2/4 flex w-full -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-2 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm group-hover/item:opacity-100 opacity-0 duration-300 ">
					<div>
						<h5 className="text-sm font-medium text-slate-800">
							By: @{item.generated_by || "t"}
						</h5>

						<p className="text-sm text-slate-600">
							Model: {item.model_used || "a"}
						</p>
					</div>
				</figcaption>
			</figure>
		</BlurFade>
	);
}

export default ImageContainer;
