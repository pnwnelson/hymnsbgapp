'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Ucgv1hymnal = mongoose.model('Ucgv1hymnal');

/**
 * Globals
 */
var user,
  ucgv1hymnal;

/**
 * Unit tests
 */
describe('Ucgv1hymnal Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      ucgv1hymnal = new Ucgv1hymnal({
        name: 'Ucgv1hymnal Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return ucgv1hymnal.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      ucgv1hymnal.name = '';

      return ucgv1hymnal.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    Ucgv1hymnal.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
