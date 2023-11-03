import * as vscode from "vscode"
import {enableGitLineHistory} from "./git-line-history.js"

export function activate(context: vscode.ExtensionContext) {
  enableGitLineHistory(context)
}

export function deactivate() {}
