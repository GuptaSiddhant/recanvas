#!/usr/bin/env node
// Script to build CLI with esbuild.

const args = process.argv.slice(2)
const watch = args.includes("watch")

require("@recanvas-libs/utils").build(watch, {}, false)
