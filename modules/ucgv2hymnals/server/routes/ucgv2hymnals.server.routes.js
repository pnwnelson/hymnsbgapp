'use strict';

/**
 * Module dependencies
 */
var ucgv2hymnalsPolicy = require('../policies/ucgv2hymnals.server.policy'),
  ucgv2hymnals = require('../controllers/ucgv2hymnals.server.controller');

module.exports = function(app) {
  // Ucgv2hymnals Routes
  app.route('/api/ucgv2hymnals').all(ucgv2hymnalsPolicy.isAllowed)
    .get(ucgv2hymnals.list)
    .post(ucgv2hymnals.create);

  app.route('/api/ucgv2hymnals/:ucgv2hymnalId').all(ucgv2hymnalsPolicy.isAllowed)
    .get(ucgv2hymnals.read)
    .put(ucgv2hymnals.update)
    .delete(ucgv2hymnals.delete);

  // Finish by binding the Ucgv2hymnal middleware
  app.param('ucgv2hymnalId', ucgv2hymnals.ucgv2hymnalByID);
};
