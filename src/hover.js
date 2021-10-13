const vscode = require("vscode");
const fs = require('fs');

module.exports = vscode.languages.registerHoverProvider("*", {
  provideHover(document, position) {
    const word = document.getText(document.getWordRangeAtPosition(position, /(?:\$t|\$tc|\$d|\$n|\$te|this\.t|i18n\.t|[^\w]t)\(['"]([^]+?)['"]\)/g));
    // console.log('word', word);

    // console.log('路径:', process.cwd());
    // console.log('文件:', fs.readdirSync('/'));

    // const pathOption = vscode.workspace.getConfiguration().get('vscodePluginI18n.i18nPath');
    // const path = vscode.workspace.workspaceFolders[0].uri._fsPath;

    // const jsonCN = JSON.parse(fs.readFileSync(`${path}${pathOption}`));
    // const jsonEN = JSON.parse(fs.readFileSync(`${path}${pathOption.replace('zh-CN', 'en-US')}`));

    const pathOption = vscode.workspace.getConfiguration().get('vscodePluginI18n.i18nPath');

    const jsonCN = JSON.parse(fs.readFileSync(`${pathOption}`));
    const jsonEN = JSON.parse(fs.readFileSync(`${pathOption.replace('zh-CN', 'en-US')}`));

    console.log('正则校验', /^t\('([a-zA-Z]|\d)+'\)$/.test(word.trim()));

    if (/^t\('([a-zA-Z]|\d)+'\)$/.test(word.trim())) {
      const key = word.match(/(?<=t\(')[0-9a-zA-Z]+(?='\))/g);
      console.log('key', key)
      console.log('jsonCN', jsonCN);

      return new vscode.Hover(`
      - 中文：${jsonCN[key]}
      - 英文：${jsonEN[key]}`);
    }
  }
})