import * as vscode from "vscode"
import {enableGitLineBlame} from "./git-line-blame.js"

export function activate(context: vscode.ExtensionContext) {
  enableGitLineBlame(context)
}

export function deactivate() {}
