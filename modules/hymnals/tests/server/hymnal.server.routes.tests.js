'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Hymnal = mongoose.model('Hymnal'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  hymnal;

/**
 * Hymnal routes tests
 */
describe('Hymnal CRUD tests', function () {

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

    // Save a user to the test db and create new Hymnal
    user.save(function () {
      hymnal = {
        name: 'Hymnal name'
      };

      done();
    });
  });

  it('should be able to save a Hymnal if logged in', function (done) {
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

        // Save a new Hymnal
        agent.post('/api/hymnals')
          .send(hymnal)
          .expect(200)
          .end(function (hymnalSaveErr, hymnalSaveRes) {
            // Handle Hymnal save error
            if (hymnalSaveErr) {
              return done(hymnalSaveErr);
            }

            // Get a list of Hymnals
            agent.get('/api/hymnals')
              .end(function (hymnalsGetErr, hymnalsGetRes) {
                // Handle Hymnals save error
                if (hymnalsGetErr) {
                  return done(hymnalsGetErr);
                }

                // Get Hymnals list
                var hymnals = hymnalsGetRes.body;

                // Set assertions
                (hymnals[0].user._id).should.equal(userId);
                (hymnals[0].name).should.match('Hymnal name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Hymnal if not logged in', function (done) {
    agent.post('/api/hymnals')
      .send(hymnal)
      .expect(403)
      .end(function (hymnalSaveErr, hymnalSaveRes) {
        // Call the assertion callback
        done(hymnalSaveErr);
      });
  });

  it('should not be able to save an Hymnal if no name is provided', function (done) {
    // Invalidate name field
    hymnal.name = '';

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

        // Save a new Hymnal
        agent.post('/api/hymnals')
          .send(hymnal)
          .expect(400)
          .end(function (hymnalSaveErr, hymnalSaveRes) {
            // Set message assertion
            (hymnalSaveRes.body.message).should.match('Please fill Hymnal name');

            // Handle Hymnal save error
            done(hymnalSaveErr);
          });
      });
  });

  it('should be able to update an Hymnal if signed in', function (done) {
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

        // Save a new Hymnal
        agent.post('/api/hymnals')
          .send(hymnal)
          .expect(200)
          .end(function (hymnalSaveErr, hymnalSaveRes) {
            // Handle Hymnal save error
            if (hymnalSaveErr) {
              return done(hymnalSaveErr);
            }

            // Update Hymnal name
            hymnal.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Hymnal
            agent.put('/api/hymnals/' + hymnalSaveRes.body._id)
              .send(hymnal)
              .expect(200)
              .end(function (hymnalUpdateErr, hymnalUpdateRes) {
                // Handle Hymnal update error
                if (hymnalUpdateErr) {
                  return done(hymnalUpdateErr);
                }

                // Set assertions
                (hymnalUpdateRes.body._id).should.equal(hymnalSaveRes.body._id);
                (hymnalUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Hymnals if not signed in', function (done) {
    // Create new Hymnal model instance
    var hymnalObj = new Hymnal(hymnal);

    // Save the hymnal
    hymnalObj.save(function () {
      // Request Hymnals
      request(app).get('/api/hymnals')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Hymnal if not signed in', function (done) {
    // Create new Hymnal model instance
    var hymnalObj = new Hymnal(hymnal);

    // Save the Hymnal
    hymnalObj.save(function () {
      request(app).get('/api/hymnals/' + hymnalObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', hymnal.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Hymnal with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/hymnals/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Hymnal is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Hymnal which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Hymnal
    request(app).get('/api/hymnals/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Hymnal with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Hymnal if signed in', function (done) {
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

        // Save a new Hymnal
        agent.post('/api/hymnals')
          .send(hymnal)
          .expect(200)
          .end(function (hymnalSaveErr, hymnalSaveRes) {
            // Handle Hymnal save error
            if (hymnalSaveErr) {
              return done(hymnalSaveErr);
            }

            // Delete an existing Hymnal
            agent.delete('/api/hymnals/' + hymnalSaveRes.body._id)
              .send(hymnal)
              .expect(200)
              .end(function (hymnalDeleteErr, hymnalDeleteRes) {
                // Handle hymnal error error
                if (hymnalDeleteErr) {
                  return done(hymnalDeleteErr);
                }

                // Set assertions
                (hymnalDeleteRes.body._id).should.equal(hymnalSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Hymnal if not signed in', function (done) {
    // Set Hymnal user
    hymnal.user = user;

    // Create new Hymnal model instance
    var hymnalObj = new Hymnal(hymnal);

    // Save the Hymnal
    hymnalObj.save(function () {
      // Try deleting Hymnal
      request(app).delete('/api/hymnals/' + hymnalObj._id)
        .expect(403)
        .end(function (hymnalDeleteErr, hymnalDeleteRes) {
          // Set message assertion
          (hymnalDeleteRes.body.message).should.match('User is not authorized');

          // Handle Hymnal error error
          done(hymnalDeleteErr);
        });

    });
  });

  it('should be able to get a single Hymnal that has an orphaned user reference', function (done) {
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

          // Save a new Hymnal
          agent.post('/api/hymnals')
            .send(hymnal)
            .expect(200)
            .end(function (hymnalSaveErr, hymnalSaveRes) {
              // Handle Hymnal save error
              if (hymnalSaveErr) {
                return done(hymnalSaveErr);
              }

              // Set assertions on new Hymnal
              (hymnalSaveRes.body.name).should.equal(hymnal.name);
              should.exist(hymnalSaveRes.body.user);
              should.equal(hymnalSaveRes.body.user._id, orphanId);

              // force the Hymnal to have an orphaned user reference
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

                    // Get the Hymnal
                    agent.get('/api/hymnals/' + hymnalSaveRes.body._id)
                      .expect(200)
                      .end(function (hymnalInfoErr, hymnalInfoRes) {
                        // Handle Hymnal error
                        if (hymnalInfoErr) {
                          return done(hymnalInfoErr);
                        }

                        // Set assertions
                        (hymnalInfoRes.body._id).should.equal(hymnalSaveRes.body._id);
                        (hymnalInfoRes.body.name).should.equal(hymnal.name);
                        should.equal(hymnalInfoRes.body.user, undefined);

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
      Hymnal.remove().exec(done);
    });
  });
});
