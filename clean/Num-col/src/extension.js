"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.highlightNumbers', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const text = document.getText();
            const numberRegex = /\b\d+\b/g;
            const decorationOptions = [];
            let match;
            while ((match = numberRegex.exec(text))) {
                const startPos = document.positionAt(match.index);
                const endPos = document.positionAt(match.index + match[0].length);
                const range = new vscode.Range(startPos, endPos);
                const decoration = { range, hoverMessage: 'Number: ' + match[0] };
                if (parseInt(match[0]) % 2 === 0) {
                    decorationOptions.push({
                        ...decoration,
                        renderOptions: { backgroundColor: 'green' },
                    });
                }
                else {
                    decorationOptions.push({
                        ...decoration,
                        renderOptions: { backgroundColor: 'blue' },
                    });
                }
            }
            editor.setDecorations(numberHighlightDecorationType, decorationOptions);
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
const numberHighlightDecorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
});
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map