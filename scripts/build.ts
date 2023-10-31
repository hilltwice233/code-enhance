import {join} from "node:path"
import {cwd} from "node:process"
import {compileManifest} from "./tools.js"

const root = cwd()
const out = join(root, "extension")

compileManifest(root, out)
