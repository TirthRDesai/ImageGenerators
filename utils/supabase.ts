import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);

export const GALLERY_BUCKET = "generated-images";

/** Public URL of a file in the gallery bucket (the bucket is public-read). */
export const publicImageUrl = (path: string): string =>
	`${supabaseUrl}/storage/v1/object/public/${GALLERY_BUCKET}/${path}`;
