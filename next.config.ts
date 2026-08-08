import type { NextConfig } from "next";

// Repo name on GitHub — used to prefix paths for GitHub Pages project sites
// (https://tiabajaj.github.io/tiabajaj-portfolio/). Change if you rename the repo.
const repoName = "tiabajaj-portfolio";
const isGithubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isGithubActions ? `/${repoName}` : "",
  assetPrefix: isGithubActions ? `/${repoName}/` : "",
};

export default nextConfig;
