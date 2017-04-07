# javascript-unit-testing
Javascript unit testing with mocha , karma, chai  and sinon
URL: https://github.com/vkum29/javascript-unit-testing

We will compare the old way of writing javascripts with testable javascripts

This is to understand how following BDD/TDD or unit testing makes coders life easier.

## Journey as tagged:
### Test setup of karma, mocha and chai
1. write test first and see it failing test: git checkout KarmaConfigurationChecked
2. add functionality and see test passing: git checkout KarmaConfigured

### Writing code without test in place | create a search listing page with product like functionality
> please see the code written in js/app.js
1. Requirement 
- As a customer we want to be able to Search site content by providing term/text
> git checkout not_testable_code_req_show_search_result


2. Enhancement: 1
- As a customer I want to see only First N records and N more will load on pagination CTA 
> git checkout not_testable_code_enhance_list_result_with_limit

3. Enhancement: 2
- As a customer we want to be able to like product displayed in search result
> git checkout not_testable_code_enhance_like_shown_list_item


### writing tests and testable scripts : revisit above requirement and enhancement
1. Requirement 
- As a customer we want to be able to Search site content by providing term/text
> git checkout testable_scripts_in_action


Please note their are some layout issues as they were not blocking in understanding and explaining how Unit testing benfits.
How we can do better and get most out of it.
