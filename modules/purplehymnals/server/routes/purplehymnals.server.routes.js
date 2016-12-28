'use strict';

/**
 * Module dependencies
 */
var purplehymnalsPolicy = require('../policies/purplehymnals.server.policy'),
  purplehymnals = require('../controllers/purplehymnals.server.controller');

module.exports = function(app) {
  // Purplehymnals Routes
  app.route('/api/purplehymnals').all(purplehymnalsPolicy.isAllowed)
    .get(purplehymnals.list)
    .post(purplehymnals.create);

  app.route('/api/purplehymnals/:purplehymnalId').all(purplehymnalsPolicy.isAllowed)
    .get(purplehymnals.read)
    //.get(purplehymnals.search) //added by me
    .put(purplehymnals.update)
    .delete(purplehymnals.delete);

  // Finish by binding the Purplehymnal middleware..
  app.param('purplehymnalId', purplehymnals.purplehymnalByID);
};
