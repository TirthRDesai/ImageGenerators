import React, { useEffect, useRef } from "react";
import { BlurFadeLandingPageTitle } from "./BlurFadeLandingPageTitle";
import { Button } from "@headlessui/react";

import { Button as ShadcnBtn } from "../ui/button";
import Link from "next/link";

function LandingPage() {
	const examplesBtnRef = useRef<HTMLButtonElement | null>(null);

	return (
		<div className="h-full w-full">
			<div className="w-full h-full flex items-start justify-center pl-20 flex-col">
				<BlurFadeLandingPageTitle />
				<div className="mt-12 flex flex-row gap-4">
					<Button
						className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-2 px-8 text-lg duration-300 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
						onClick={(e) => {
							window.location.href = "/Models";
						}}
					>
						Explore all models
					</Button>
					<ShadcnBtn
						variant={"outline"}
						className="text-lg py-2 px-8 text-white/70 inline-flex h-full"
						onClick={() => {
							const main = document.querySelector(
								"#mainDashboardSectionId"
							);
							const GeneratedImagesSection =
								document.querySelector(
									"#GeneratedImagesSectionId"
								);
							if (main && GeneratedImagesSection) {
								main.scrollTo({
									top:
										GeneratedImagesSection.getBoundingClientRect()
											.top - 200,
									behavior: "smooth",
								});
							}
						}}
						ref={examplesBtnRef}
					>
						Examples
					</ShadcnBtn>
				</div>
			</div>
		</div>
	);
}

export default LandingPage;
