/*
** name: app.js
** Use: Demo of unit testing with karma, mocha and chai
*/

(function () {

	window.search = function () {

		var $searchForm = document.getElementById('searchForm');
		var $resultWrapper = document.getElementById('results');
		var $searchTerm = $searchForm.searchTerm;

		$searchForm.addEventListener('submit', function (evt) {
			evt.preventDefault();
			var searchTerm = $searchTerm.value;
			var url = $searchForm.action;
			$.get(url, function (response) {

				if ($resultWrapper) {
					var resultMarkup = [];
					var resultSummary = '<div class="summary"><h2>Searched Term: '+response.searchedFor+'</h2><p>We have found '+response.results.length || 0+' result(s).</p></div>';
					if (response.results && response.results.length) {
						var resultMarkup = response.results.map(function (result) {
							genteratedMarkup = '<div class="result row"><figure class="product-image  col-xs-10 col-xs-offset-1 col-md-offset-0 col-md-4"><img src="" alt="'+result.title+'"/></figure><div class="product-detail col-xs-10 col-md-7 col-xs-offset-1"><h2>'+result.title+'<a href="javascript:void(0)" class="btn btn-primary btn-like-item">Like</a></h2><p class="price">Price: '+result.price+' '+result.unit+'</p><div class="ingredients"><h3>Ingrdients</h3><ul>';
							genteratedMarkup += result.ingredients.map(function (ingredient) { return '<li>' + ingredient + '</li>'; }).join('');
							genteratedMarkup += '</ul></div><a href="javascript:void(0)" class="btn btn-primary btn-like-item">Like</a><ol class="prep-time"><li>Prepration: '+result.time.preparation+'</li><li>Cooking: '+result.time.cooking+'</li></ol><div class="how-to-bake"><h3>Baking Steps</h3><ul>'
							genteratedMarkup += result.ingredients.map(function (ingredient) { return '<li>'+ingredient+'</li>'; }).join('');
							genteratedMarkup += '</ul></div></div></div>';
							return genteratedMarkup;
						});
					}

					resultSummary += resultMarkup.join('');
					$resultWrapper.innerHTML = resultSummary;
				}
			});
		});
	};

	$(function () {
		window.search();
	});

})();
