'use strict';

/**
 * Module dependencies
 */
var hymnalsPolicy = require('../policies/hymnals.server.policy'),
  hymnals = require('../controllers/hymnals.server.controller');

module.exports = function(app) {
  // Hymnals Routes
  app.route('/api/hymnals').all(hymnalsPolicy.isAllowed)
    .get(hymnals.list)
    .post(hymnals.create);

  app.route('/api/hymnals/:hymnalId').all(hymnalsPolicy.isAllowed)
    .get(hymnals.read)
    .put(hymnals.update)
    .delete(hymnals.delete);

  // Finish by binding the Hymnal middleware
  app.param('hymnalId', hymnals.hymnalByID);
};
