/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { TouchBar } from 'electron';
const { /*TouchBarLabel,*/ TouchBarButton, /*TouchBarSpacer, TouchBarPopover, TouchBarScrubber*/ } = TouchBar;

export class CodeTouchBar {
	constructor(
		private window: Electron.BrowserWindow,
		//private editorGroupService: IEditorGroupService
	) {
		//this.initServices();
		this.createTouchBar();
		//this.window.webContents.on('ipc-message', this.listen.bind(this));
	}

	//this code not working for ipc-message
	// private listen(event, command) {
	// 	const messageType = command[0];

	// 	if (messageType === 'vscode:runAction') {
	// 		const action = command[2];

	// 		if (action.includes('workbench.view')) {
	// 			this.createTouchBar(action);
	// 		}
	// 	}
	// }

	private createTouchBar(state: string = 'workbench.view.explorer'): Electron.TouchBar {
		const defaultControls = [
			this.createTouchBarButton('Save All', 'workbench.action.files.saveAll', '#44BB44'),
			this.createTouchBarButton('Source', 'editor.action.goToDeclaration'),
			this.createTouchBarButton('Rename', 'editor.action.rename'),
			//this.createPagesControl(),
		];

		const touchBar = new TouchBar({ items: defaultControls });

		this.window.setTouchBar(touchBar);

		return touchBar;
	}

	private createTouchBarButton(label: string, action: string, color?: string): Electron.TouchBarButton {
		return new TouchBarButton({
			label: label,
			click: () => {
				this.send('vscode:runAction', action);
			},
			backgroundColor: color,
			iconPosition: 'left'
		});
	}

	// private createTouchBarPopover(label: string, items: Electron.TouchBar): Electron.TouchBarPopover {
	// 	return new TouchBarPopover({
	// 		label: label,
	// 		items: items
	// 	});
	// }

	// private createPagesControl() {
	// 	var items = [];
	// 	// items.length = 0;
	// 	// var models = this.editorGroupService.getStacksModel();
	// 	// models.groups.map((item) => {
	// 	// 	items.push(this.createTouchBarButton(item.label,''));
	// 	// });
	// 	// var codeWindows = this.windowsService.getWindows().then((result) => {
	// 	// 	result.map((tab) => {
	// 	// 		items.push(this.createTouchBarButton(tab.title, ''));
	// 	// 	});
	// 	// });

	// 	var touchBarPopover = this.createTouchBarPopover('Files', new TouchBar({ items: items }));
	// 	return touchBarPopover;
	// }

	// private createTouchBarScrubber(items: Electron.ScrubberItem[]): Electron.TouchBarScrubber {
	// 	return new TouchBarScrubber({
	// 		items: items,
	// 		select: () => {

	// 		},
	// 		highlight: () => {

	// 		},
	// 		selectedStyle: null,
	// 		overlayStyle: 'outline',
	// 		showArrowButtons: true,
	// 		continuous: true,
	// 		mode: 'fixed'
	// 	});
	// }

	// private createTouchBarLabel(label: string, textColor?: string): Electron.TouchBarLabel {
	// 	return new TouchBarLabel({
	// 		label: label,
	// 		textColor: textColor
	// 	});
	// }

	// //mb have a reason just send to this control command function through constructor
	// private send(channel: string, ...args: any[]): void {
	// 	this.window.webContents.send(channel, ...args);
	// }
}