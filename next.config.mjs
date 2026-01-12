/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{
      hostname: "picsum.photos"
    }, {
      hostname: "nbjvaaairgzidrkiwmfc.supabase.co"
    }, {
      hostname: "imgenerator.td-server.com"
    }], // Add external image domains here
  },
  compiler: {
    styledComponents: false,
  },

};

export default nextConfig;
