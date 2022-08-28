const esbuild = require("esbuild")

module.exports = build

// BUILD

/** @param  {import("esbuild").BuildOptions} options */
function build(watch = false, options = {}, cjs = true) {
  /** @type import("esbuild").BuildOptions */
  const commonBuildOptions = {
    entryPoints: ["src/index.ts"],
    color: true,
    bundle: true,
    external: [
      "react",
      "react-reconciler",
      "canvas",
      "yoga-layout",
      "yoga-layout-prebuilt",
      "@remix-run/*",
      "fs",
    ],
    logLevel: "info",
    target: "es2015",
    minify: !watch,
    ...options,
  }

  esbuild
    .build({
      ...commonBuildOptions,
      outfile: "dist/index.js",
      platform: "neutral",
      watch,
    })
    .catch(() => process.exit(1))

  if (!watch && cjs) {
    esbuild
      .build({
        ...commonBuildOptions,
        outfile: "dist/index.cjs",
        platform: "node",
      })
      .catch(() => process.exit(1))
  }
}
