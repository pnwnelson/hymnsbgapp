'use strict';

describe('Purplehymnals E2E Tests:', function () {
  describe('Test Purplehymnals page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/purplehymnals');
      expect(element.all(by.repeater('purplehymnal in purplehymnals')).count()).toEqual(0);
    });
  });
});
