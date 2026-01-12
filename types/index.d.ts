import { SupabaseClientOptions } from "@supabase/supabase-js";
import { Url } from "next/dist/shared/lib/router/router";

export interface Users {
	id: number;
	created_at: string;
	username: string;
	email: string;
	password: string;
	name: string;
}

export interface GeneratedImageRecords {
	id: number;
	created_at?: string = "today";
	image_name?: string = "generated";
	generated_by?: string = "t";
	model_used?: string = "a";
	prompt?: string = "prompt";
	url: Url;
	download_url?: Url = "";
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
