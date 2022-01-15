#!/usr/bin/env node

const yargs = require("yargs/yargs");
const glob = require("glob");
const path = require("path");
const esbuild = require("esbuild");
const svgrPlugin = require("esbuild-plugin-svgr");

const argv = yargs(process.argv).argv;

const entryPoints = glob
  .sync(path.resolve(__dirname, "./src/webview/*.tsx"))
  ?.map((p) => path.relative(path.resolve(__dirname, "."), p));

const options = {
  bundle: true,
  entryPoints: entryPoints,
  outdir: "out/webview",
  format: "esm",
  plugins: [svgrPlugin()],
  sourcemap: argv.sourcemap,
  inject: ["./src/react-shim.js"],
  watch: argv.watch
    ? {
        onRebuild: (error) => {
          if (error) {
            console.error(error);
            return;
          }
          console.log("[watch] built finished");
        },
      }
    : undefined,
};

esbuild
  .build(options)
  .then(() =>
    console.log(
      argv.watch
        ? `[watch] build finished, watching for changes`
        : "[build] finished"
    )
  );
