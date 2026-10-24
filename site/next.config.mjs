/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_BASE_PATH || "";

export default {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};
