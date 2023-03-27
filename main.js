const mod = {

	OLSKHotfixPatches (environment, options = {}) {
		return Object.assign(Object.fromEntries(Object.entries(Object.assign({
			'./node_modules/zombie/lib/document.js': {
				'if (url == null)': 'return new URL.URL(...arguments); if  (url == null)',
				'this.dispatchEvent(event);': `[this.dispatchEvent(event), !browser.emit('OLSKMessage', data) && browser.log('Unhandled message("%s")')];`,
				'const request': `if (!url.match(/\\/\\/(loc\\.|localhost)/i)) return document; const  request`,
				'// Catch all errors': 'window.OLSKRequire = require; //  Catch all errors',
				'let closed = false;': 'let closed = false ; window.customElements = { define: (function () {}) };',
			},
			'./node_modules/zombie/lib/dom/forms.js': {
				'if (button.getAttribute(\'disabled\')) return false;': `if (button.getAttribute('disabled') || (button.type === 'button')) return false;`,
			},
			'./node_modules/zombie/lib/dom/jsdom_patches.js': {
				'const url = URL.resolve(document.URL, href);': `const url = URL.resolve(document.URL, href) ;if (['unpkg.com'].filter(e => url.includes(e)).length) return;`,
			},
			'./node_modules/zombie/lib/pipeline.js': {
				'return consumeBody.then(function (body) {': 'return consumeBody.then(function (body)\n// (OLSKHotfixPatches\n{ if (body) request._OLSKRequestBody = body.toString();\n// OLSKHotfixPatches)',
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
		}, options.OLSKHotfixPatchesReversible || {})).map(function ([path, patches]) {
			return [path, Object.fromEntries(Object.entries(patches).map(function (e) {
				return environment === 'production' ? e.reverse() : e;
			}))];
		})), {
			'./node_modules/remotestoragejs/release/remotestorage.js': {
				// 'options.redirectUri = globalContext.cordova ? config.cordovaRedirectUri : String(Authorize.getLocation());': 'options.redirectUri = globalContext.cordova ? config.cordovaRedirectUri : String(config.OLSKPatchRemoteStorageAuthRedirectURI || Authorize.getLocation());',
				// 'e.redirectUri=m.cordova?l.cordovaRedirectUri:String(h.getLocation())': 'e.redirectUri=m.cordova?l.cordovaRedirectUri:String(l.OLSKPatchRemoteStorageAuthRedirectURI || h.getLocation())',
				// 'r&&((t=u.getLocation()).hash': 'r.access_token&&((t=u.getLocation()).hash',
				'/*! remotestorage': "if (typeof fetch === 'undefined') { global.fetch = function () {} }/*!  remotestorage",
			},
			'./node_modules/launchlet/__compiled/launchlet.js': {
				',100': ',1',
			},
			'./node_modules/codemirror/lib/codemirror.js': {
				'return CodeMirror;': 'CodeMirror.posFromMouse = posFromMouse; return  CodeMirror;',
			},
			'./node_modules/queue/index.js': {
				"var EventEmitter = require('events').EventEmitter": "// var  EventEmitter = require('events').EventEmitter",
				'EventEmitter.call(this)': "this.emit = function () {}; // EventEmitter.call( this)",
				'inherits(Queue, EventEmitter)': "// inherits( Queue, EventEmitter)",
			},
		}, options.OLSKHotfixPatchesNotReversible || {});
	},

};

Object.assign(exports, mod);
