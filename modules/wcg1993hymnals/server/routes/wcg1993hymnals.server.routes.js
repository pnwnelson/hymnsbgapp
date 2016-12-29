'use strict';

/**
 * Module dependencies
 */
var wcg1993hymnalsPolicy = require('../policies/wcg1993hymnals.server.policy'),
  wcg1993hymnals = require('../controllers/wcg1993hymnals.server.controller');

module.exports = function(app) {
  // Wcg1993hymnals Routes
  app.route('/api/wcg1993hymnals').all(wcg1993hymnalsPolicy.isAllowed)
    .get(wcg1993hymnals.list)
    .post(wcg1993hymnals.create);

  app.route('/api/wcg1993hymnals/:wcg1993hymnalId').all(wcg1993hymnalsPolicy.isAllowed)
    .get(wcg1993hymnals.read)
    .put(wcg1993hymnals.update)
    .delete(wcg1993hymnals.delete);

  // Finish by binding the Wcg1993hymnal middleware
  app.param('wcg1993hymnalId', wcg1993hymnals.wcg1993hymnalByID);
};
