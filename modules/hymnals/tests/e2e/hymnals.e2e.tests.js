'use strict';

describe('Hymnals E2E Tests:', function () {
  describe('Test Hymnals page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/hymnals');
      expect(element.all(by.repeater('hymnal in hymnals')).count()).toEqual(0);
    });
  });
});
