/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as assert from 'assert';
import { SpectronApplication, LATEST_PATH, WORKSPACE_PATH } from '../../spectron/application';

describe('Terminal', () => {
	let app: SpectronApplication = new SpectronApplication(LATEST_PATH, '', 0, [WORKSPACE_PATH]);
	before(() => app.start());
	after(() => app.stop());

	it(`opens terminal, runs 'echo' and verifies the output`, async function () {
		const expected = new Date().getTime().toString();
		await app.workbench.terminal.showTerminal();

		const currentLine = await app.workbench.terminal.getCurrentLineNumber();
		await app.workbench.terminal.runCommand(`echo ${expected}`);

		const actual = await app.workbench.terminal.waitForText(currentLine + 1, text => !!text.trim());
		assert.equal(actual.trim(), expected);
	});
});