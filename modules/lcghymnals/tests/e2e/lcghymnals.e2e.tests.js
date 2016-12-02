'use strict';

describe('Lcghymnals E2E Tests:', function () {
  describe('Test Lcghymnals page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/lcghymnals');
      expect(element.all(by.repeater('lcghymnal in lcghymnals')).count()).toEqual(0);
    });
  });
});
