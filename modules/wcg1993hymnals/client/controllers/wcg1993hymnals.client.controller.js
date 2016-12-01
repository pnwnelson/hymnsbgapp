(function () {
  'use strict';

  // Wcg1993hymnals controller
  angular
    .module('wcg1993hymnals')
    .controller('Wcg1993hymnalsController', Wcg1993hymnalsController);

  Wcg1993hymnalsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'wcg1993hymnalResolve'];

  function Wcg1993hymnalsController ($scope, $state, $window, Authentication, wcg1993hymnal) {
    var vm = this;

    vm.authentication = Authentication;
    vm.wcg1993hymnal = wcg1993hymnal;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Wcg1993hymnal
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.wcg1993hymnal.$remove($state.go('wcg1993hymnals.list'));
      }
    }

    // Save Wcg1993hymnal
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.wcg1993hymnalForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.wcg1993hymnal._id) {
        vm.wcg1993hymnal.$update(successCallback, errorCallback);
      } else {
        vm.wcg1993hymnal.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('wcg1993hymnals.view', {
          wcg1993hymnalId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
