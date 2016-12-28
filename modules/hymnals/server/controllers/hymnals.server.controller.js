'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Hymnal = mongoose.model('Hymnal'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Hymnal
 */
exports.create = function(req, res) {
  var hymnal = new Hymnal(req.body);
  hymnal.user = req.user;

  hymnal.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(hymnal);
    }
  });
};

/**
 * Show the current Hymnal
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var hymnal = req.hymnal ? req.hymnal.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  hymnal.isCurrentUserOwner = req.user && hymnal.user && hymnal.user._id.toString() === req.user._id.toString();

  res.jsonp(hymnal);
};

/**
 * Update a Hymnal
 */
exports.update = function(req, res) {
  var hymnal = req.hymnal;

  hymnal = _.extend(hymnal, req.body);

  hymnal.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(hymnal);
    }
  });
};

/**
 * Delete an Hymnal
 */
exports.delete = function(req, res) {
  var hymnal = req.hymnal;

  hymnal.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(hymnal);
    }
  });
};

/**
 * List of Hymnals
 */
exports.list = function(req, res) {
  Hymnal.find().sort('-created').populate('user', 'displayName').exec(function(err, hymnals) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(hymnals);
    }
  });
};

/**
 * Hymnal middleware
 */
exports.hymnalByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Hymnal is invalid'
    });
  }

  Hymnal.findById(id).populate('user', 'displayName').exec(function (err, hymnal) {
    if (err) {
      return next(err);
    } else if (!hymnal) {
      return res.status(404).send({
        message: 'No Hymnal with that identifier has been found'
      });
    }
    req.hymnal = hymnal;
    next();
  });
};
