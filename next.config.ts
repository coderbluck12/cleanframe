import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ❌ Remove "output: export" to enable the proxy tunnel
  // output: 'export', 

  async rewrites() {
    return [
      {
        source: '/ai-backend/:path*',
        // This directs traffic from "your-site.com/ai-backend" -> "Lightning AI"
        // No trailing slash at the end!
        destination: 'https://7000-01kgbm9xwr5p9nf7ge8tdt3y1k.cloudspaces.litng.ai/:path*',
      },
    ];
  },
};

export default nextConfig;