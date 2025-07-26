import { beforeEach } from "vitest";
import "../js/testable.app";
var componentSearch = window.search;

describe("search and search result listing", function () {
  beforeEach(() => {});

  describe("search", function () {
    var component;
    beforeEach(function () {
      //setup node
      document.body.innerHTML =
        '<form id="searchForm"><input name="searchTerm" value=""/></form><div class="results" id="results"><p class="no-results"></p></div>';

      component = new componentSearch(
        document.getElementById("searchForm"),
        document.getElementById("results")
      );
    });

    it("verify search is initialized", function () {
      expect(component).to.be.an.instanceOf(componentSearch);
      expect(component.name).to.be.not.null;
      expect(component.$target).to.be.not.null;
      expect(component.$results).to.be.not.null;
      var searchObject = component.init();
      expect(searchObject).to.be.equal(component);
    });

    it("verify the request is made with proper value and successfull response obtained", function (done) {
      var myfunc = function (response) {
        expect(response.results).to.not.null;
        expect(response.searchedFor).to.equal("abc");
        expect(response.results).to.have.lengthOf(5);
        done();
      };

      component.getResults(
        "/temp/mock-data/search-result.json",
        "myterm",
        myfunc
      );
      //spy getsearch result to be called with specifc values
    });

    it("verify the request is made with incorrect value and error response obtained", function (done) {
      var myfunc = function (response) {
        expect(response.results).to.be.an.Array;
        expect(response.results).to.have.lengthOf(0);
        //done();
      };

      component.getResults(
        "/temp/mock-data/search-error-result.json",
        null,
        myfunc
      );
    });
  });

  describe("result listing", function () {
    var component, itemData;
    beforeEach(function () {
      //setup node
      document.body.innerHTML =
        '<form id="searchForm"><input name="searchTerm" value=""/></form><div class="results" id="results"><p class="no-results"></p></div>';
      itemData = {
        searchedFor: "Fruit n Nut cacke",
        results: [
          {
            title: "Yummy Tummy's special cake",
            price: "100",
            unit: "pound",
            ingredients: ["Flour", "Sugar", "BUtter", "Salt"],
            time: {
              preparation: " 45 mins ",
              cooking: " 30 mins",
            },
            steps: ["preapre", "cooks", "eat"],
          },
        ],
      };
      component = new componentSearch(
        document.getElementById("searchForm"),
        document.getElementById("results")
      );
    });

    it("verify the result is listed for given response abc", function () {
      expect($(component.results).children(".no-results").length).to.be.equal(
        1
      );
      component.responseHandler.call(component, itemData);
      expect($(component.results).children(".no-results").length).to.be.equal(
        0
      );
      ///expect($(component.results).children().length).to.be.equal(1);
    });

    it("verify the no result is generated for error", function () {
      itemData = {
        searchedFor: "Fruit n Nut cacke",
        results: [],
      };

      expect($(component.results).children(".no-results").length).to.be.equal(
        1
      );
      component.responseHandler.call(component, itemData);
      expect($(component.results).children(".no-results").length).to.be.equal(
        1
      );
    });
  });
});
