const withOptimizely = require("./scripts/fetch_optimizely_datafile");
const { headers } = require("next/headers");

/** @type {import('next').NextConfig} */
module.exports = withOptimizely({
  productionBrowserSourceMaps: true,
  images: {
    domains: [
      "images.pexels.com",
      "www.breitling.com",
      "d8ymh8ouefoik.cloudfront.net",
      "www-breitling-int.eu.saleor.cloud",
    ],
    imageSizes: [320, 640, 1024, 2048, 5000],
    // deviceSizes: [320, 640, 1024, 2048, 5000],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: true,
  headers: [
    {
      source: "/*",
      headers: [
        // {
        //   key: "Cache-Control",
        //   value: "s-maxage=0",
        // },
        {
          key: "Edge-Control",
          value: "public, maxage=120, downstream-ttl=60",
        },
      ],
    },
  ],
});
