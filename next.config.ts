import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "financialmodelingprep.com",
            },
            {
                protocol: "https",
                hostname: "images.financialmodelingprep.com",
            },
        ],
    },
    reactCompiler: true,
    reactStrictMode: true,
}

export default nextConfig
