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

type IssuerType = "huggingface" | "replicate" | "deepai" | "openai";

export interface ModelDataType {
	id: number;
	name: string;
	author: string;
	url_name: Url;
	description?: string;
	banner: string;
	model_url: Url;
	issuer: IssuerType;
	trigger_words: string[];
	nsfw?: boolean = false;
	query: (input: string, ...kwargs: any[]) => Promise<any>;
}
