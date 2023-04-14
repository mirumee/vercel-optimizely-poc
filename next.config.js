const withOptimizely = require("./scripts/fetch_optimizely_datafile");

/** @type {import('next').NextConfig} */
module.exports = withOptimizely({
  productionBrowserSourceMaps: true,
  images: {
    domains: ["images.pexels.com", "d8ymh8ouefoik.cloudfront.net"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
});
