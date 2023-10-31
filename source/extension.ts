import * as vscode from "vscode"

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("hello.world", () => {
      vscode.window.showInformationMessage("It works.")
    }),
  )
}

export function deactivate() {}
