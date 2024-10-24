import { ModelDataType } from "@/types";
import Banner1 from "@/public/Banners/1.jpg";
import Banner2 from "@/public/Banners/2.jpg";
import Banner3 from "@/public/Banners/3.jpg";
import Banner4 from "@/public/Banners/4.jpg";
import Banner5 from "@/public/Banners/5.jpg";
import Banner6 from "@/public/Banners/6.jpg";
import Banner7 from "@/public/Banners/7.jpg";
import Banner8 from "@/public/Banners/8.jpg";
import Banner9 from "@/public/Banners/9.jpg";
import Banner10 from "@/public/Banners/10.jpg";

const HF_TOKEN = process.env.NEXT_PUBLIC_HF_TOKEN;

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
						Authorization: "Bearer " + HF_TOKEN,
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
						Authorization: "Bearer " + HF_TOKEN,
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
						Authorization: "Bearer " + HF_TOKEN,
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
						Authorization: "Bearer " + HF_TOKEN,
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
		id: 6,
		name: "Flux.1-dev-LoRA-NSFW-HighRes",
		author: "CultriX",
		url_name: "Flux1DevLoRaNsfwHighRes",
		description: "Generate NSFW images using various algorithms",
		banner: Banner6.src,
		issuer: "huggingface",
		trigger_words: [],
		model_url: "https://huggingface.co/CultriX/flux-nsfw-highress",
		query: async function query(data) {
			const response = await fetch(
				"https://api-inference.huggingface.co/models/CultriX/flux-nsfw-highress",
				{
					headers: {
						Authorization: "Bearer " + HF_TOKEN,
						"Content-Type": "application/json",
					},
					method: "POST",
					body: JSON.stringify(data),
				}
			);
			const result = await response.json();
			return result.outputs[0];
		},
	},
	{
		id: 7,
		name: "FLUX.1-schnell",
		author: "Black Forest Labs",
		url_name: "FLUX1Schnell",
		description: "Generate images using various algorithms",
		banner: Banner7.src,
		issuer: "huggingface",
		trigger_words: [],
		model_url: "https://huggingface.co/black-forest-labs/FLUX.1-schnell",
		query: async function query(data) {
			const response = await fetch(
				"https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
				{
					headers: {
						Authorization: "Bearer " + HF_TOKEN,
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
		id: 8,
		name: "Flux.1-dev-LoRA-CelebA-NSFW",
		author: "CultriX",
		url_name: "Flux1DevLoRaCelebANsfw",
		description: "Generate celebrity NSFW images using various algorithms",
		banner: Banner8.src,
		issuer: "huggingface",
		trigger_words: [],
		model_url: "https://huggingface.co/enhanceaiteam/Flux-uncensored",
		query: async function query(data) {
			const response = await fetch(
				"https://api-inference.huggingface.co/models/enhanceaiteam/Flux-uncensored",
				{
					headers: {
						Authorization: "Bearer " + HF_TOKEN,
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
		id: 9,
		name: "flux-RealismLora",
		author: "XLabs-AI",
		url_name: "fluxRealismLora",
		description: "Generate realistic images using various algorithms",
		banner: Banner9.src,
		issuer: "huggingface",
		trigger_words: [],
		model_url: "https://huggingface.co/XLabs-AI/flux-RealismLora",
		query: async function query(data) {
			const response = await fetch(
				"https://api-inference.huggingface.co/models/XLabs-AI/flux-RealismLora",
				{
					headers: {
						Authorization: "Bearer " + HF_TOKEN,
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
		id: 10,
		name: "Stable Diffusion 3.5-Large",
		author: "Stability AI",
		url_name: "StableDiffusion3.5Large",
		description:
			"Generate high-quality images using Stable Diffusion 3.5-Large",
		banner: Banner10.src,
		issuer: "huggingface",
		trigger_words: [],
		model_url:
			"https://huggingface.co/stabilityai/stable-diffusion-3.5-large",
		query: async function query(data) {
			const response = await fetch(
				"https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large",
				{
					headers: {
						Authorization: "Bearer " + HF_TOKEN,
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
