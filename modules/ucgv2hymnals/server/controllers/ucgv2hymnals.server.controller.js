'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Ucgv2hymnal = mongoose.model('Ucgv2hymnal'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Ucgv2hymnal
 */
exports.create = function(req, res) {
  var ucgv2hymnal = new Ucgv2hymnal(req.body);
  ucgv2hymnal.user = req.user;

  ucgv2hymnal.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(ucgv2hymnal);
    }
  });
};

/**
 * Show the current Ucgv2hymnal
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var ucgv2hymnal = req.ucgv2hymnal ? req.ucgv2hymnal.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  ucgv2hymnal.isCurrentUserOwner = req.user && ucgv2hymnal.user && ucgv2hymnal.user._id.toString() === req.user._id.toString();

  res.jsonp(ucgv2hymnal);
};

/**
 * Update a Ucgv2hymnal
 */
exports.update = function(req, res) {
  var ucgv2hymnal = req.ucgv2hymnal;

  ucgv2hymnal = _.extend(ucgv2hymnal, req.body);

  ucgv2hymnal.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(ucgv2hymnal);
    }
  });
};

/**
 * Delete an Ucgv2hymnal
 */
exports.delete = function(req, res) {
  var ucgv2hymnal = req.ucgv2hymnal;

  ucgv2hymnal.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(ucgv2hymnal);
    }
  });
};

/**
 * List of Ucgv2hymnals
 */
exports.list = function(req, res) {
  Ucgv2hymnal.find().sort('-created').populate('user', 'displayName').exec(function(err, ucgv2hymnals) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(ucgv2hymnals);
    }
  });
};

/**
 * Ucgv2hymnal middleware
 */
exports.ucgv2hymnalByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Ucgv2hymnal is invalid'
    });
  }

  Ucgv2hymnal.findById(id).populate('user', 'displayName').exec(function (err, ucgv2hymnal) {
    if (err) {
      return next(err);
    } else if (!ucgv2hymnal) {
      return res.status(404).send({
        message: 'No Ucgv2hymnal with that identifier has been found'
      });
    }
    req.ucgv2hymnal = ucgv2hymnal;
    next();
  });
};
