import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.insertDateTime', () => {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleString();

            editor.edit((editBuilder) => {
                editBuilder.insert(editor.selection.active, formattedDate);
            });
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
