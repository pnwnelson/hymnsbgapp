(function () {
  'use strict';

  // Lcghymnals controller
  angular
    .module('lcghymnals')
    .controller('LcghymnalsController', LcghymnalsController);

  LcghymnalsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'lcghymnalResolve'];

  function LcghymnalsController ($scope, $state, $window, Authentication, lcghymnal) {
    var vm = this;

    vm.authentication = Authentication;
    vm.lcghymnal = lcghymnal;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Lcghymnal
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.lcghymnal.$remove($state.go('lcghymnals.list'));
      }
    }

    // Save Lcghymnal
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.lcghymnalForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.lcghymnal._id) {
        vm.lcghymnal.$update(successCallback, errorCallback);
      } else {
        vm.lcghymnal.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('lcghymnals.view', {
          lcghymnalId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
