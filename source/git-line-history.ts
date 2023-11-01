import {spawn} from "node:child_process"
import {relative} from "node:path"
import * as vscode from "vscode"

const decorationType = vscode.window.createTextEditorDecorationType({
  after: {
    textDecoration: "none; opacity: 25%",
    margin: "0 0 0 1rem",
  },
})

export function enableGitLineHistory(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.window.onDidChangeTextEditorSelection((event) => {
      const editor = event.textEditor
      if (editor !== vscode.window.activeTextEditor) return
      const line = editor.document.lineAt(editor.selection.active.line)
      const lineNumber = line.lineNumber

      const absolutePath = editor.document.uri
      const cwd = vscode.workspace.getWorkspaceFolder(absolutePath).uri.fsPath
      const path = relative(cwd, absolutePath.fsPath)

      const args = ["blame", "-p", path, `-L${lineNumber + 1},+1`]
      const cmd = spawn("git", args, {cwd}).stdout.on("data", (data) => {
        const fields = parseGitBlameFields(data.toString())
        const message = formatMessage(fields)
        console.log(message)

        editor.setDecorations(decorationType, [
          {
            range: new vscode.Range(
              lineNumber,
              line.text.length,
              lineNumber,
              line.text.length + message.length,
            ),
            renderOptions: {after: {contentText: message}},
          },
        ])
      })
    }),
  )
}

/**
 * Result of the `git blame -p` command will be formatted into such
 * key-value pair for further processing.
 */
type BlameFields = {[key: string]: string}

/**
 * Format the output of git blame command into key-value pairs
 * for further programmable processing.
 *
 * Here are two special lines: the first line and the last line.
 * The key of the first line will be `commit-id`,
 * while the key of the last line will be `raw`, which is the raw line.
 *
 * @param raw output string of git blame -p
 * @returns formatted key-value pairs
 */
function parseGitBlameFields(raw: string): BlameFields {
  const lines = raw.trim().split("\n")
  lines[0] = `commit-id ${lines[0]}`
  lines[lines.length - 1] = `raw ${lines[lines.length - 1].trim()}`
  return Object.fromEntries(
    lines.map((line) => {
      const parts = line.split(" ")
      const key = parts[0]
      const value = parts.slice(1).join(" ")
      return [key, value]
    }),
  )
}

function formatMessage(fields: BlameFields) {
  return `${fields["author"]} • ${fields["summary"]}`
}
