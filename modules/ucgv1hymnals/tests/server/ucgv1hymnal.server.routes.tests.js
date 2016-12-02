'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Ucgv1hymnal = mongoose.model('Ucgv1hymnal'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  ucgv1hymnal;

/**
 * Ucgv1hymnal routes tests
 */
describe('Ucgv1hymnal CRUD tests', function () {

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

    // Save a user to the test db and create new Ucgv1hymnal
    user.save(function () {
      ucgv1hymnal = {
        name: 'Ucgv1hymnal name'
      };

      done();
    });
  });

  it('should be able to save a Ucgv1hymnal if logged in', function (done) {
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

        // Save a new Ucgv1hymnal
        agent.post('/api/ucgv1hymnals')
          .send(ucgv1hymnal)
          .expect(200)
          .end(function (ucgv1hymnalSaveErr, ucgv1hymnalSaveRes) {
            // Handle Ucgv1hymnal save error
            if (ucgv1hymnalSaveErr) {
              return done(ucgv1hymnalSaveErr);
            }

            // Get a list of Ucgv1hymnals
            agent.get('/api/ucgv1hymnals')
              .end(function (ucgv1hymnalsGetErr, ucgv1hymnalsGetRes) {
                // Handle Ucgv1hymnals save error
                if (ucgv1hymnalsGetErr) {
                  return done(ucgv1hymnalsGetErr);
                }

                // Get Ucgv1hymnals list
                var ucgv1hymnals = ucgv1hymnalsGetRes.body;

                // Set assertions
                (ucgv1hymnals[0].user._id).should.equal(userId);
                (ucgv1hymnals[0].name).should.match('Ucgv1hymnal name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Ucgv1hymnal if not logged in', function (done) {
    agent.post('/api/ucgv1hymnals')
      .send(ucgv1hymnal)
      .expect(403)
      .end(function (ucgv1hymnalSaveErr, ucgv1hymnalSaveRes) {
        // Call the assertion callback
        done(ucgv1hymnalSaveErr);
      });
  });

  it('should not be able to save an Ucgv1hymnal if no name is provided', function (done) {
    // Invalidate name field
    ucgv1hymnal.name = '';

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

        // Save a new Ucgv1hymnal
        agent.post('/api/ucgv1hymnals')
          .send(ucgv1hymnal)
          .expect(400)
          .end(function (ucgv1hymnalSaveErr, ucgv1hymnalSaveRes) {
            // Set message assertion
            (ucgv1hymnalSaveRes.body.message).should.match('Please fill Ucgv1hymnal name');

            // Handle Ucgv1hymnal save error
            done(ucgv1hymnalSaveErr);
          });
      });
  });

  it('should be able to update an Ucgv1hymnal if signed in', function (done) {
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

        // Save a new Ucgv1hymnal
        agent.post('/api/ucgv1hymnals')
          .send(ucgv1hymnal)
          .expect(200)
          .end(function (ucgv1hymnalSaveErr, ucgv1hymnalSaveRes) {
            // Handle Ucgv1hymnal save error
            if (ucgv1hymnalSaveErr) {
              return done(ucgv1hymnalSaveErr);
            }

            // Update Ucgv1hymnal name
            ucgv1hymnal.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Ucgv1hymnal
            agent.put('/api/ucgv1hymnals/' + ucgv1hymnalSaveRes.body._id)
              .send(ucgv1hymnal)
              .expect(200)
              .end(function (ucgv1hymnalUpdateErr, ucgv1hymnalUpdateRes) {
                // Handle Ucgv1hymnal update error
                if (ucgv1hymnalUpdateErr) {
                  return done(ucgv1hymnalUpdateErr);
                }

                // Set assertions
                (ucgv1hymnalUpdateRes.body._id).should.equal(ucgv1hymnalSaveRes.body._id);
                (ucgv1hymnalUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Ucgv1hymnals if not signed in', function (done) {
    // Create new Ucgv1hymnal model instance
    var ucgv1hymnalObj = new Ucgv1hymnal(ucgv1hymnal);

    // Save the ucgv1hymnal
    ucgv1hymnalObj.save(function () {
      // Request Ucgv1hymnals
      request(app).get('/api/ucgv1hymnals')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Ucgv1hymnal if not signed in', function (done) {
    // Create new Ucgv1hymnal model instance
    var ucgv1hymnalObj = new Ucgv1hymnal(ucgv1hymnal);

    // Save the Ucgv1hymnal
    ucgv1hymnalObj.save(function () {
      request(app).get('/api/ucgv1hymnals/' + ucgv1hymnalObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', ucgv1hymnal.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Ucgv1hymnal with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/ucgv1hymnals/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Ucgv1hymnal is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Ucgv1hymnal which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Ucgv1hymnal
    request(app).get('/api/ucgv1hymnals/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Ucgv1hymnal with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Ucgv1hymnal if signed in', function (done) {
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

        // Save a new Ucgv1hymnal
        agent.post('/api/ucgv1hymnals')
          .send(ucgv1hymnal)
          .expect(200)
          .end(function (ucgv1hymnalSaveErr, ucgv1hymnalSaveRes) {
            // Handle Ucgv1hymnal save error
            if (ucgv1hymnalSaveErr) {
              return done(ucgv1hymnalSaveErr);
            }

            // Delete an existing Ucgv1hymnal
            agent.delete('/api/ucgv1hymnals/' + ucgv1hymnalSaveRes.body._id)
              .send(ucgv1hymnal)
              .expect(200)
              .end(function (ucgv1hymnalDeleteErr, ucgv1hymnalDeleteRes) {
                // Handle ucgv1hymnal error error
                if (ucgv1hymnalDeleteErr) {
                  return done(ucgv1hymnalDeleteErr);
                }

                // Set assertions
                (ucgv1hymnalDeleteRes.body._id).should.equal(ucgv1hymnalSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Ucgv1hymnal if not signed in', function (done) {
    // Set Ucgv1hymnal user
    ucgv1hymnal.user = user;

    // Create new Ucgv1hymnal model instance
    var ucgv1hymnalObj = new Ucgv1hymnal(ucgv1hymnal);

    // Save the Ucgv1hymnal
    ucgv1hymnalObj.save(function () {
      // Try deleting Ucgv1hymnal
      request(app).delete('/api/ucgv1hymnals/' + ucgv1hymnalObj._id)
        .expect(403)
        .end(function (ucgv1hymnalDeleteErr, ucgv1hymnalDeleteRes) {
          // Set message assertion
          (ucgv1hymnalDeleteRes.body.message).should.match('User is not authorized');

          // Handle Ucgv1hymnal error error
          done(ucgv1hymnalDeleteErr);
        });

    });
  });

  it('should be able to get a single Ucgv1hymnal that has an orphaned user reference', function (done) {
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

          // Save a new Ucgv1hymnal
          agent.post('/api/ucgv1hymnals')
            .send(ucgv1hymnal)
            .expect(200)
            .end(function (ucgv1hymnalSaveErr, ucgv1hymnalSaveRes) {
              // Handle Ucgv1hymnal save error
              if (ucgv1hymnalSaveErr) {
                return done(ucgv1hymnalSaveErr);
              }

              // Set assertions on new Ucgv1hymnal
              (ucgv1hymnalSaveRes.body.name).should.equal(ucgv1hymnal.name);
              should.exist(ucgv1hymnalSaveRes.body.user);
              should.equal(ucgv1hymnalSaveRes.body.user._id, orphanId);

              // force the Ucgv1hymnal to have an orphaned user reference
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

                    // Get the Ucgv1hymnal
                    agent.get('/api/ucgv1hymnals/' + ucgv1hymnalSaveRes.body._id)
                      .expect(200)
                      .end(function (ucgv1hymnalInfoErr, ucgv1hymnalInfoRes) {
                        // Handle Ucgv1hymnal error
                        if (ucgv1hymnalInfoErr) {
                          return done(ucgv1hymnalInfoErr);
                        }

                        // Set assertions
                        (ucgv1hymnalInfoRes.body._id).should.equal(ucgv1hymnalSaveRes.body._id);
                        (ucgv1hymnalInfoRes.body.name).should.equal(ucgv1hymnal.name);
                        should.equal(ucgv1hymnalInfoRes.body.user, undefined);

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
      Ucgv1hymnal.remove().exec(done);
    });
  });
});
