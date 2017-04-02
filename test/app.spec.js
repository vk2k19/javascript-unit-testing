describe("App calculator", function () {
	describe("addition", function () {
		it("Sum of two numbers must be returned", function (done) {
			var result = add(2, 3);
			if (result === 5) {
				done();
			} else {
				throw (new Error('Expected 5, recieved ' + result));
			}
		});
	});
});
