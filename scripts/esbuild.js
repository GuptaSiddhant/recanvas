#!/usr/bin/env node
// Script to build CLI with esbuild.

const esbuild = require("esbuild")

const args = process.argv.slice(2)
const watch = args.includes("watch")

/** @type import("esbuild").BuildOptions */
const commonBuildOptions = {
  entryPoints: ["src/index.ts"],
  color: true,
  bundle: true,
  external: [
    "react",
    "react-reconciler",
    "canvas",
    "yoga-layout-prebuilt",
    "@remix-run/*",
    "fs",
  ],
  logLevel: "info",
  target: "es2015",
  minify: !watch,
}

esbuild
  .build({
    ...commonBuildOptions,
    outfile: "dist/index.js",
    platform: "neutral",
    watch,
  })
  .catch(() => process.exit(1))

if (!watch) {
  esbuild
    .build({
      ...commonBuildOptions,
      outfile: "dist/index.cjs",
      platform: "node",
    })
    .catch(() => process.exit(1))
}
