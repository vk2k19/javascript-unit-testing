describe("App calculator", function () {
	describe("addition", function () {

		it("Sum of two strings must throw error", function () {
			var result = function (){
				add('1', 2);
			};
			expect(result).to.throw(Error);
		});

		it("Sum of two numbers must be returned", function () {
			var result = add(2, 3);
			expect(result).to.be.equal(5, 'Success criteria: 2 + 3 =  '+result);
		});
	});
});
