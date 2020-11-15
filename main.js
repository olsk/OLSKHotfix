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
				'console.error("secure crypto unusable, falling back to insecure Math.random()!");': '// console.error("secure crypto unusable, falling back to insecure Math.random()!")',
				'export { replaceCharAt, incrementBase32, randomChar, encodeTime, encodeRandom, decodeTime, detectPrng, factory, monotonicFactory, ulid };':
				'export { replaceCharAt, incrementBase32, randomChar, encodeTime, encodeRandom, decodeTime, detectPrng, factory, monotonicFactory };',
			},
		};
	},

};

Object.assign(exports, mod);
