"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface BlurIntProps {
	word: string;
	className?: string;
	variant?: {
		hidden: { filter: string; opacity: number };
		visible: { filter: string; opacity: number };
	};
	duration?: number;
}
const BlurIn = ({ word, className, variant, duration = 1 }: BlurIntProps) => {
	const defaultVariants = {
		hidden: { filter: "blur(10px)", opacity: 0 },
		visible: { filter: "blur(0px)", opacity: 1 },
	};
	const combinedVariants = variant || defaultVariants;

	const [animationFinished, setAnimationFinished] = useState(false);

	return (
		<motion.h1
			transition={{ duration }}
			className={cn(
				"font-display text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]",
				className,
				animationFinished ? " opacity-100" : "opacity-0"
			)}
			onViewportEnter={(entry) => {
				if (entry?.target && !animationFinished) {
					entry.target.animate(
						[{ filter: "blur(0px)", opacity: 1 }],
						{ duration: duration * 1000 }
					);
					setAnimationFinished(true);
				}
			}}
		>
			{word}
		</motion.h1>
	);
};

export default BlurIn;
