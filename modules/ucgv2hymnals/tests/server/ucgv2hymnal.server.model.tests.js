'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Ucgv2hymnal = mongoose.model('Ucgv2hymnal');

/**
 * Globals
 */
var user,
  ucgv2hymnal;

/**
 * Unit tests
 */
describe('Ucgv2hymnal Model Unit Tests:', function() {
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
      ucgv2hymnal = new Ucgv2hymnal({
        name: 'Ucgv2hymnal Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return ucgv2hymnal.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      ucgv2hymnal.name = '';

      return ucgv2hymnal.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    Ucgv2hymnal.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
