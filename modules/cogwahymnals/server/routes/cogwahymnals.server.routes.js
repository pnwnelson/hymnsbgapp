'use strict';

/**
 * Module dependencies
 */
var cogwahymnalsPolicy = require('../policies/cogwahymnals.server.policy'),
  cogwahymnals = require('../controllers/cogwahymnals.server.controller');

module.exports = function(app) {
  // Cogwahymnals Routes
  app.route('/api/cogwahymnals').all(cogwahymnalsPolicy.isAllowed)
    .get(cogwahymnals.list)
    .post(cogwahymnals.create);

  app.route('/api/cogwahymnals/:cogwahymnalId').all(cogwahymnalsPolicy.isAllowed)
    .get(cogwahymnals.read)
    .put(cogwahymnals.update)
    .delete(cogwahymnals.delete);

  // Finish by binding the Cogwahymnal middleware
  app.param('cogwahymnalId', cogwahymnals.cogwahymnalByID);
};
