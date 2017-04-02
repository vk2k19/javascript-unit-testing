/*
** name: app.js
** Use: Demo of unit testing with karma, mocha and chai
*/

(function () {

	window.add = function (a, b) {

		if (typeof a === 'string' || typeof b === 'string') {
			throw Error('Required number got string');
		}
		return a + b;
	};

})();
