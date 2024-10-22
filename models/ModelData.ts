import { ModelDataType } from "@/types";
import Banner1 from "@/public/Banners/1.jpg";
import Banner2 from "@/public/Banners/2.jpg";
import Banner3 from "@/public/Banners/3.jpg";
import Banner4 from "@/public/Banners/4.jpg";
import Banner5 from "@/public/Banners/5.jpg";

export const ModelData: ModelDataType[] = [
	{
		id: 1,
		name: "FLUX.1-dev",
		author: "black-forest-labs",
		url_name: "Flux1Dev",
		description: "Generate images using various algorithms",
		banner: Banner1.src,
		issuer: "huggingface",
		query: async function query(data: string) {
			const response = await fetch(
				"https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
				{
					headers: {
						Authorization:
							"Bearer " + process.env.NEXT_PUBLIC_HF_TOKEN,
						"Content-Type": "application/json",
					},
					method: "POST",
					body: JSON.stringify(data),
				}
			);
			const result = await response.blob();
			return result;
		},
		model_url: "https://huggingface.co/black-forest-labs/FLUX.1-dev",
		trigger_words: [],
	},
	{
		id: 2,
		name: "Toy Box Flux",
		author: "renderartist",
		url_name: "ToyBoxFlux",
		description: "3d toys images generator",
		banner: Banner2.src,
		issuer: "huggingface",
		query: async function query(data) {
			const response = await fetch(
				"https://api-inference.huggingface.co/models/renderartist/toyboxflux",
				{
					headers: {
						Authorization:
							"Bearer " + process.env.NEXT_PUBLIC_HF_TOKEN,
						"Content-Type": "application/json",
					},
					method: "POST",
					body: JSON.stringify(data),
				}
			);
			const result = await response.blob();
			return result;
		},
		model_url: "https://huggingface.co/renderartist/toyboxflux",
		trigger_words: [
			"t0yb0x",
			"simple toy design",
			"detailed toy design",
			"3d render",
		],
	},
	{
		id: 3,
		name: "Midjourney",
		author: "Jovie",
		url_name: "Midjourney",
		description: "Generate images using various algorithms",
		banner: Banner3.src,
		issuer: "huggingface",
		trigger_words: [],
		model_url: "https://huggingface.co/Jovie/Midjourney",
		query: async function query(data) {
			const response = await fetch(
				"https://api-inference.huggingface.co/models/stable-diffusion-v1-5/stable-diffusion-v1-5",
				{
					headers: {
						Authorization:
							"Bearer " + process.env.NEXT_PUBLIC_HF_TOKEN,
						"Content-Type": "application/json",
					},
					method: "POST",
					body: JSON.stringify(data),
				}
			);
			const result = await response.blob();
			return result;
		},
	},
	{
		id: 4,
		name: "Stable Diffusion XL",
		author: "stabilityai",
		url_name: "StableDiffusionXLBase10",
		description: "Generate images using various algorithms",
		banner: Banner4.src,
		issuer: "huggingface",
		trigger_words: [],
		model_url:
			"https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0",
		query: async function query(data) {
			const response = await fetch(
				"https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
				{
					headers: {
						Authorization:
							"Bearer " + process.env.NEXT_PUBLIC_HF_TOKEN,
						"Content-Type": "application/json",
					},
					method: "POST",
					body: JSON.stringify({
						inputs: data,
						negative_prompt:
							"Worst quality, Normal quality, Low quality, Low res, Blurry, Jpeg artifacts, Grainy, text, logo, watermark, banner, extra digits, signature,Cropped, Out of frame, Out of focus,Bad anatomy, Bad proportions, Deformed, Disconnected limbs, Disfigured, Extra arms, Extra limbs, Extra hands, Fused fingers, Gross proportions, Long neck, Malformed limbs, Mutated, Mutated hands, Mutated limbs, Missing arms, Missing fingers, Poorly drawn hands, Poorly drawn face.",
					}),
				}
			);
			const result = await response.blob();
			return result;
		},
	},
	{
		id: 5,
		name: "FLUX.1-dev-LoRA-AntiBlur",
		author: "Shakker-Labs",
		url_name: "FLUX1DevLoRAAntiBlur",
		description: "Generate images using various algorithms",
		banner: Banner5.src,
		issuer: "huggingface",
		trigger_words: [],
		model_url:
			"https://huggingface.co/Shakker-Labs/FLUX.1-dev-LoRA-AntiBlur",
		query: async function query(data) {
			const response = await fetch(
				"https://api-inference.huggingface.co/models/Shakker-Labs/FLUX.1-dev-LoRA-AntiBlur",
				{
					headers: {
						Authorization:
							"Bearer " + process.env.NEXT_PUBLIC_HF_TOKEN,
						"Content-Type": "application/json",
					},
					method: "POST",
					body: JSON.stringify(data),
				}
			);
			const result = await response.blob();
			return result;
		},
	},
];

export function getOnlyModelData() {
	return ModelData.map((model) => {
		return {
			id: model.id,
			name: model.name,
			author: model.author,
			url_name: model.url_name,
			description: model.description,
			banner: model.banner,
			issuer: model.issuer,
			model_url: model.model_url,
			trigger_words: model.trigger_words,
		};
	});
}
