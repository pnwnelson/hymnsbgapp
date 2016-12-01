'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Wcg1993hymnal = mongoose.model('Wcg1993hymnal'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Wcg1993hymnal
 */
exports.create = function(req, res) {
  var wcg1993hymnal = new Wcg1993hymnal(req.body);
  wcg1993hymnal.user = req.user;

  wcg1993hymnal.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(wcg1993hymnal);
    }
  });
};

/**
 * Show the current Wcg1993hymnal
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var wcg1993hymnal = req.wcg1993hymnal ? req.wcg1993hymnal.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  wcg1993hymnal.isCurrentUserOwner = req.user && wcg1993hymnal.user && wcg1993hymnal.user._id.toString() === req.user._id.toString();

  res.jsonp(wcg1993hymnal);
};

/**
 * Update a Wcg1993hymnal
 */
exports.update = function(req, res) {
  var wcg1993hymnal = req.wcg1993hymnal;

  wcg1993hymnal = _.extend(wcg1993hymnal, req.body);

  wcg1993hymnal.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(wcg1993hymnal);
    }
  });
};

/**
 * Delete an Wcg1993hymnal
 */
exports.delete = function(req, res) {
  var wcg1993hymnal = req.wcg1993hymnal;

  wcg1993hymnal.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(wcg1993hymnal);
    }
  });
};

/**
 * List of Wcg1993hymnals
 */
exports.list = function(req, res) {
  Wcg1993hymnal.find().sort('-created').populate('user', 'displayName').exec(function(err, wcg1993hymnals) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(wcg1993hymnals);
    }
  });
};

/**
 * Wcg1993hymnal middleware
 */
exports.wcg1993hymnalByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Wcg1993hymnal is invalid'
    });
  }

  Wcg1993hymnal.findById(id).populate('user', 'displayName').exec(function (err, wcg1993hymnal) {
    if (err) {
      return next(err);
    } else if (!wcg1993hymnal) {
      return res.status(404).send({
        message: 'No Wcg1993hymnal with that identifier has been found'
      });
    }
    req.wcg1993hymnal = wcg1993hymnal;
    next();
  });
};
