/*
** name: testable.app.js
** Use: Demo of unit testing with karma, mocha and chai
*/

(function () {
	window.search = function ($target, $results) {
		this.name = 'search';
		this.input = $target;
		this.results = $results;
		this.responseHandler = this.responseHandler.bind(this);
		return this;
	};
	window.search.prototype.init = function () {
		var _this = this;
		_this.input.addEventListener('submit', function (evt) {
			evt.preventDefault();
			_this.getResults(_this.input.action, _this.input.action.searchTerm, function (response) { _this.responseHandler.call(_this, response) });
		});
		return this;
	};
	window.search.prototype.getResults = function (url, term, callback) {
		$.get(url, term, callback);
	};
	window.search.prototype.responseHandler = function (response) {
		var _this = this;
		if (response.results && response.results.length > 0) {
			_this.results.innerHTML = '';
			response.results.forEach(_this.add.bind(_this));
		} else {
			_this.results.innerHTML = '<p class="no-results text-center"> We found no result for entered query.</p>';
		}
	};
	window.search.prototype.add = function (result) {

		var details = '<div class="result row"><figure class="product-image  col-xs-10 col-xs-offset-1 col-md-offset-0 col-md-4"><img src="" alt="' + result.title + '"/></figure><div class="product-detail col-xs-10 col-md-7 col-xs-offset-1"><h2>' + result.title + '<a href="javascript:void(0)" class="btn btn-primary btn-like-item">Like</a></h2><p class="price">Price: ' + result.price + ' ' + result.unit + '</p><div class="ingredients"><h3>Ingrdients</h3><ul>';
			details += result.ingredients.map(function (ingredient) { return '<li>' + ingredient + '</li>'; }).join('');
			details += '</ul></div><a href="javascript:void(0)" class="btn btn-primary btn-like-item">Like</a><ol class="prep-time"><li>Prepration: ' + result.time.preparation + '</li><li>Cooking: ' + result.time.cooking + '</li></ol><div class="how-to-bake"><h3>Baking Steps</h3><ul>'
			details += result.ingredients.map(function (ingredient) { return '<li>' + ingredient + '</li>'; }).join('');
			details += '</ul></div></div></div>';

			this.results.insertAdjacentHTML('beforeEnd',details);
	};

	$(function () {
		var search = new window.search(document.getElementById('searchForm'), document.getElementById('results'));
		search.init();
	});
})();
