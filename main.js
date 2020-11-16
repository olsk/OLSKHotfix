const mod = {

	OLSKHotfixPatches (environment) {
		return Object.assign(Object.fromEntries(Object.entries({
			'./node_modules/zombie/lib/document.js': {
				'this.dispatchEvent(event);': `[this.dispatchEvent(event), !browser.emit('OLSKMessage', data) && browser.log('Unhandled message("%s")')];`,
			},
			'./node_modules/ulid/dist/index.esm.js': {
				'var allowInsecure = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;': "var allowInsecure = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (typeof require === 'undefined' && typeof navigator !== 'undefined' && navigator.appName === 'Zombie');",
				'console.error("secure crypto unusable, falling back to insecure Math.random()!");': '// console.error("secure crypto unusable, falling back to insecure Math.random()!")',
				'export { replaceCharAt, incrementBase32, randomChar, encodeTime, encodeRandom, decodeTime, detectPrng, factory, monotonicFactory, ulid };':
				'export { replaceCharAt, incrementBase32, randomChar, encodeTime, encodeRandom, decodeTime, detectPrng, factory, monotonicFactory };',
			},
			'./node_modules/simplecrypto/src/simplecrypto.js': {
				'var _crypto = window.crypto || window.msCrypto;': 'var _crypto = window.crypto || window.msCrypto\nif (!_crypto) return;',
			},
		}).map(function ([path, patches]) {
			return [path, Object.fromEntries(Object.entries(patches).map(function (e) {
				return environment === 'production' ? e.reverse() : e;
			}))];
		})), {
			'./node_modules/remotestoragejs/release/remotestorage.js': {
				// 'options.redirectUri = globalContext.cordova ? config.cordovaRedirectUri : String(Authorize.getLocation());': 'options.redirectUri = globalContext.cordova ? config.cordovaRedirectUri : String(config.OLSKPatchRemoteStorageAuthRedirectURI || Authorize.getLocation());',
				'e.redirectUri=m.cordova?l.cordovaRedirectUri:String(h.getLocation())': 'e.redirectUri=m.cordova?l.cordovaRedirectUri:String(l.OLSKPatchRemoteStorageAuthRedirectURI || h.getLocation())',
				'r&&((t=u.getLocation()).hash': 'r.access_token&&((t=u.getLocation()).hash',
			},
			'./node_modules/launchlet/__compiled/launchlet.js': {
				',100': ',1',
			},		
		});
	},

};

Object.assign(exports, mod);
