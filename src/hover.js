const vscode = require("vscode");
const fs = require('fs');

module.exports = vscode.languages.registerHoverProvider("*", {
  provideHover(document, position) {
    const word = document.getText(document.getWordRangeAtPosition(position, /(?:\$t|\$tc|\$d|\$n|\$te|this\.t|i18n\.t|t)\(['"]([^]+?)['"]/g));

    // console.log('路径:', process.cwd());
    // console.log('文件:', fs.readdirSync('/'));

    // const pathOption = vscode.workspace.getConfiguration().get('vscodePluginI18n.i18nPath');
    // const path = vscode.workspace.workspaceFolders[0].uri._fsPath;

    // const jsonCN = JSON.parse(fs.readFileSync(`${path}${pathOption}`));
    // const jsonEN = JSON.parse(fs.readFileSync(`${path}${pathOption.replace('zh-CN', 'en-US')}`));

    const pathOption = vscode.workspace.getConfiguration().get('vscodePluginI18n.i18nPath');

    const jsonCN = JSON.parse(fs.readFileSync(`${pathOption}`));
    const jsonEN = JSON.parse(fs.readFileSync(`${pathOption.replace('zh-CN', 'en-US')}`));

    if (/^t\('(\w)+'$/.test(word.trim())) {
      const key = word.match(/(?<=t\(')\w+(?=')/g);
      // console.log('key', key)
      // console.log('jsonCN', jsonCN);

      return new vscode.Hover(`
      - 中文：${jsonCN[key]}
      - 英文：${jsonEN[key]}`);
    }
  }
})