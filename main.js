const mod = {

	OLSKHotfixPatches () {
		return {
			'./node_modules/zombie/lib/document.js': {
				'this.dispatchEvent(event);': `this.dispatchEvent(event)
						const handled = browser.emit('OLSKMessage', data);
					  if (!handled)
					      browser.log('Unhandled message("%s")');`,
			},
			'./node_modules/ulid/dist/index.esm.js': {
				'var allowInsecure = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;': "var allowInsecure = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (typeof require === 'undefined' && typeof navigator !== 'undefined' && navigator.appName === 'Zombie');",
				'export { replaceCharAt, incrementBase32, randomChar, encodeTime, encodeRandom, decodeTime, detectPrng, factory, monotonicFactory, ulid };':
				'export { replaceCharAt, incrementBase32, randomChar, encodeTime, encodeRandom, decodeTime, detectPrng, factory, monotonicFactory };',
			},
			'./node_modules/launchlet/__compiled/launchlet.js': {
				',100': ',1',
			},
			'./node_modules/remotestoragejs/release/remotestorage.js': {
				// 'options.redirectUri = globalContext.cordova ? config.cordovaRedirectUri : String(Authorize.getLocation());': 'options.redirectUri = globalContext.cordova ? config.cordovaRedirectUri : String(config.OLSKPatchRemoteStorageAuthRedirectURI || Authorize.getLocation());',
				'e.redirectUri=m.cordova?l.cordovaRedirectUri:String(h.getLocation())': 'e.redirectUri=m.cordova?l.cordovaRedirectUri:String(l.OLSKPatchRemoteStorageAuthRedirectURI || h.getLocation())',
			},
			'./node_modules/simplecrypto/src/simplecrypto.js': {
				'var _crypto = window.crypto || window.msCrypto;': `var _crypto = window.crypto || window.msCrypto
			    if (!_crypto) {
			        return
			    };`,
			},
		};
	},

};

Object.assign(exports, mod);
