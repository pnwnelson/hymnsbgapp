'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Cogwahymnals Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/cogwahymnals',
      permissions: '*'
    }, {
      resources: '/api/cogwahymnals/:cogwahymnalId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/cogwahymnals',
      permissions: ['get', 'post']
    }, {
      resources: '/api/cogwahymnals/:cogwahymnalId',
      permissions: ['get','post','put']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/cogwahymnals',
      permissions: ['get']
    }, {
      resources: '/api/cogwahymnals/:cogwahymnalId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Cogwahymnals Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Cogwahymnal is being processed and the current user created it then allow any manipulation
  if (req.cogwahymnal && req.user && req.cogwahymnal.user && req.cogwahymnal.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
