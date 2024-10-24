import ModelCard from "@/components/Models/ModelCard";
import BlurFade from "@/components/ui/blur-fade";
import { useUser } from "@/context/context";
import { ModelData } from "@/models/ModelData";
import React, { useEffect } from "react";

function Model() {
	const { page, setPage } = useUser();
	const AllModels = ModelData;

	useEffect(() => {
		setPage("Models");
	}, []);
	return (
		<main className="w-screen h-screen overflow-y-hidden">
			<div className="flex flex-row flex-wrap items-center justify-evenly gap-16 p-4 w-full mt-20 pt-8 h-[calc(100vh-5rem)] overflow-x-hidden overflow-y-scroll">
				{AllModels.map((model, index) => {
					return (
						<BlurFade
							delay={0.1 * ((index % AllModels.length) + 1)}
							inView
							key={model.id}
							duration={0.8}
						>
							<ModelCard
								model_name={model.name}
								model_url_name={model.url_name}
								author={model.author}
								image_url={model.banner}
							/>
						</BlurFade>
					);
				})}
			</div>
		</main>
	);
}

export default Model;
