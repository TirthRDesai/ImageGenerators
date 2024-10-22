import { GeneratedImageRecords } from "@/types";
import React, { useEffect, useRef, useState } from "react";
import ImageContainer from "./ImageContainer";
import BlurFade from "../ui/blur-fade";
import ShinyButton from "../ui/shiny-button";
import { useInfiniteQuery } from "@tanstack/react-query";

const ITEMS_PER_PAGE = 12;

const fetchItems = async ({ pageParam = 0 }) => {
	const from = pageParam * ITEMS_PER_PAGE;
	const to = from + ITEMS_PER_PAGE - 1;
	// /api/generated_images/FetchRecords
	const response = await fetch("/api/generated_images/FetchRecords", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ from, to }),
	});

	if (response.ok) {
		return (await response.json()).data as GeneratedImageRecords[];
	}
	throw new Error("Failed to fetch items");
};

function GeneratedImagesSection() {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		isError,
		error,
	} = useInfiniteQuery({
		queryKey: ["generatedImages"],
		queryFn: fetchItems,
		getNextPageParam: (lastPage, allPages) => {
			return lastPage.length === ITEMS_PER_PAGE
				? allPages.length
				: undefined;
		},
		initialPageParam: 0,
	});

	const items = data?.pages?.flat() || [];

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error: {error.message}</div>;

	return (
		<section
			className="w-full h-full"
			id="GeneratedImagesSectionId"
		>
			<div>
				<h1 className="text-3xl text-white/85 w-full text-center">
					<BlurFade
						delay={0.25}
						inView
						duration={1}
					>
						Generated Images
					</BlurFade>
				</h1>

				<div className="flex flex-wrap items-stretch justify-between px-10 overflow-x-hidden mt-10 ImageContainersDiv overflow-y-hidden ">
					{items.map((item, index) => {
						return (
							<ImageContainer
								key={item.id.toString()}
								item={item}
								index={index}
							/>
						);
					})}
				</div>
			</div>

			<div
				style={{
					height: "20px",
					paddingTop: "20px",
					paddingBottom: "20px",
				}}
			>
				{hasNextPage ? (
					isFetchingNextPage ? (
						<BlurFade
							delay={0.5}
							inView
							inViewMargin="1000px"
							duration={1}
						>
							<div className="w-full flex items-center justify-center pb-12 mt-6">
								<div className="flex flex-row gap-2">
									<div className="w-4 h-4 rounded-full bg-slate-200 animate-bounce [animation-delay:.7s]"></div>
									<div className="w-4 h-4 rounded-full bg-slate-200 animate-bounce [animation-delay:.3s]"></div>
									<div className="w-4 h-4 rounded-full bg-slate-200 animate-bounce [animation-delay:.7s]"></div>
								</div>
							</div>
						</BlurFade>
					) : (
						<BlurFade
							inView
							delay={0.3}
							duration={0.8}
							className="w-full flex items-center justify-center pb-10"
						>
							<ShinyButton onClick={() => fetchNextPage()}>
								Load More
							</ShinyButton>
						</BlurFade>
					)
				) : (
					""
				)}
			</div>
		</section>
	);
}

export default GeneratedImagesSection;
