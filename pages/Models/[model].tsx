import React, { useEffect, useState } from "react";
import ImageGenerating from "@/components/Models/ImageGenerating";
import { useUser } from "@/context/context";
import { ModelData } from "@/models/ModelData";
import { ModelDataType } from "@/types";
import { useRouter } from "next/router";
import ModelDetailsSection from "@/components/Models/ModelDetailsSection";
import { ModelsContextProvider, useModels } from "@/context/ModelsContext";

function SelectedModel() {
	const router = useRouter();
	const { model } = router.query;

	const { model_data, setModelData, generated_images } = useModels();

	const { page, setPage } = useUser();
	useEffect(() => {
		setPage("Models");
	}, []);

	useEffect(() => {
		if (model) {
			const data = ModelData.find((checker: ModelDataType, index) => {
				return checker.url === model;
			});
			console.log("Fetched model data:", data);
			if (!data) {
				router.push("/404");
			}

			setModelData(data);
		}
	}, [model]);

	return (
		<main className="px-10 w-full h-full pt-[100px]">
			<section className="flex w-full h-full justify-between items-start">
				<ModelDetailsSection />
				<ImageGenerating />
			</section>
		</main>
	);
}

export default SelectedModel;
