const mod = {

	OLSKHotfixPatches () {
		return {
			'./node_modules/zombie/lib/document.js': {
				'this.dispatchEvent(event);': `this.dispatchEvent(event)
						const handled = browser.emit('OLSKMessage', data);
					  if (!handled)
					      browser.log('Unhandled message("%s")');`,
			},
		};
	},

};

Object.assign(exports, mod);
