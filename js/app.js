/*
** name: app.js
** Use: Demo of unit testing with karma, mocha and chai
*/

(function () {

	window.search = function () {

		var $searchForm = document.getElementById('searchForm');
		var $resultWrapper = document.getElementById('results');
		var $searchTerm = $searchForm.searchTerm;
		var searchResults = null;

		$searchForm.addEventListener('submit', function (evt) {
			evt.preventDefault();
			var searchTerm = $searchTerm.value;
			var url = $searchForm.action;
			var resultLimit = parseInt($searchForm.pageSize || 1);

			$.get(url, function (response) {
				searchResults = response;
				if ($resultWrapper) {
					var resultMarkup = [];
					var resultSummary = '<div class="summary"><h2>Searched Term: '+response.searchedFor+'</h2><p>We have found '+response.results.length || 0+' result(s).</p></div>';

					resultMarkup = getListItem(response, 0, resultLimit);
					resultMarkup.push(getLoadMore(response, resultLimit));

					resultSummary += resultMarkup.join('');
					$resultWrapper.innerHTML = resultSummary;
				}
			});
		});

		$resultWrapper.addEventListener('click', function (evt) {
			var $target = evt.target;
			if (evt.target.className.indexOf('btn-load-more') !== -1) {
				evt.preventDefault();
				var currentPage = evt.target.dataset.pagenumber;
				var resultLimit = parseInt($searchForm.pageSize || 1);

				moreResultMarkup = getListItem(searchResults, currentPage, resultLimit);

				$target.insertAdjacentHTML('beforebegin', moreResultMarkup.join(''));
				$target.dataset.pagenumber = parseInt(currentPage,0) + 1;
			}

			if (evt.target.className.indexOf('btn-like-item') !== -1) {
				evt.preventDefault();
				evt.target.innerText = 'liked';
				evt.target.className += ' disabled';
			}
		});

		function getListItem(response, pageNumber, resultLimit) {
			if (response.results && response.results.length) {
				var shownResults = pageNumber * resultLimit;
				var resultMarkup = [];
				for (var i = shownResults; i < (shownResults + resultLimit); i++) {
					var result = response.results[i];
					genteratedMarkup = '<div class="result row"><figure class="product-image  col-xs-10 col-xs-offset-1 col-md-offset-0 col-md-4"><img src="" alt="' + result.title + '"/></figure><div class="product-detail col-xs-10 col-md-7 col-xs-offset-1"><h2>' + result.title + '<a href="javascript:void(0)" class="btn btn-primary btn-like-item">Like</a></h2><p class="price">Price: ' + result.price + ' ' + result.unit + '</p><div class="ingredients"><h3>Ingrdients</h3><ul>';
					genteratedMarkup += result.ingredients.map(function (ingredient) { return '<li>' + ingredient + '</li>'; }).join('');
					genteratedMarkup += '</ul></div><a href="javascript:void(0)" class="btn btn-primary btn-like-item">Like</a><ol class="prep-time"><li>Prepration: ' + result.time.preparation + '</li><li>Cooking: ' + result.time.cooking + '</li></ol><div class="how-to-bake"><h3>Baking Steps</h3><ul>'
					genteratedMarkup += result.ingredients.map(function (ingredient) { return '<li>' + ingredient + '</li>'; }).join('');
					genteratedMarkup += '</ul></div></div></div>';
					resultMarkup.push(genteratedMarkup);
				}

				return resultMarkup;
			}

			return [];
		}

		function getLoadMore(response, resultLimit) {
			if (response.results.length > resultLimit) {
				return '<div class="cta row"><a href="javascript:void(0)" data-pageNumber="'+1+'" class="btn btn-secondary btn-load-more">Load More</a>"</div>';
			} else {
				return '';
			}
		}

	};

	$(function () {
		window.search();
	});

})();
