'use strict';

describe('Ucgv1hymnals E2E Tests:', function () {
  describe('Test Ucgv1hymnals page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/ucgv1hymnals');
      expect(element.all(by.repeater('ucgv1hymnal in ucgv1hymnals')).count()).toEqual(0);
    });
  });
});
