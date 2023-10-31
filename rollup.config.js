import commonjs from "@rollup/plugin-commonjs"
import nodeResolve from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
import terser from "@rollup/plugin-terser"
import typescript from "@rollup/plugin-typescript"
import {defineConfig} from "rollup"

const plugins = [
  typescript(),
  commonjs(),
  nodeResolve(),
  replace({"import.meta.vitest": "undefined", preventAssignment: true}),
  terser({mangle: false, compress: false}),
]

export default defineConfig([
  {
    plugins,
    external: ["vscode", "node:fs"],
    input: "./source/extension.ts",
    output: {file: "./extension/extension.js", format: "commonjs"},
  },
  {
    plugins,
    input: "./scripts/build.ts",
    output: {file: "./scripts/build.js", format: "esm"},
  },
])
