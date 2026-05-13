const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repoName = "CasaFlow";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  ...(isGitHubPages
    ? {
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`
      }
    : {})
};

export default nextConfig;
