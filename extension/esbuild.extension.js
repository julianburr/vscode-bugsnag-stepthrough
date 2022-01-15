#!/usr/bin/env node

const yargs = require("yargs/yargs");
const esbuild = require("esbuild");

const argv = yargs(process.argv).argv;

const options = {
  bundle: true,
  entryPoints: ["./src/extension/index.ts"],
  outfile: "./out/extension.js",
  format: "cjs",
  platform: "node",
  external: ["vscode"],
  sourcemap: argv.sourcemap,
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
