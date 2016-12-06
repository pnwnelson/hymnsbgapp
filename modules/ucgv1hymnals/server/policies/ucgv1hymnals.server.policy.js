'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Ucgv1hymnals Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/ucgv1hymnals',
      permissions: '*'
    }, {
      resources: '/api/ucgv1hymnals/:ucgv1hymnalId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/ucgv1hymnals',
      permissions: ['get', 'post']
    }, {
      resources: '/api/ucgv1hymnals/:ucgv1hymnalId',
      permissions: ['get','post','put']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/ucgv1hymnals',
      permissions: ['get']
    }, {
      resources: '/api/ucgv1hymnals/:ucgv1hymnalId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Ucgv1hymnals Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Ucgv1hymnal is being processed and the current user created it then allow any manipulation
  if (req.ucgv1hymnal && req.user && req.ucgv1hymnal.user && req.ucgv1hymnal.user.id === req.user.id) {
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
