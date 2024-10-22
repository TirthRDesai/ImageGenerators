import { ModelDataType } from "@/types";
import React, { createContext, ReactNode, useContext } from "react";

interface ModelsContextType {
	model_data: ModelDataType | null | undefined;
	setModelData: (model_data: ModelDataType | null | undefined) => void;
	isGenerating: boolean | false;
	setIsGenerating: (isGenerating: boolean) => void;
	error: string | null;
	setError: (error: string | null) => void;
	prompt: string | "";
	setPrompt: (prompt: string) => void;
	generated_images: string[];
	setGeneratedImages: (generated_images: string[]) => void;
	all_prompts: string[];
	setAllPrompts: (all_prompts: string[]) => void;
}

export const ModelsContext = createContext<ModelsContextType | undefined>(
	undefined
);

export const ModelsContextProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [model_data, setModelData] = React.useState<
		ModelDataType | null | undefined
	>(null);
	const [isGenerating, setIsGenerating] = React.useState<boolean | false>(
		false
	);
	const [error, setError] = React.useState<string | null>(null);
	const [prompt, setPrompt] = React.useState<string | "">("");

	const [generated_images, setGeneratedImages] = React.useState<string[]>([]);
	const [all_prompts, setAllPrompts] = React.useState<string[]>([]);

	// ... other context state and methods...

	return (
		<ModelsContext.Provider
			value={{
				model_data,
				setModelData,
				isGenerating,
				setIsGenerating,
				error,
				setError,
				prompt,
				setPrompt,
				generated_images,
				setGeneratedImages,
				all_prompts,
				setAllPrompts,
			}}
		>
			{children}
		</ModelsContext.Provider>
	);
};

export const useModels = () => {
	const currentContext = useContext(ModelsContext);
	if (!currentContext) {
		throw new Error("useModels must be used within a ContextProvider");
	}
	return currentContext;
};
