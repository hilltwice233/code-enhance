import {
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs"
import {join} from "node:path"

const activationEvents: string[] = ["workspaceContains:*"]

/**
 * Process the manifest file of node package (the `package.json` file):
 * 1. Remove dev dependencies and npm scripts.
 * 2. Use commonjs rather than esm (vscode can only support commonjs).
 * 3. Resolve CJK theme mode. (unfinished)
 *
 * @param source path to source repo root.
 * @param dist path to dist repo root.
 */
export function compileManifest(source: string, dist: string) {
  const manifest = "package.json"
  const json = JSON.parse(readFileSync(join(source, manifest)).toString())
  json.scripts = undefined
  json.devDependencies = undefined
  json.type = "commonjs"
  json.activationEvents = activationEvents
  resolveManifestCJK(json)
  writeFileSync(join(dist, manifest), JSON.stringify(json))
}

/**
 * It will only work in current situation.
 * It will directly change the {@link raw} object,
 * because the parameter here is exactly a pointer.
 *
 * @param raw the raw json object of the manifest.
 */
function resolveManifestCJK(raw: Object) {
  raw["contributes"]["themes"] = [
    {
      label: "Enhanced Dark",
      id: "code-enhance.dark",
      uiTheme: "vs-dark",
      path: "dark.json",
    },
    {
      label: "Enhanced Dark (CJK)",
      id: "code-enhance.dark.zh",
      uiTheme: "vs-dark",
      path: "dark-cjk.json",
    },
    {
      label: "Enhanced Light",
      id: "code-enhance.light",
      uiTheme: "vs",
      path: "light.json",
    },
    {
      label: "Enhanced Light (CJK)",
      id: "code-enhance.light.zh",
      uiTheme: "vs",
      path: "light-cjk.json",
    },
  ]
}

/**
 * Compile a color theme json file into the output extension folder.
 * @param source file to parse from.
 * @param dist file as output.
 * @param zh whether to use CJK mode.
 */
export function compileThemeJson(source: string, dist: string, zh: boolean) {
  const json = JSON.parse(removeJsonComments(readFileSync(source).toString()))
  if (zh) {
    const tokenColors = json["tokenColors"] as Object[]
    for (const item of tokenColors) {
      if (item["scope"].indexOf("zh-mark") !== -1) {
        const font = item["settings"]["fontStyle"] as string
        item["settings"]["fontStyle"] = font.replace("italic", "").trim()
      }
    }
  }
  writeFileSync(dist, JSON.stringify(json))
}

function removeJsonComments(raw: string): string {
  return raw.replaceAll(/(\/\/.*\n)|(\/\*(.|[\r\n])*\*\/)/g, "")
}

if (import.meta.vitest) {
  const {it, expect} = import.meta.vitest
  it("remove json comments", () => {
    const raw = `{
      // inline comment
      "name": "hilltwice",
      /* inline block comment */
      /*
       * multi-line comment
       */
      "age": 22,
      "has-y-chromosome": true
    }`
    const resolved = removeJsonComments(raw)
    console.log(resolved)
    const person = JSON.parse(resolved)
    expect(person["name"]).toBe("hilltwice")
    expect(person["age"]).toBe(22)
    expect(person["has-y-chromosome"]).toBe(true)
  })
}

/**
 * Remove all items inside a folder.
 * @param path absolute path is more recommended.
 */
export function rmdirRecursive(path: string) {
  readdirSync(path).forEach((name) => {
    const file = join(path, name)
    statSync(file).isDirectory() ? rmdirRecursive(file) : rmSync(file)
  })
}
