import {copyFileSync} from "node:fs"
import {join} from "node:path"
import {cwd} from "node:process"
import {compileManifest, compileThemeJson, rmdirRecursive} from "./tools.js"

const root = cwd()
const out = join(root, "extension")
const theme = join(root, "themes")

const darkSrc = "dark-color-theme.json"
const darkOut = "dark.json"
const darkCJK = "dark-cjk.json"

const lightSrc = "light-color-theme.json"
const lightOut = "light.json"
const lightCJK = "light-cjk.json"

rmdirRecursive(out)

compileManifest(root, out)
compileThemeJson(join(theme, darkSrc), join(out, darkOut), false)
compileThemeJson(join(theme, lightSrc), join(out, lightOut), false)
compileThemeJson(join(theme, darkSrc), join(out, darkCJK), true)
compileThemeJson(join(theme, lightSrc), join(out, lightCJK), true)

copyFileSync(join(root, "source", "extension.js"), join(out, "extension.js"))
copyFileSync(join(root, "readme.md"), join(out, "readme.md"))
