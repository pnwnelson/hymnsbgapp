'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Purplehymnal = mongoose.model('Purplehymnal'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  purplehymnal;

/**
 * Purplehymnal routes tests
 */
describe('Purplehymnal CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Purplehymnal
    user.save(function () {
      purplehymnal = {
        name: 'Purplehymnal name'
      };

      done();
    });
  });

  it('should be able to save a Purplehymnal if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Purplehymnal
        agent.post('/api/purplehymnals')
          .send(purplehymnal)
          .expect(200)
          .end(function (purplehymnalSaveErr, purplehymnalSaveRes) {
            // Handle Purplehymnal save error
            if (purplehymnalSaveErr) {
              return done(purplehymnalSaveErr);
            }

            // Get a list of Purplehymnals
            agent.get('/api/purplehymnals')
              .end(function (purplehymnalsGetErr, purplehymnalsGetRes) {
                // Handle Purplehymnals save error
                if (purplehymnalsGetErr) {
                  return done(purplehymnalsGetErr);
                }

                // Get Purplehymnals list
                var purplehymnals = purplehymnalsGetRes.body;

                // Set assertions
                (purplehymnals[0].user._id).should.equal(userId);
                (purplehymnals[0].name).should.match('Purplehymnal name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Purplehymnal if not logged in', function (done) {
    agent.post('/api/purplehymnals')
      .send(purplehymnal)
      .expect(403)
      .end(function (purplehymnalSaveErr, purplehymnalSaveRes) {
        // Call the assertion callback
        done(purplehymnalSaveErr);
      });
  });

  it('should not be able to save an Purplehymnal if no name is provided', function (done) {
    // Invalidate name field
    purplehymnal.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Purplehymnal
        agent.post('/api/purplehymnals')
          .send(purplehymnal)
          .expect(400)
          .end(function (purplehymnalSaveErr, purplehymnalSaveRes) {
            // Set message assertion
            (purplehymnalSaveRes.body.message).should.match('Please fill Purplehymnal name');

            // Handle Purplehymnal save error
            done(purplehymnalSaveErr);
          });
      });
  });

  it('should be able to update an Purplehymnal if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Purplehymnal
        agent.post('/api/purplehymnals')
          .send(purplehymnal)
          .expect(200)
          .end(function (purplehymnalSaveErr, purplehymnalSaveRes) {
            // Handle Purplehymnal save error
            if (purplehymnalSaveErr) {
              return done(purplehymnalSaveErr);
            }

            // Update Purplehymnal name
            purplehymnal.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Purplehymnal
            agent.put('/api/purplehymnals/' + purplehymnalSaveRes.body._id)
              .send(purplehymnal)
              .expect(200)
              .end(function (purplehymnalUpdateErr, purplehymnalUpdateRes) {
                // Handle Purplehymnal update error
                if (purplehymnalUpdateErr) {
                  return done(purplehymnalUpdateErr);
                }

                // Set assertions
                (purplehymnalUpdateRes.body._id).should.equal(purplehymnalSaveRes.body._id);
                (purplehymnalUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Purplehymnals if not signed in', function (done) {
    // Create new Purplehymnal model instance
    var purplehymnalObj = new Purplehymnal(purplehymnal);

    // Save the purplehymnal
    purplehymnalObj.save(function () {
      // Request Purplehymnals
      request(app).get('/api/purplehymnals')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Purplehymnal if not signed in', function (done) {
    // Create new Purplehymnal model instance
    var purplehymnalObj = new Purplehymnal(purplehymnal);

    // Save the Purplehymnal
    purplehymnalObj.save(function () {
      request(app).get('/api/purplehymnals/' + purplehymnalObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', purplehymnal.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Purplehymnal with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/purplehymnals/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Purplehymnal is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Purplehymnal which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Purplehymnal
    request(app).get('/api/purplehymnals/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Purplehymnal with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Purplehymnal if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Purplehymnal
        agent.post('/api/purplehymnals')
          .send(purplehymnal)
          .expect(200)
          .end(function (purplehymnalSaveErr, purplehymnalSaveRes) {
            // Handle Purplehymnal save error
            if (purplehymnalSaveErr) {
              return done(purplehymnalSaveErr);
            }

            // Delete an existing Purplehymnal
            agent.delete('/api/purplehymnals/' + purplehymnalSaveRes.body._id)
              .send(purplehymnal)
              .expect(200)
              .end(function (purplehymnalDeleteErr, purplehymnalDeleteRes) {
                // Handle purplehymnal error error
                if (purplehymnalDeleteErr) {
                  return done(purplehymnalDeleteErr);
                }

                // Set assertions
                (purplehymnalDeleteRes.body._id).should.equal(purplehymnalSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Purplehymnal if not signed in', function (done) {
    // Set Purplehymnal user
    purplehymnal.user = user;

    // Create new Purplehymnal model instance
    var purplehymnalObj = new Purplehymnal(purplehymnal);

    // Save the Purplehymnal
    purplehymnalObj.save(function () {
      // Try deleting Purplehymnal
      request(app).delete('/api/purplehymnals/' + purplehymnalObj._id)
        .expect(403)
        .end(function (purplehymnalDeleteErr, purplehymnalDeleteRes) {
          // Set message assertion
          (purplehymnalDeleteRes.body.message).should.match('User is not authorized');

          // Handle Purplehymnal error error
          done(purplehymnalDeleteErr);
        });

    });
  });

  it('should be able to get a single Purplehymnal that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Purplehymnal
          agent.post('/api/purplehymnals')
            .send(purplehymnal)
            .expect(200)
            .end(function (purplehymnalSaveErr, purplehymnalSaveRes) {
              // Handle Purplehymnal save error
              if (purplehymnalSaveErr) {
                return done(purplehymnalSaveErr);
              }

              // Set assertions on new Purplehymnal
              (purplehymnalSaveRes.body.name).should.equal(purplehymnal.name);
              should.exist(purplehymnalSaveRes.body.user);
              should.equal(purplehymnalSaveRes.body.user._id, orphanId);

              // force the Purplehymnal to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Purplehymnal
                    agent.get('/api/purplehymnals/' + purplehymnalSaveRes.body._id)
                      .expect(200)
                      .end(function (purplehymnalInfoErr, purplehymnalInfoRes) {
                        // Handle Purplehymnal error
                        if (purplehymnalInfoErr) {
                          return done(purplehymnalInfoErr);
                        }

                        // Set assertions
                        (purplehymnalInfoRes.body._id).should.equal(purplehymnalSaveRes.body._id);
                        (purplehymnalInfoRes.body.name).should.equal(purplehymnal.name);
                        should.equal(purplehymnalInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Purplehymnal.remove().exec(done);
    });
  });
});
