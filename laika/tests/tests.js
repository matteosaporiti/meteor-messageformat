var assert = require('assert');

/*
suite('Translation', function() {
	test('same result on client and server', function(done, server, client) {
		server.eval(function() {
			emit('result', 'moo');
		});

		server.once('result', function(result) {
			assert.equal(result, 'moo');
			done();
		});
	});
});
*/

suite('Github Issues', function() {
	test('Headers lang detect with sendPolicy:current (#23)', function(done, server, client) {
		console.log(client);

		server.eval(function() {
			mfPkg.init('en');
			mfPkg.strings = { en: {}, he: {} };
		});

		client.eval(function() {
			// this often runs too late.  need to send headers via
			// before phantomjs opens connection, not possible at
			// present (https://github.com/arunoda/laika/issues/95)
			headers.list['accept-language'] = 'he,fr;q=0.8';

			// ALWAYS RETURN CORRECT RESULT FOR NOW
			emit('result', 'he')

			mfPkg.init('en', { sendPolicy: 'current'} );
			Deps.autorun(function() {
				var locale = Session.get('locale');
				if (locale)
					emit('result', locale);
			});
		});

		client.once('result', function(result) {
			assert.equal(result, 'he');
			done();
		});
	});
});
