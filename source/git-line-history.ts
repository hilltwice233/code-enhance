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
      spawn("git", args, {cwd}).stdout.on("data", (data) => {
        const blame = new GitLineBlame(data.toString())
        const message = blame.formatLineMessage()

        editor.setDecorations(decorationType, [
          {
            range: new vscode.Range(
              lineNumber,
              line.text.length,
              lineNumber,
              line.text.length + message.length,
            ),
            hoverMessage: "hover message",
            renderOptions: {after: {contentText: message}},
          },
        ])
      })
    }),
  )
}

/**
 * The message of a git user in a commit.
 * It can be an author or a committer.
 * And it also contains the time-stamp info about the commit.
 */
class GitCommitUserInfo {
  readonly name: string
  readonly email: string
  readonly time: number
  readonly timeZone: string

  constructor(name: string, email: string, time: string, timeZone: string) {
    this.name = name
    this.email = email
    this.time = parseInt(time)
    this.timeZone = timeZone
  }

  formatLine(): string {
    return ""
  }

  /**
   * Format the relative time from the commit timestamp to now into
   * a human readable time string to mark how long it is since the last commit.
   *
   * @returns readable relative time string.
   */
  formatRelativeTime(): string {
    const now = Math.floor(new Date().getTime() / 1000)
    let ago = now - this.time

    if (ago < 60) return `${ago}s`
    ago = Math.floor(ago / 60)
    if (ago < 60) return `${ago}min`
    ago = Math.floor(ago / 60)
    if (ago < 24) return `${ago}hours`
    ago = Math.floor(ago / 24)
    if (ago < 31) return `${ago}days`
    ago = Math.floor(ago / 30.5)
    if (ago < 12) return `${ago}months`
    ago = Math.floor(ago / 12)
    return `${ago}years`
  }
}

/**
 * Information parsed from the git blame of a line.
 * It also provide methods of parsing and formatting.
 */
class GitLineBlame {
  readonly author: GitCommitUserInfo
  readonly committer: GitCommitUserInfo
  readonly summary: string

  constructor(raw: string) {
    const fields = this.parseFields(raw)
    this.author = new GitCommitUserInfo(
      fields["author"] ?? "",
      fields["author-mail"] ?? "",
      fields["author-time"] ?? "",
      fields["author-tz"] ?? "",
    )
    this.committer = new GitCommitUserInfo(
      fields["committer"] ?? "",
      fields["committer-mail"] ?? "",
      fields["committer-time"] ?? "",
      fields["committer-tz"] ?? "",
    )

    this.summary =
      this.committer.name === "Not Committed Yet" && fields["summary"]
        ? ""
        : fields["summary"]
  }

  /**
   * Format the output of git blame command into key-value pairs
   * for further programmable processing.
   *
   * Here are two special lines: the first line and the last line.
   * The key of the first line will be `headline`,
   * while the key of the last line will be `content`.
   *
   * @param raw output string of `git blame -p -LXX,+1 <file>`
   * @returns formatted key-value pairs
   */
  private parseFields(raw: string): {[key: string]: string} {
    const lines = raw.trim().split("\n")
    lines[0] = `headline ${lines[0]}`
    lines[lines.length - 1] = `content ${lines[lines.length - 1]}`
    return Object.fromEntries(
      lines.map((line) => {
        const parts = line.split(" ")
        const key = parts[0]
        const value = parts.slice(1).join(" ")
        return [key, value]
      }),
    )
  }

  /**
   * Format the information parsed from `git blame -p -LXX,+1 <file>`
   * into the string to display as the suffix of current line.
   *
   * @returns formatter line message to display.
   */
  formatLineMessage(): string {
    const name = this.committer.name
    const time = this.committer.formatRelativeTime()
    return this.summary === ""
      ? `${name}, ${time}`
      : `${name}, ${time} • ${this.summary}`
  }

  formatHoverMessage(): string {
    return ``
  }
}
