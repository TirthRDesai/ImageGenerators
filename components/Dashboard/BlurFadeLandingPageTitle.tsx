import BlurFade from "../ui/blur-fade";

export function BlurFadeLandingPageTitle() {
	return (
		<section id="header">
			<BlurFade
				delay={0.25}
				inView
			>
				<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white/90">
					Image Generators
				</h2>
			</BlurFade>
			<BlurFade
				delay={0.25 * 2}
				inView
			>
				<span className="text-xl text-pretty tracking-tighter sm:text-3xl xl:text-4xl/none text-white/80">
					Create stunning images using AI-powered algorithms and
					filters.
				</span>
			</BlurFade>
		</section>
	);
}
