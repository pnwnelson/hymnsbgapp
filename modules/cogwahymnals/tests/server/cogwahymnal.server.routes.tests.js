'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Cogwahymnal = mongoose.model('Cogwahymnal'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  cogwahymnal;

/**
 * Cogwahymnal routes tests
 */
describe('Cogwahymnal CRUD tests', function () {

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

    // Save a user to the test db and create new Cogwahymnal
    user.save(function () {
      cogwahymnal = {
        name: 'Cogwahymnal name'
      };

      done();
    });
  });

  it('should be able to save a Cogwahymnal if logged in', function (done) {
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

        // Save a new Cogwahymnal
        agent.post('/api/cogwahymnals')
          .send(cogwahymnal)
          .expect(200)
          .end(function (cogwahymnalSaveErr, cogwahymnalSaveRes) {
            // Handle Cogwahymnal save error
            if (cogwahymnalSaveErr) {
              return done(cogwahymnalSaveErr);
            }

            // Get a list of Cogwahymnals
            agent.get('/api/cogwahymnals')
              .end(function (cogwahymnalsGetErr, cogwahymnalsGetRes) {
                // Handle Cogwahymnals save error
                if (cogwahymnalsGetErr) {
                  return done(cogwahymnalsGetErr);
                }

                // Get Cogwahymnals list
                var cogwahymnals = cogwahymnalsGetRes.body;

                // Set assertions
                (cogwahymnals[0].user._id).should.equal(userId);
                (cogwahymnals[0].name).should.match('Cogwahymnal name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Cogwahymnal if not logged in', function (done) {
    agent.post('/api/cogwahymnals')
      .send(cogwahymnal)
      .expect(403)
      .end(function (cogwahymnalSaveErr, cogwahymnalSaveRes) {
        // Call the assertion callback
        done(cogwahymnalSaveErr);
      });
  });

  it('should not be able to save an Cogwahymnal if no name is provided', function (done) {
    // Invalidate name field
    cogwahymnal.name = '';

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

        // Save a new Cogwahymnal
        agent.post('/api/cogwahymnals')
          .send(cogwahymnal)
          .expect(400)
          .end(function (cogwahymnalSaveErr, cogwahymnalSaveRes) {
            // Set message assertion
            (cogwahymnalSaveRes.body.message).should.match('Please fill Cogwahymnal name');

            // Handle Cogwahymnal save error
            done(cogwahymnalSaveErr);
          });
      });
  });

  it('should be able to update an Cogwahymnal if signed in', function (done) {
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

        // Save a new Cogwahymnal
        agent.post('/api/cogwahymnals')
          .send(cogwahymnal)
          .expect(200)
          .end(function (cogwahymnalSaveErr, cogwahymnalSaveRes) {
            // Handle Cogwahymnal save error
            if (cogwahymnalSaveErr) {
              return done(cogwahymnalSaveErr);
            }

            // Update Cogwahymnal name
            cogwahymnal.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Cogwahymnal
            agent.put('/api/cogwahymnals/' + cogwahymnalSaveRes.body._id)
              .send(cogwahymnal)
              .expect(200)
              .end(function (cogwahymnalUpdateErr, cogwahymnalUpdateRes) {
                // Handle Cogwahymnal update error
                if (cogwahymnalUpdateErr) {
                  return done(cogwahymnalUpdateErr);
                }

                // Set assertions
                (cogwahymnalUpdateRes.body._id).should.equal(cogwahymnalSaveRes.body._id);
                (cogwahymnalUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Cogwahymnals if not signed in', function (done) {
    // Create new Cogwahymnal model instance
    var cogwahymnalObj = new Cogwahymnal(cogwahymnal);

    // Save the cogwahymnal
    cogwahymnalObj.save(function () {
      // Request Cogwahymnals
      request(app).get('/api/cogwahymnals')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Cogwahymnal if not signed in', function (done) {
    // Create new Cogwahymnal model instance
    var cogwahymnalObj = new Cogwahymnal(cogwahymnal);

    // Save the Cogwahymnal
    cogwahymnalObj.save(function () {
      request(app).get('/api/cogwahymnals/' + cogwahymnalObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', cogwahymnal.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Cogwahymnal with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/cogwahymnals/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Cogwahymnal is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Cogwahymnal which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Cogwahymnal
    request(app).get('/api/cogwahymnals/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Cogwahymnal with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Cogwahymnal if signed in', function (done) {
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

        // Save a new Cogwahymnal
        agent.post('/api/cogwahymnals')
          .send(cogwahymnal)
          .expect(200)
          .end(function (cogwahymnalSaveErr, cogwahymnalSaveRes) {
            // Handle Cogwahymnal save error
            if (cogwahymnalSaveErr) {
              return done(cogwahymnalSaveErr);
            }

            // Delete an existing Cogwahymnal
            agent.delete('/api/cogwahymnals/' + cogwahymnalSaveRes.body._id)
              .send(cogwahymnal)
              .expect(200)
              .end(function (cogwahymnalDeleteErr, cogwahymnalDeleteRes) {
                // Handle cogwahymnal error error
                if (cogwahymnalDeleteErr) {
                  return done(cogwahymnalDeleteErr);
                }

                // Set assertions
                (cogwahymnalDeleteRes.body._id).should.equal(cogwahymnalSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Cogwahymnal if not signed in', function (done) {
    // Set Cogwahymnal user
    cogwahymnal.user = user;

    // Create new Cogwahymnal model instance
    var cogwahymnalObj = new Cogwahymnal(cogwahymnal);

    // Save the Cogwahymnal
    cogwahymnalObj.save(function () {
      // Try deleting Cogwahymnal
      request(app).delete('/api/cogwahymnals/' + cogwahymnalObj._id)
        .expect(403)
        .end(function (cogwahymnalDeleteErr, cogwahymnalDeleteRes) {
          // Set message assertion
          (cogwahymnalDeleteRes.body.message).should.match('User is not authorized');

          // Handle Cogwahymnal error error
          done(cogwahymnalDeleteErr);
        });

    });
  });

  it('should be able to get a single Cogwahymnal that has an orphaned user reference', function (done) {
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

          // Save a new Cogwahymnal
          agent.post('/api/cogwahymnals')
            .send(cogwahymnal)
            .expect(200)
            .end(function (cogwahymnalSaveErr, cogwahymnalSaveRes) {
              // Handle Cogwahymnal save error
              if (cogwahymnalSaveErr) {
                return done(cogwahymnalSaveErr);
              }

              // Set assertions on new Cogwahymnal
              (cogwahymnalSaveRes.body.name).should.equal(cogwahymnal.name);
              should.exist(cogwahymnalSaveRes.body.user);
              should.equal(cogwahymnalSaveRes.body.user._id, orphanId);

              // force the Cogwahymnal to have an orphaned user reference
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

                    // Get the Cogwahymnal
                    agent.get('/api/cogwahymnals/' + cogwahymnalSaveRes.body._id)
                      .expect(200)
                      .end(function (cogwahymnalInfoErr, cogwahymnalInfoRes) {
                        // Handle Cogwahymnal error
                        if (cogwahymnalInfoErr) {
                          return done(cogwahymnalInfoErr);
                        }

                        // Set assertions
                        (cogwahymnalInfoRes.body._id).should.equal(cogwahymnalSaveRes.body._id);
                        (cogwahymnalInfoRes.body.name).should.equal(cogwahymnal.name);
                        should.equal(cogwahymnalInfoRes.body.user, undefined);

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
      Cogwahymnal.remove().exec(done);
    });
  });
});
