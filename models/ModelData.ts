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
		description:
			"Ultra-fast general-purpose image generation model optimized for speed and prompt responsiveness.",
		name: "Z-Turbo",
		url: "z-turbo",
		trigger_words: ["fast", "high speed", "quick render", "low latency"],
	},
	{
		model_id: "z-turbo-pixel",
		banner: Banner2.src,
		description:
			"Specialized model for crisp pixel-art and retro-style game assets with clean edges.",
		name: "Z-Turbo Pixel",
		url: "z-turbo-pixel",
		trigger_words: ["pixel art", "8-bit", "16-bit", "retro game", "sprite"],
	},
	{
		model_id: "z-turbo-anime",
		banner: Banner3.src,
		description:
			"Anime-focused fast generation model producing clean line art and vibrant anime aesthetics.",
		name: "Z-Turbo Anime",
		url: "z-turbo-anime",
		trigger_words: [
			"anime",
			"manga",
			"anime style",
			"cel shading",
			"waifu",
		],
	},
	{
		model_id: "sd-xl",
		banner: Banner4.src,
		description:
			"High-quality, detailed image generation model suitable for realistic and artistic compositions.",
		name: "Stable Diffusion XL",
		url: "sd-xl",
		trigger_words: [
			"photorealistic",
			"cinematic",
			"high detail",
			"ultra realistic",
		],
	},
	{
		model_id: "sd-xl-anime",
		banner: Banner5.src,
		description:
			"Anime-optimized Stable Diffusion XL model with improved character consistency and style control.",
		name: "Stable Diffusion XL Anime",
		url: "sd-xl-anime",
		trigger_words: [
			"anime character",
			"anime illustration",
			"anime portrait",
			"studio style",
		],
	},
	{
		model_id: "sd-xl-anime-upscale",
		banner: Banner6.src,
		description:
			"Anime image upscaling model designed to enhance resolution while preserving line quality.",
		name: "Stable Diffusion XL Anime Upscale",
		url: "sd-xl-anime-upscale",
		trigger_words: [
			"upscale",
			"high resolution",
			"anime upscale",
			"detail enhancement",
		],
	},
	{
		model_id: "realvis-xl",
		banner: Banner7.src,
		description:
			"Realism-focused model producing lifelike portraits, lighting, and photographic detail.",
		name: "RealVis XL",
		url: "realvis-xl",
		trigger_words: [
			"realistic",
			"photo",
			"portrait",
			"natural lighting",
			"DSLR",
		],
	},
	{
		model_id: "juggernaut-xl",
		banner: Banner8.src,
		description:
			"Powerful all-rounder model capable of cinematic, fantasy, and high-impact visual styles.",
		name: "Juggernaut XL",
		url: "juggernaut-xl",
		trigger_words: [
			"cinematic",
			"dramatic lighting",
			"fantasy",
			"concept art",
		],
	},
	{
		model_id: "dreamshaper-xl",
		banner: Banner9.src,
		description:
			"Creative-focused model ideal for stylized art, illustrations, and imaginative scenes.",
		name: "DreamShaper XL",
		url: "dreamshaper-xl",
		trigger_words: [
			"stylized",
			"illustration",
			"artistic",
			"dreamlike",
			"concept design",
		],
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
