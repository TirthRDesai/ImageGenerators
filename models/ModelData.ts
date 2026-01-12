import { ModelDataType } from "@/types";
import Banner1 from "@/public/Banners/1.png";
import Banner2 from "@/public/Banners/2.png";
import Banner3 from "@/public/Banners/3.png";
import Banner4 from "@/public/Banners/4.png";
import Banner5 from "@/public/Banners/5.png";
import Banner6 from "@/public/Banners/6.png";
import Banner7 from "@/public/Banners/7.png";
import Banner8 from "@/public/Banners/8.png";
import Banner9 from "@/public/Banners/9.png";

export const ModelData: ModelDataType[] = [
	{
		model_id: "z-turbo-base",
		banner: Banner1.src,
		description: "Fast and efficient image generation model.",
		name: "Z-Turbo",
		url: "z-turbo",
		trigger_words: [],
	},
	{
		model_id: "z-turbo-pixel",
		banner: Banner2.src,
		description: "Pixel art generation with Z-Turbo Pixel.",
		name: "Z-Turbo Pixel",
		url: "z-turbo-pixel",
		trigger_words: [],
	},
	{
		model_id: "z-turbo-anime",
		banner: Banner3.src,
		description: "Anime-style image generation with Z-Turbo Anime.",
		name: "Z-Turbo Anime",
		url: "z-turbo-anime",
		trigger_words: [],
	},
	{
		model_id: "sd-xl",
		banner: Banner4.src,
		description: "High-quality image generation with Stable Diffusion XL.",
		name: "Stable Diffusion XL",
		url: "sd-xl",
		trigger_words: [],
	},
	{
		model_id: "sd-xl-anime",
		banner: Banner5.src,
		description: "Anime-style image generation with Stable Diffusion XL.",
		name: "Stable Diffusion XL Anime",
		url: "sd-xl-anime",
		trigger_words: [],
	},
	{
		model_id: "sd-xl-anime-upscale",
		banner: Banner6.src,
		description: "Upscale anime images with Stable Diffusion XL.",
		name: "Stable Diffusion XL Anime Upscale",
		url: "sd-xl-anime-upscale",
		trigger_words: [],
	},
	{
		model_id: "realvis-xl",
		banner: Banner7.src,
		description: "Realistic image generation with RealVis XL.",
		name: "RealVis XL",
		url: "realvis-xl",
		trigger_words: [],
	},
	{
		model_id: "juggernaut-xl",
		banner: Banner8.src,
		description: "Powerful image generation with Juggernaut XL.",
		name: "Juggernaut XL",
		url: "juggernaut-xl",
		trigger_words: [],
	},
	{
		model_id: "dreamshaper-xl",
		banner: Banner9.src,
		description: "Creative image generation with DreamShaper XL.",
		name: "DreamShaper XL",
		url: "dreamshaper-xl",
		trigger_words: [],
	},
];

export function getOnlyModelData() {
	return ModelData.map((model) => {
		return {
			model_id: model.model_id,
			name: model.name,
			url: model.url,
			description: model.description,
			banner: model.banner,
			trigger_words: model.trigger_words,
		};
	});
}
