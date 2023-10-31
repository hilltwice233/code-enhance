import {readFileSync, writeFileSync} from "node:fs"
import {join} from "node:path"

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
      id: "code-enhance.light.cjk",
      uiTheme: "vs",
      path: "light-cjk.json",
    },
  ]
}

export function removeJsonComments(raw: string): string {
  return raw.replaceAll("", "")
}

if (import.meta.vitest) {
  const {it, expect} = import.meta.vitest
  it("remove json comments", () => {
    expect(removeJsonComments("")).toBe("")
  })
}
