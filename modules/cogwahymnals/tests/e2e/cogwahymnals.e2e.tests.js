'use strict';

describe('Cogwahymnals E2E Tests:', function () {
  describe('Test Cogwahymnals page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/cogwahymnals');
      expect(element.all(by.repeater('cogwahymnal in cogwahymnals')).count()).toEqual(0);
    });
  });
});
