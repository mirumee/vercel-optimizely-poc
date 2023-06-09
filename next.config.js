const withOptimizely = require("./scripts/fetch_optimizely_datafile");

/** @type {import('next').NextConfig} */
module.exports = withOptimizely({
  productionBrowserSourceMaps: true,
  images: {
    domains: ["images.pexels.com", "d8ymh8ouefoik.cloudfront.net"],
    imageSizes: [320, 640, 1024, 2048, 5000],
    deviceSizes: [320, 640, 1024, 2048, 5000],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: true,
});
