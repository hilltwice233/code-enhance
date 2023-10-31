const vscode = require("vscode")

module.exports = {activate, deactivate}

/**
 * demo
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand("hello.world", () => {
      vscode.window.showInformationMessage("Hello!")
    }),
  )
}

function deactivate() {}
