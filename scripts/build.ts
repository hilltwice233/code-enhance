import {join} from "node:path"
import {cwd} from "node:process"
import {compileManifest, compileThemeJson} from "./tools.js"

const root = cwd()
const out = join(root, "extension")
const theme = join(root, "themes")

const darkSrc = "dark-color-theme.json"
const darkOut = "dark.json"
const darkCJK = "dark-cjk.json"

const lightSrc = "light-color-theme.json"
const lightOut = "light.json"
const lightCJK = "light-cjk.json"

compileManifest(root, out)
compileThemeJson(join(theme, darkSrc), join(out, darkOut), false)
compileThemeJson(join(theme, lightSrc), join(out, lightOut), false)
compileThemeJson(join(theme, darkSrc), join(out, darkCJK), true)
compileThemeJson(join(theme, lightSrc), join(out, lightCJK), true)
