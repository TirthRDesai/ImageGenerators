import React from "react";

function Background() {
	return (
		<div className="absolute inset-0 -z-50 w-full h-full">
			<div className="relative h-full w-full bg-slate-900">
				<div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]"></div>
			</div>
		</div>
	);
}

export default Background;
