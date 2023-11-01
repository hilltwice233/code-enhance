import * as vscode from "vscode"
import {enableGitLineHistory} from "./git-line-history.js"

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("code-enhance.active", () => {
      vscode.window.showInformationMessage("Code Enhance extension is active.")
    }),
  )
  enableGitLineHistory(context)
}

export function deactivate() {}
