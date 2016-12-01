'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Wcg1993hymnal = mongoose.model('Wcg1993hymnal'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  wcg1993hymnal;

/**
 * Wcg1993hymnal routes tests
 */
describe('Wcg1993hymnal CRUD tests', function () {

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

    // Save a user to the test db and create new Wcg1993hymnal
    user.save(function () {
      wcg1993hymnal = {
        name: 'Wcg1993hymnal name'
      };

      done();
    });
  });

  it('should be able to save a Wcg1993hymnal if logged in', function (done) {
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

        // Save a new Wcg1993hymnal
        agent.post('/api/wcg1993hymnals')
          .send(wcg1993hymnal)
          .expect(200)
          .end(function (wcg1993hymnalSaveErr, wcg1993hymnalSaveRes) {
            // Handle Wcg1993hymnal save error
            if (wcg1993hymnalSaveErr) {
              return done(wcg1993hymnalSaveErr);
            }

            // Get a list of Wcg1993hymnals
            agent.get('/api/wcg1993hymnals')
              .end(function (wcg1993hymnalsGetErr, wcg1993hymnalsGetRes) {
                // Handle Wcg1993hymnals save error
                if (wcg1993hymnalsGetErr) {
                  return done(wcg1993hymnalsGetErr);
                }

                // Get Wcg1993hymnals list
                var wcg1993hymnals = wcg1993hymnalsGetRes.body;

                // Set assertions
                (wcg1993hymnals[0].user._id).should.equal(userId);
                (wcg1993hymnals[0].name).should.match('Wcg1993hymnal name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Wcg1993hymnal if not logged in', function (done) {
    agent.post('/api/wcg1993hymnals')
      .send(wcg1993hymnal)
      .expect(403)
      .end(function (wcg1993hymnalSaveErr, wcg1993hymnalSaveRes) {
        // Call the assertion callback
        done(wcg1993hymnalSaveErr);
      });
  });

  it('should not be able to save an Wcg1993hymnal if no name is provided', function (done) {
    // Invalidate name field
    wcg1993hymnal.name = '';

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

        // Save a new Wcg1993hymnal
        agent.post('/api/wcg1993hymnals')
          .send(wcg1993hymnal)
          .expect(400)
          .end(function (wcg1993hymnalSaveErr, wcg1993hymnalSaveRes) {
            // Set message assertion
            (wcg1993hymnalSaveRes.body.message).should.match('Please fill Wcg1993hymnal name');

            // Handle Wcg1993hymnal save error
            done(wcg1993hymnalSaveErr);
          });
      });
  });

  it('should be able to update an Wcg1993hymnal if signed in', function (done) {
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

        // Save a new Wcg1993hymnal
        agent.post('/api/wcg1993hymnals')
          .send(wcg1993hymnal)
          .expect(200)
          .end(function (wcg1993hymnalSaveErr, wcg1993hymnalSaveRes) {
            // Handle Wcg1993hymnal save error
            if (wcg1993hymnalSaveErr) {
              return done(wcg1993hymnalSaveErr);
            }

            // Update Wcg1993hymnal name
            wcg1993hymnal.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Wcg1993hymnal
            agent.put('/api/wcg1993hymnals/' + wcg1993hymnalSaveRes.body._id)
              .send(wcg1993hymnal)
              .expect(200)
              .end(function (wcg1993hymnalUpdateErr, wcg1993hymnalUpdateRes) {
                // Handle Wcg1993hymnal update error
                if (wcg1993hymnalUpdateErr) {
                  return done(wcg1993hymnalUpdateErr);
                }

                // Set assertions
                (wcg1993hymnalUpdateRes.body._id).should.equal(wcg1993hymnalSaveRes.body._id);
                (wcg1993hymnalUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Wcg1993hymnals if not signed in', function (done) {
    // Create new Wcg1993hymnal model instance
    var wcg1993hymnalObj = new Wcg1993hymnal(wcg1993hymnal);

    // Save the wcg1993hymnal
    wcg1993hymnalObj.save(function () {
      // Request Wcg1993hymnals
      request(app).get('/api/wcg1993hymnals')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Wcg1993hymnal if not signed in', function (done) {
    // Create new Wcg1993hymnal model instance
    var wcg1993hymnalObj = new Wcg1993hymnal(wcg1993hymnal);

    // Save the Wcg1993hymnal
    wcg1993hymnalObj.save(function () {
      request(app).get('/api/wcg1993hymnals/' + wcg1993hymnalObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', wcg1993hymnal.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Wcg1993hymnal with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/wcg1993hymnals/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Wcg1993hymnal is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Wcg1993hymnal which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Wcg1993hymnal
    request(app).get('/api/wcg1993hymnals/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Wcg1993hymnal with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Wcg1993hymnal if signed in', function (done) {
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

        // Save a new Wcg1993hymnal
        agent.post('/api/wcg1993hymnals')
          .send(wcg1993hymnal)
          .expect(200)
          .end(function (wcg1993hymnalSaveErr, wcg1993hymnalSaveRes) {
            // Handle Wcg1993hymnal save error
            if (wcg1993hymnalSaveErr) {
              return done(wcg1993hymnalSaveErr);
            }

            // Delete an existing Wcg1993hymnal
            agent.delete('/api/wcg1993hymnals/' + wcg1993hymnalSaveRes.body._id)
              .send(wcg1993hymnal)
              .expect(200)
              .end(function (wcg1993hymnalDeleteErr, wcg1993hymnalDeleteRes) {
                // Handle wcg1993hymnal error error
                if (wcg1993hymnalDeleteErr) {
                  return done(wcg1993hymnalDeleteErr);
                }

                // Set assertions
                (wcg1993hymnalDeleteRes.body._id).should.equal(wcg1993hymnalSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Wcg1993hymnal if not signed in', function (done) {
    // Set Wcg1993hymnal user
    wcg1993hymnal.user = user;

    // Create new Wcg1993hymnal model instance
    var wcg1993hymnalObj = new Wcg1993hymnal(wcg1993hymnal);

    // Save the Wcg1993hymnal
    wcg1993hymnalObj.save(function () {
      // Try deleting Wcg1993hymnal
      request(app).delete('/api/wcg1993hymnals/' + wcg1993hymnalObj._id)
        .expect(403)
        .end(function (wcg1993hymnalDeleteErr, wcg1993hymnalDeleteRes) {
          // Set message assertion
          (wcg1993hymnalDeleteRes.body.message).should.match('User is not authorized');

          // Handle Wcg1993hymnal error error
          done(wcg1993hymnalDeleteErr);
        });

    });
  });

  it('should be able to get a single Wcg1993hymnal that has an orphaned user reference', function (done) {
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

          // Save a new Wcg1993hymnal
          agent.post('/api/wcg1993hymnals')
            .send(wcg1993hymnal)
            .expect(200)
            .end(function (wcg1993hymnalSaveErr, wcg1993hymnalSaveRes) {
              // Handle Wcg1993hymnal save error
              if (wcg1993hymnalSaveErr) {
                return done(wcg1993hymnalSaveErr);
              }

              // Set assertions on new Wcg1993hymnal
              (wcg1993hymnalSaveRes.body.name).should.equal(wcg1993hymnal.name);
              should.exist(wcg1993hymnalSaveRes.body.user);
              should.equal(wcg1993hymnalSaveRes.body.user._id, orphanId);

              // force the Wcg1993hymnal to have an orphaned user reference
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

                    // Get the Wcg1993hymnal
                    agent.get('/api/wcg1993hymnals/' + wcg1993hymnalSaveRes.body._id)
                      .expect(200)
                      .end(function (wcg1993hymnalInfoErr, wcg1993hymnalInfoRes) {
                        // Handle Wcg1993hymnal error
                        if (wcg1993hymnalInfoErr) {
                          return done(wcg1993hymnalInfoErr);
                        }

                        // Set assertions
                        (wcg1993hymnalInfoRes.body._id).should.equal(wcg1993hymnalSaveRes.body._id);
                        (wcg1993hymnalInfoRes.body.name).should.equal(wcg1993hymnal.name);
                        should.equal(wcg1993hymnalInfoRes.body.user, undefined);

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
      Wcg1993hymnal.remove().exec(done);
    });
  });
});
