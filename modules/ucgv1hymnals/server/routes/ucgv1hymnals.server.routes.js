'use strict';

/**
 * Module dependencies
 */
var ucgv1hymnalsPolicy = require('../policies/ucgv1hymnals.server.policy'),
  ucgv1hymnals = require('../controllers/ucgv1hymnals.server.controller');

module.exports = function(app) {
  // Ucgv1hymnals Routes
  app.route('/api/ucgv1hymnals').all(ucgv1hymnalsPolicy.isAllowed)
    .get(ucgv1hymnals.list)
    .post(ucgv1hymnals.create);

  app.route('/api/ucgv1hymnals/:ucgv1hymnalId').all(ucgv1hymnalsPolicy.isAllowed)
    .get(ucgv1hymnals.read)
    .put(ucgv1hymnals.update)
    .delete(ucgv1hymnals.delete);

  // Finish by binding the Ucgv1hymnal middleware
  app.param('ucgv1hymnalId', ucgv1hymnals.ucgv1hymnalByID);
};
