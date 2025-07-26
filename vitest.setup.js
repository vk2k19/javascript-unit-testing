// vitest.setup.js
import jQuery from "jquery";
import { JSDOM } from "jsdom";
import { vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";

// inject jquery for avialability
const dom = new JSDOM(
  `<!DOCTYPE html><html><body><form id="searchForm"><input name="searchTerm" value=""/></form><div class="results" id="results"><p class="no-results"></p></div></body></html>`
);
global.window = dom.window;
global.document = dom.window.document;

// Load jQuery after setting the window object
global.$ = global.jQuery = jQuery;

// enable fetch mocks
const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();
vi.spyOn($, "ajax").mockImplementation(() => {});
