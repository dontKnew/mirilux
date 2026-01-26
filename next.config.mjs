/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators:false,
  reactCompiler: true,
  allowedDevOrigins: ['192.168.1*', 'localhost:3000', 'mirilux.vercel.app']
};

export default nextConfig;
