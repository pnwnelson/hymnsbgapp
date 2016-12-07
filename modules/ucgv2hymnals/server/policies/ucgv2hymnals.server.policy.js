'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Ucgv2hymnals Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/ucgv2hymnals',
      permissions: '*'
    }, {
      resources: '/api/ucgv2hymnals/:ucgv2hymnalId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/ucgv2hymnals',
      permissions: ['get', 'post']
    }, {
      resources: '/api/ucgv2hymnals/:ucgv2hymnalId',
      permissions: ['get','post','put']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/ucgv2hymnals',
      permissions: ['get']
    }, {
      resources: '/api/ucgv2hymnals/:ucgv2hymnalId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Ucgv2hymnals Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Ucgv2hymnal is being processed and the current user created it then allow any manipulation
  //if (req.ucgv2hymnal && req.user && req.ucgv2hymnal.user && req.ucgv2hymnal.user.id === req.user.id) {
  //  return next();
  //}

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
