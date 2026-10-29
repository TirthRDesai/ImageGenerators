// Generated images are served from the project's public Supabase Storage bucket.
const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : null;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "picsum.photos" },
      ...(supabaseHost ? [{ hostname: supabaseHost }] : []),
    ], // Add external image domains here
  },
  compiler: {
    styledComponents: false,
  },

};

export default nextConfig;
