export interface Users {
	id: string;
	username: string;
	email: string;
	name: string;
}

export interface GeneratedImageRecords {
	id: number;
	created_at?: string;
	image_name?: string;
	generated_by?: string;
	model_used?: string;
	prompt?: string;
	url: string;
}

type ModelIdType =
	| "z-turbo-base"
	| "z-turbo-pixel"
	| "z-turbo-anime"
	| "sd-xl"
	| "sd-xl-anime"
	| "sd-xl-anime-upscale"
	| "realvis-xl"
	| "juggernaut-xl"
	| "dreamshaper-xl";
export interface ModelDataType {
	model_id: ModelIdType;
	name: string;
	url: string;
	description?: string;
	banner: string;
	trigger_words: string[];
}
