'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Wcg1993hymnals Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/wcg1993hymnals',
      permissions: '*'
    }, {
      resources: '/api/wcg1993hymnals/:wcg1993hymnalId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/wcg1993hymnals',
      permissions: ['get', 'post']
    }, {
      resources: '/api/wcg1993hymnals/:wcg1993hymnalId',
      permissions: ['get','post','put']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/wcg1993hymnals',
      permissions: ['get']
    }, {
      resources: '/api/wcg1993hymnals/:wcg1993hymnalId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Wcg1993hymnals Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Wcg1993hymnal is being processed and the current user created it then allow any manipulation
  //if (req.wcg1993hymnal && req.user && req.wcg1993hymnal.user && req.wcg1993hymnal.user.id === req.user.id) {
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
