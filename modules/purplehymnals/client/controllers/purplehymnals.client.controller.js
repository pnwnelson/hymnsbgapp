(function () {
  'use strict';

  // Purplehymnals controller
  angular
    .module('purplehymnals')
    .controller('PurplehymnalsController', PurplehymnalsController);

  PurplehymnalsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'purplehymnalResolve'];

  function PurplehymnalsController ($scope, $state, $window, Authentication, purplehymnal) {
    var vm = this;

    vm.authentication = Authentication;
    vm.purplehymnal = purplehymnal;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Purplehymnal
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.purplehymnal.$remove($state.go('purplehymnals.list'));
      }
    }

    // Save Purplehymnal
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.purplehymnalForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.purplehymnal._id) {
        vm.purplehymnal.$update(successCallback, errorCallback);
      } else {
        vm.purplehymnal.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('purplehymnals.view', {
          purplehymnalId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
