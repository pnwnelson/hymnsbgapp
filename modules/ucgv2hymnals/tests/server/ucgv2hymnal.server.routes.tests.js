'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Ucgv2hymnal = mongoose.model('Ucgv2hymnal'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  ucgv2hymnal;

/**
 * Ucgv2hymnal routes tests
 */
describe('Ucgv2hymnal CRUD tests', function () {

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

    // Save a user to the test db and create new Ucgv2hymnal
    user.save(function () {
      ucgv2hymnal = {
        name: 'Ucgv2hymnal name'
      };

      done();
    });
  });

  it('should be able to save a Ucgv2hymnal if logged in', function (done) {
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

        // Save a new Ucgv2hymnal
        agent.post('/api/ucgv2hymnals')
          .send(ucgv2hymnal)
          .expect(200)
          .end(function (ucgv2hymnalSaveErr, ucgv2hymnalSaveRes) {
            // Handle Ucgv2hymnal save error
            if (ucgv2hymnalSaveErr) {
              return done(ucgv2hymnalSaveErr);
            }

            // Get a list of Ucgv2hymnals
            agent.get('/api/ucgv2hymnals')
              .end(function (ucgv2hymnalsGetErr, ucgv2hymnalsGetRes) {
                // Handle Ucgv2hymnals save error
                if (ucgv2hymnalsGetErr) {
                  return done(ucgv2hymnalsGetErr);
                }

                // Get Ucgv2hymnals list
                var ucgv2hymnals = ucgv2hymnalsGetRes.body;

                // Set assertions
                (ucgv2hymnals[0].user._id).should.equal(userId);
                (ucgv2hymnals[0].name).should.match('Ucgv2hymnal name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Ucgv2hymnal if not logged in', function (done) {
    agent.post('/api/ucgv2hymnals')
      .send(ucgv2hymnal)
      .expect(403)
      .end(function (ucgv2hymnalSaveErr, ucgv2hymnalSaveRes) {
        // Call the assertion callback
        done(ucgv2hymnalSaveErr);
      });
  });

  it('should not be able to save an Ucgv2hymnal if no name is provided', function (done) {
    // Invalidate name field
    ucgv2hymnal.name = '';

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

        // Save a new Ucgv2hymnal
        agent.post('/api/ucgv2hymnals')
          .send(ucgv2hymnal)
          .expect(400)
          .end(function (ucgv2hymnalSaveErr, ucgv2hymnalSaveRes) {
            // Set message assertion
            (ucgv2hymnalSaveRes.body.message).should.match('Please fill Ucgv2hymnal name');

            // Handle Ucgv2hymnal save error
            done(ucgv2hymnalSaveErr);
          });
      });
  });

  it('should be able to update an Ucgv2hymnal if signed in', function (done) {
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

        // Save a new Ucgv2hymnal
        agent.post('/api/ucgv2hymnals')
          .send(ucgv2hymnal)
          .expect(200)
          .end(function (ucgv2hymnalSaveErr, ucgv2hymnalSaveRes) {
            // Handle Ucgv2hymnal save error
            if (ucgv2hymnalSaveErr) {
              return done(ucgv2hymnalSaveErr);
            }

            // Update Ucgv2hymnal name
            ucgv2hymnal.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Ucgv2hymnal
            agent.put('/api/ucgv2hymnals/' + ucgv2hymnalSaveRes.body._id)
              .send(ucgv2hymnal)
              .expect(200)
              .end(function (ucgv2hymnalUpdateErr, ucgv2hymnalUpdateRes) {
                // Handle Ucgv2hymnal update error
                if (ucgv2hymnalUpdateErr) {
                  return done(ucgv2hymnalUpdateErr);
                }

                // Set assertions
                (ucgv2hymnalUpdateRes.body._id).should.equal(ucgv2hymnalSaveRes.body._id);
                (ucgv2hymnalUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Ucgv2hymnals if not signed in', function (done) {
    // Create new Ucgv2hymnal model instance
    var ucgv2hymnalObj = new Ucgv2hymnal(ucgv2hymnal);

    // Save the ucgv2hymnal
    ucgv2hymnalObj.save(function () {
      // Request Ucgv2hymnals
      request(app).get('/api/ucgv2hymnals')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Ucgv2hymnal if not signed in', function (done) {
    // Create new Ucgv2hymnal model instance
    var ucgv2hymnalObj = new Ucgv2hymnal(ucgv2hymnal);

    // Save the Ucgv2hymnal
    ucgv2hymnalObj.save(function () {
      request(app).get('/api/ucgv2hymnals/' + ucgv2hymnalObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', ucgv2hymnal.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Ucgv2hymnal with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/ucgv2hymnals/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Ucgv2hymnal is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Ucgv2hymnal which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Ucgv2hymnal
    request(app).get('/api/ucgv2hymnals/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Ucgv2hymnal with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Ucgv2hymnal if signed in', function (done) {
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

        // Save a new Ucgv2hymnal
        agent.post('/api/ucgv2hymnals')
          .send(ucgv2hymnal)
          .expect(200)
          .end(function (ucgv2hymnalSaveErr, ucgv2hymnalSaveRes) {
            // Handle Ucgv2hymnal save error
            if (ucgv2hymnalSaveErr) {
              return done(ucgv2hymnalSaveErr);
            }

            // Delete an existing Ucgv2hymnal
            agent.delete('/api/ucgv2hymnals/' + ucgv2hymnalSaveRes.body._id)
              .send(ucgv2hymnal)
              .expect(200)
              .end(function (ucgv2hymnalDeleteErr, ucgv2hymnalDeleteRes) {
                // Handle ucgv2hymnal error error
                if (ucgv2hymnalDeleteErr) {
                  return done(ucgv2hymnalDeleteErr);
                }

                // Set assertions
                (ucgv2hymnalDeleteRes.body._id).should.equal(ucgv2hymnalSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Ucgv2hymnal if not signed in', function (done) {
    // Set Ucgv2hymnal user
    ucgv2hymnal.user = user;

    // Create new Ucgv2hymnal model instance
    var ucgv2hymnalObj = new Ucgv2hymnal(ucgv2hymnal);

    // Save the Ucgv2hymnal
    ucgv2hymnalObj.save(function () {
      // Try deleting Ucgv2hymnal
      request(app).delete('/api/ucgv2hymnals/' + ucgv2hymnalObj._id)
        .expect(403)
        .end(function (ucgv2hymnalDeleteErr, ucgv2hymnalDeleteRes) {
          // Set message assertion
          (ucgv2hymnalDeleteRes.body.message).should.match('User is not authorized');

          // Handle Ucgv2hymnal error error
          done(ucgv2hymnalDeleteErr);
        });

    });
  });

  it('should be able to get a single Ucgv2hymnal that has an orphaned user reference', function (done) {
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

          // Save a new Ucgv2hymnal
          agent.post('/api/ucgv2hymnals')
            .send(ucgv2hymnal)
            .expect(200)
            .end(function (ucgv2hymnalSaveErr, ucgv2hymnalSaveRes) {
              // Handle Ucgv2hymnal save error
              if (ucgv2hymnalSaveErr) {
                return done(ucgv2hymnalSaveErr);
              }

              // Set assertions on new Ucgv2hymnal
              (ucgv2hymnalSaveRes.body.name).should.equal(ucgv2hymnal.name);
              should.exist(ucgv2hymnalSaveRes.body.user);
              should.equal(ucgv2hymnalSaveRes.body.user._id, orphanId);

              // force the Ucgv2hymnal to have an orphaned user reference
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

                    // Get the Ucgv2hymnal
                    agent.get('/api/ucgv2hymnals/' + ucgv2hymnalSaveRes.body._id)
                      .expect(200)
                      .end(function (ucgv2hymnalInfoErr, ucgv2hymnalInfoRes) {
                        // Handle Ucgv2hymnal error
                        if (ucgv2hymnalInfoErr) {
                          return done(ucgv2hymnalInfoErr);
                        }

                        // Set assertions
                        (ucgv2hymnalInfoRes.body._id).should.equal(ucgv2hymnalSaveRes.body._id);
                        (ucgv2hymnalInfoRes.body.name).should.equal(ucgv2hymnal.name);
                        should.equal(ucgv2hymnalInfoRes.body.user, undefined);

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
      Ucgv2hymnal.remove().exec(done);
    });
  });
});
