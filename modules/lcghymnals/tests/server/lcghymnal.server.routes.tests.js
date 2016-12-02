'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Lcghymnal = mongoose.model('Lcghymnal'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  lcghymnal;

/**
 * Lcghymnal routes tests
 */
describe('Lcghymnal CRUD tests', function () {

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

    // Save a user to the test db and create new Lcghymnal
    user.save(function () {
      lcghymnal = {
        name: 'Lcghymnal name'
      };

      done();
    });
  });

  it('should be able to save a Lcghymnal if logged in', function (done) {
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

        // Save a new Lcghymnal
        agent.post('/api/lcghymnals')
          .send(lcghymnal)
          .expect(200)
          .end(function (lcghymnalSaveErr, lcghymnalSaveRes) {
            // Handle Lcghymnal save error
            if (lcghymnalSaveErr) {
              return done(lcghymnalSaveErr);
            }

            // Get a list of Lcghymnals
            agent.get('/api/lcghymnals')
              .end(function (lcghymnalsGetErr, lcghymnalsGetRes) {
                // Handle Lcghymnals save error
                if (lcghymnalsGetErr) {
                  return done(lcghymnalsGetErr);
                }

                // Get Lcghymnals list
                var lcghymnals = lcghymnalsGetRes.body;

                // Set assertions
                (lcghymnals[0].user._id).should.equal(userId);
                (lcghymnals[0].name).should.match('Lcghymnal name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Lcghymnal if not logged in', function (done) {
    agent.post('/api/lcghymnals')
      .send(lcghymnal)
      .expect(403)
      .end(function (lcghymnalSaveErr, lcghymnalSaveRes) {
        // Call the assertion callback
        done(lcghymnalSaveErr);
      });
  });

  it('should not be able to save an Lcghymnal if no name is provided', function (done) {
    // Invalidate name field
    lcghymnal.name = '';

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

        // Save a new Lcghymnal
        agent.post('/api/lcghymnals')
          .send(lcghymnal)
          .expect(400)
          .end(function (lcghymnalSaveErr, lcghymnalSaveRes) {
            // Set message assertion
            (lcghymnalSaveRes.body.message).should.match('Please fill Lcghymnal name');

            // Handle Lcghymnal save error
            done(lcghymnalSaveErr);
          });
      });
  });

  it('should be able to update an Lcghymnal if signed in', function (done) {
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

        // Save a new Lcghymnal
        agent.post('/api/lcghymnals')
          .send(lcghymnal)
          .expect(200)
          .end(function (lcghymnalSaveErr, lcghymnalSaveRes) {
            // Handle Lcghymnal save error
            if (lcghymnalSaveErr) {
              return done(lcghymnalSaveErr);
            }

            // Update Lcghymnal name
            lcghymnal.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Lcghymnal
            agent.put('/api/lcghymnals/' + lcghymnalSaveRes.body._id)
              .send(lcghymnal)
              .expect(200)
              .end(function (lcghymnalUpdateErr, lcghymnalUpdateRes) {
                // Handle Lcghymnal update error
                if (lcghymnalUpdateErr) {
                  return done(lcghymnalUpdateErr);
                }

                // Set assertions
                (lcghymnalUpdateRes.body._id).should.equal(lcghymnalSaveRes.body._id);
                (lcghymnalUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Lcghymnals if not signed in', function (done) {
    // Create new Lcghymnal model instance
    var lcghymnalObj = new Lcghymnal(lcghymnal);

    // Save the lcghymnal
    lcghymnalObj.save(function () {
      // Request Lcghymnals
      request(app).get('/api/lcghymnals')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Lcghymnal if not signed in', function (done) {
    // Create new Lcghymnal model instance
    var lcghymnalObj = new Lcghymnal(lcghymnal);

    // Save the Lcghymnal
    lcghymnalObj.save(function () {
      request(app).get('/api/lcghymnals/' + lcghymnalObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', lcghymnal.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Lcghymnal with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/lcghymnals/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Lcghymnal is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Lcghymnal which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Lcghymnal
    request(app).get('/api/lcghymnals/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Lcghymnal with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Lcghymnal if signed in', function (done) {
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

        // Save a new Lcghymnal
        agent.post('/api/lcghymnals')
          .send(lcghymnal)
          .expect(200)
          .end(function (lcghymnalSaveErr, lcghymnalSaveRes) {
            // Handle Lcghymnal save error
            if (lcghymnalSaveErr) {
              return done(lcghymnalSaveErr);
            }

            // Delete an existing Lcghymnal
            agent.delete('/api/lcghymnals/' + lcghymnalSaveRes.body._id)
              .send(lcghymnal)
              .expect(200)
              .end(function (lcghymnalDeleteErr, lcghymnalDeleteRes) {
                // Handle lcghymnal error error
                if (lcghymnalDeleteErr) {
                  return done(lcghymnalDeleteErr);
                }

                // Set assertions
                (lcghymnalDeleteRes.body._id).should.equal(lcghymnalSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Lcghymnal if not signed in', function (done) {
    // Set Lcghymnal user
    lcghymnal.user = user;

    // Create new Lcghymnal model instance
    var lcghymnalObj = new Lcghymnal(lcghymnal);

    // Save the Lcghymnal
    lcghymnalObj.save(function () {
      // Try deleting Lcghymnal
      request(app).delete('/api/lcghymnals/' + lcghymnalObj._id)
        .expect(403)
        .end(function (lcghymnalDeleteErr, lcghymnalDeleteRes) {
          // Set message assertion
          (lcghymnalDeleteRes.body.message).should.match('User is not authorized');

          // Handle Lcghymnal error error
          done(lcghymnalDeleteErr);
        });

    });
  });

  it('should be able to get a single Lcghymnal that has an orphaned user reference', function (done) {
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

          // Save a new Lcghymnal
          agent.post('/api/lcghymnals')
            .send(lcghymnal)
            .expect(200)
            .end(function (lcghymnalSaveErr, lcghymnalSaveRes) {
              // Handle Lcghymnal save error
              if (lcghymnalSaveErr) {
                return done(lcghymnalSaveErr);
              }

              // Set assertions on new Lcghymnal
              (lcghymnalSaveRes.body.name).should.equal(lcghymnal.name);
              should.exist(lcghymnalSaveRes.body.user);
              should.equal(lcghymnalSaveRes.body.user._id, orphanId);

              // force the Lcghymnal to have an orphaned user reference
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

                    // Get the Lcghymnal
                    agent.get('/api/lcghymnals/' + lcghymnalSaveRes.body._id)
                      .expect(200)
                      .end(function (lcghymnalInfoErr, lcghymnalInfoRes) {
                        // Handle Lcghymnal error
                        if (lcghymnalInfoErr) {
                          return done(lcghymnalInfoErr);
                        }

                        // Set assertions
                        (lcghymnalInfoRes.body._id).should.equal(lcghymnalSaveRes.body._id);
                        (lcghymnalInfoRes.body.name).should.equal(lcghymnal.name);
                        should.equal(lcghymnalInfoRes.body.user, undefined);

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
      Lcghymnal.remove().exec(done);
    });
  });
});
