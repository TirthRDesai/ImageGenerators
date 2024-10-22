export function TypographyH1({
	text,
	className,
}: {
	text: string;
	className?: string;
}) {
	return (
		<h1
			className={
				"scroll-m-20 text-2xl font-semibold tracking-tight lg:text-4xl " +
				className
			}
		>
			{text}
		</h1>
	);
}
