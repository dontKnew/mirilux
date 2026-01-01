/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators:false,
  reactCompiler: true,
  allowedDevOrigins: ['192.168.1*', 'localhost:3000'],
};

export default nextConfig;
