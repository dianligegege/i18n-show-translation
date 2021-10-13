const vscode = require('vscode');

function activate(context) {

	const open = vscode.workspace.getConfiguration().get("vscodePluginI18n.open");
	const pathOption = vscode.workspace.getConfiguration().get('vscodePluginI18n.i18nPath');


	console.log('open', open);

	if (open && pathOption) {
		vscode.window.showInformationMessage('i18n-show-translation 插件加载完成');
		const hover = require("./src/hover");
		context.subscriptions.push(hover);	
	} else if (!(open && pathOption)) {
		vscode.window.showInformationMessage('是否设置翻译文件路径', 'Yes', 'No')
		.then((result) => {
			if (result === 'Yes') {
				vscode.window.showOpenDialog({
					canSelectFiles: true,
					canSelectFolders: false,
					canSelectMany: false,
					openLabel: '请选择文件夹',
				}).then((res) => {
					vscode.workspace.getConfiguration().update("vscodePluginI18n.i18nPath", res[0].path, true);
				})
			}
		})
	}
}

module.exports = {
	activate,
};