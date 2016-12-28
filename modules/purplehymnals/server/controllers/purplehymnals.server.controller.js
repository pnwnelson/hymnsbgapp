'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Purplehymnal = mongoose.model('Purplehymnal'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Purplehymnal
 */
exports.create = function(req, res) {
  var purplehymnal = new Purplehymnal(req.body);
  purplehymnal.user = req.user;

  purplehymnal.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(purplehymnal);
    }
  });
};

/**
 * Show the current Purplehymnal
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var purplehymnal = req.purplehymnal ? req.purplehymnal.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  purplehymnal.isCurrentUserOwner = req.user && purplehymnal.user && purplehymnal.user._id.toString() === req.user._id.toString();

  res.jsonp(purplehymnal);
};

/**
 * Update a Purplehymnal
 */
exports.update = function(req, res) {
  var purplehymnal = req.purplehymnal;

  purplehymnal = _.extend(purplehymnal, req.body);

  purplehymnal.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(purplehymnal);
    }
  });
};

/**
 * Delete an Purplehymnal
 */
exports.delete = function(req, res) {
  var purplehymnal = req.purplehymnal;

  purplehymnal.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(purplehymnal);
    }
  });
};

/**
 * List of Purplehymnals
 */
exports.list = function(req, res) {
  Purplehymnal.find().sort('+page').populate('user', 'displayName').exec(function(err, purplehymnals) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(purplehymnals);
    }
  });
};


/**
 * Purplehymnal middleware
 */
exports.purplehymnalByID = function(req, res, next, id) {

  Purplehymnal.findOne({$or: [{page: id}, {id}]}).populate('user', 'displayName').exec(function (err, purplehymnal) {
    if (err) {
      return next(err);
    } else if (!purplehymnal) {
      return res.status(404).send({
        message: 'No Purplehymnal with that identifier has been found'
      });
    }
    req.purplehymnal = purplehymnal;
    next();
  });
};

