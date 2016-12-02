'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Ucgv1hymnal = mongoose.model('Ucgv1hymnal'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Ucgv1hymnal
 */
exports.create = function(req, res) {
  var ucgv1hymnal = new Ucgv1hymnal(req.body);
  ucgv1hymnal.user = req.user;

  ucgv1hymnal.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(ucgv1hymnal);
    }
  });
};

/**
 * Show the current Ucgv1hymnal
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var ucgv1hymnal = req.ucgv1hymnal ? req.ucgv1hymnal.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  ucgv1hymnal.isCurrentUserOwner = req.user && ucgv1hymnal.user && ucgv1hymnal.user._id.toString() === req.user._id.toString();

  res.jsonp(ucgv1hymnal);
};

/**
 * Update a Ucgv1hymnal
 */
exports.update = function(req, res) {
  var ucgv1hymnal = req.ucgv1hymnal;

  ucgv1hymnal = _.extend(ucgv1hymnal, req.body);

  ucgv1hymnal.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(ucgv1hymnal);
    }
  });
};

/**
 * Delete an Ucgv1hymnal
 */
exports.delete = function(req, res) {
  var ucgv1hymnal = req.ucgv1hymnal;

  ucgv1hymnal.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(ucgv1hymnal);
    }
  });
};

/**
 * List of Ucgv1hymnals
 */
exports.list = function(req, res) {
  Ucgv1hymnal.find().sort('-created').populate('user', 'displayName').exec(function(err, ucgv1hymnals) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(ucgv1hymnals);
    }
  });
};

/**
 * Ucgv1hymnal middleware
 */
exports.ucgv1hymnalByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Ucgv1hymnal is invalid'
    });
  }

  Ucgv1hymnal.findById(id).populate('user', 'displayName').exec(function (err, ucgv1hymnal) {
    if (err) {
      return next(err);
    } else if (!ucgv1hymnal) {
      return res.status(404).send({
        message: 'No Ucgv1hymnal with that identifier has been found'
      });
    }
    req.ucgv1hymnal = ucgv1hymnal;
    next();
  });
};
