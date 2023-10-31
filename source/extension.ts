import * as vscode from "vscode"

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.validation", () => {
      vscode.window.showInformationMessage("It works.")
    }),
  )
}

export function deactivate() {}
