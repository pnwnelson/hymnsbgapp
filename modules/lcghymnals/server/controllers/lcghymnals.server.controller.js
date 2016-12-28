'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Lcghymnal = mongoose.model('Lcghymnal'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Lcghymnal
 */
exports.create = function(req, res) {
  var lcghymnal = new Lcghymnal(req.body);
  lcghymnal.user = req.user;

  lcghymnal.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(lcghymnal);
    }
  });
};

/**
 * Show the current Lcghymnal
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var lcghymnal = req.lcghymnal ? req.lcghymnal.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  lcghymnal.isCurrentUserOwner = req.user && lcghymnal.user && lcghymnal.user._id.toString() === req.user._id.toString();

  res.jsonp(lcghymnal);
};

/**
 * Update a Lcghymnal
 */
exports.update = function(req, res) {
  var lcghymnal = req.lcghymnal;

  lcghymnal = _.extend(lcghymnal, req.body);

  lcghymnal.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(lcghymnal);
    }
  });
};

/**
 * Delete an Lcghymnal
 */
exports.delete = function(req, res) {
  var lcghymnal = req.lcghymnal;

  lcghymnal.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(lcghymnal);
    }
  });
};

/**
 * List of Lcghymnals
 */
exports.list = function(req, res) {
  Lcghymnal.find().sort('-created').populate('user', 'displayName').exec(function(err, lcghymnals) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(lcghymnals);
    }
  });
};

/**
 * Lcghymnal middleware
 */
exports.lcghymnalByID = function(req, res, next, id) {

  Lcghymnal.findOne({$or: [{page: id}, {id}]}).populate('user', 'displayName').exec(function (err, lcghymnal) {
    if (err) {
      return next(err);
    } else if (!lcghymnal) {
      return res.status(404).send({
        message: 'No Lcghymnal with that identifier has been found'
      });
    }
    req.lcghymnal = lcghymnal;
    next();
  });
};
