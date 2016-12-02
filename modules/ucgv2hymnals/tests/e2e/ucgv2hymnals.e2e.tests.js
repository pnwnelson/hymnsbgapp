'use strict';

describe('Ucgv2hymnals E2E Tests:', function () {
  describe('Test Ucgv2hymnals page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/ucgv2hymnals');
      expect(element.all(by.repeater('ucgv2hymnal in ucgv2hymnals')).count()).toEqual(0);
    });
  });
});
