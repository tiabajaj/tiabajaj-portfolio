import type { NextConfig } from "next";

// Repo name on GitHub — used to prefix paths for GitHub Pages project sites
// (https://<user>.github.io/tia-portfolio/). Change if you rename the repo.
const repoName = "tia-portfolio";
const isGithubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isGithubActions ? `/${repoName}` : "",
  assetPrefix: isGithubActions ? `/${repoName}/` : "",
};

export default nextConfig;
