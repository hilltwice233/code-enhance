import {spawn} from "child_process"
import * as vscode from "vscode"
import {format} from "./utils.js"

export function enableGitLineBlame(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.window.onDidChangeTextEditorSelection((event) => {
      renderGitBlame(event.textEditor)
    }),
  )
}

function renderGitBlame(editor: vscode.TextEditor) {
  const line = editor.document.lineAt(editor.selection.active.line)
  if (line.lineNumber >= editor.document.lineCount - 1) {
    decoration.clear(editor)
    return
  }

  const path = editor.document.uri
  const args = ["blame", "-p", path.path, `-L${line.lineNumber + 1},+1`]
  const cwd = vscode.workspace.getWorkspaceFolder(path).uri.fsPath
  const stream = spawn("git", args, {cwd})
  stream.stdout.on("data", (data) => renderGitBlameData(editor, line, data))
}

function renderGitBlameData(
  editor: vscode.TextEditor,
  line: vscode.TextLine,
  data: any,
) {
  const blame = new GitLineBlame(data.toString())
  const message = blame.formatLine()
  const range = new vscode.Range(
    line.lineNumber,
    line.text.length,
    line.lineNumber,
    line.text.length + message.length,
  )
  decoration.updateOptions(editor, {
    range,
    hoverMessage: blame.formatHover(),
    renderOptions: {after: {contentText: message}},
  })
}

namespace decoration {
  let currentType = vscode.window.createTextEditorDecorationType({
    after: {
      textDecoration: "none; opacity: 25%",
      margin: "0 0 0 1rem",
    },
  })

  let currentOptions: vscode.DecorationOptions[] = []

  export function clear(editor: vscode.TextEditor) {
    currentOptions = []
    editor.setDecorations(currentType, currentOptions)
  }

  export function updateType(
    editor: vscode.TextEditor,
    type: vscode.TextEditorDecorationType,
  ) {
    clear(editor)
    currentType = type
    editor.setDecorations(type, currentOptions)
  }

  export function updateOptions(
    editor: vscode.TextEditor,
    option: vscode.DecorationOptions,
  ) {
    clear(editor)
    currentOptions = [option]
    editor.setDecorations(currentType, currentOptions)
  }
}

class GitLineBlame {
  readonly committed: boolean
  readonly author: string
  readonly authorMail: string
  readonly authorTime: number
  readonly authorTimeZone: string
  readonly summary: string

  constructor(raw: string) {
    const map = this.map(raw)
    this.author = map["author"]
    this.authorMail = map["author-mail"]
    this.authorTime = parseInt(map["author-time"])
    this.authorTimeZone = map["author-tz"]
    this.summary = map["summary"]

    this.committed = this.author !== "Not Committed Yet"
  }

  private map(raw: string) {
    const lines = raw.split("\n")
    lines[0] = `commit-id ${lines[0]}`
    lines[lines.length - 1] = `content ${lines[lines.length - 1]}`

    const handler = {}
    for (const line of lines) {
      const parts = line.split(" ")
      handler[parts[0]] = parts.slice(1).join(" ")
    }
    return handler
  }

  formatLine(): string {
    if (!this.committed) return "Not Committed Yet..."
    const duration = format.duration(Date.now() - this.authorTime * 1000)
    return `${this.author}, ${duration} • ${this.summary}`
  }

  formatHover(): string {
    if (!this.committed) return "Not Committed Yet..."
    return (
      `${this.author} <${this.authorMail}>, ` +
      `${format.timestamp(this.authorTime * 1000)} ${this.authorTimeZone}`
    )
  }
}
