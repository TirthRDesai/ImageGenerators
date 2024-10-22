/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', "nbjvaaairgzidrkiwmfc.supabase.co"], // Add external image domains here
  },
  compiler: {
    styledComponents: false,
  },

};

export default nextConfig;
