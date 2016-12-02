'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Cogwahymnal = mongoose.model('Cogwahymnal'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Cogwahymnal
 */
exports.create = function(req, res) {
  var cogwahymnal = new Cogwahymnal(req.body);
  cogwahymnal.user = req.user;

  cogwahymnal.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(cogwahymnal);
    }
  });
};

/**
 * Show the current Cogwahymnal
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var cogwahymnal = req.cogwahymnal ? req.cogwahymnal.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  cogwahymnal.isCurrentUserOwner = req.user && cogwahymnal.user && cogwahymnal.user._id.toString() === req.user._id.toString();

  res.jsonp(cogwahymnal);
};

/**
 * Update a Cogwahymnal
 */
exports.update = function(req, res) {
  var cogwahymnal = req.cogwahymnal;

  cogwahymnal = _.extend(cogwahymnal, req.body);

  cogwahymnal.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(cogwahymnal);
    }
  });
};

/**
 * Delete an Cogwahymnal
 */
exports.delete = function(req, res) {
  var cogwahymnal = req.cogwahymnal;

  cogwahymnal.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(cogwahymnal);
    }
  });
};

/**
 * List of Cogwahymnals
 */
exports.list = function(req, res) {
  Cogwahymnal.find().sort('-created').populate('user', 'displayName').exec(function(err, cogwahymnals) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(cogwahymnals);
    }
  });
};

/**
 * Cogwahymnal middleware
 */
exports.cogwahymnalByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Cogwahymnal is invalid'
    });
  }

  Cogwahymnal.findById(id).populate('user', 'displayName').exec(function (err, cogwahymnal) {
    if (err) {
      return next(err);
    } else if (!cogwahymnal) {
      return res.status(404).send({
        message: 'No Cogwahymnal with that identifier has been found'
      });
    }
    req.cogwahymnal = cogwahymnal;
    next();
  });
};
