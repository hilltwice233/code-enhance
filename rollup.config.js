import commonjs from "@rollup/plugin-commonjs"
import nodeResolve from "@rollup/plugin-node-resolve"
import terser from "@rollup/plugin-terser"
import typescript from "@rollup/plugin-typescript"
import {defineConfig} from "rollup"

const plugins = [
  typescript(),
  commonjs(),
  nodeResolve(),
  terser({mangle: true, compress: true}),
]

export default defineConfig([
  {
    plugins,
    input: "./source/extension.ts",
    output: {file: "./extension/extension.js", format: "commonjs"},
  },
  {
    plugins,
    input: "./scripts/build.ts",
    output: {file: "./scripts/build.js", format: "esm"},
  },
])
