'use strict';

describe('Wcg1993hymnals E2E Tests:', function () {
  describe('Test Wcg1993hymnals page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/wcg1993hymnals');
      expect(element.all(by.repeater('wcg1993hymnal in wcg1993hymnals')).count()).toEqual(0);
    });
  });
});
