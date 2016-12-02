'use strict';

/**
 * Module dependencies
 */
var lcghymnalsPolicy = require('../policies/lcghymnals.server.policy'),
  lcghymnals = require('../controllers/lcghymnals.server.controller');

module.exports = function(app) {
  // Lcghymnals Routes
  app.route('/api/lcghymnals').all(lcghymnalsPolicy.isAllowed)
    .get(lcghymnals.list)
    .post(lcghymnals.create);

  app.route('/api/lcghymnals/:lcghymnalId').all(lcghymnalsPolicy.isAllowed)
    .get(lcghymnals.read)
    .put(lcghymnals.update)
    .delete(lcghymnals.delete);

  // Finish by binding the Lcghymnal middleware
  app.param('lcghymnalId', lcghymnals.lcghymnalByID);
};
