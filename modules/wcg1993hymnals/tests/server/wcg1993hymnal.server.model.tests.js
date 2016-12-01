'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Wcg1993hymnal = mongoose.model('Wcg1993hymnal');

/**
 * Globals
 */
var user,
  wcg1993hymnal;

/**
 * Unit tests
 */
describe('Wcg1993hymnal Model Unit Tests:', function() {
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
      wcg1993hymnal = new Wcg1993hymnal({
        name: 'Wcg1993hymnal Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return wcg1993hymnal.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      wcg1993hymnal.name = '';

      return wcg1993hymnal.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    Wcg1993hymnal.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
