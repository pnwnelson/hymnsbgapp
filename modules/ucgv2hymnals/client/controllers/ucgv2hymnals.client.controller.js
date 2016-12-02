(function () {
  'use strict';

  // Ucgv2hymnals controller
  angular
    .module('ucgv2hymnals')
    .controller('Ucgv2hymnalsController', Ucgv2hymnalsController);

  Ucgv2hymnalsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'ucgv2hymnalResolve'];

  function Ucgv2hymnalsController ($scope, $state, $window, Authentication, ucgv2hymnal) {
    var vm = this;

    vm.authentication = Authentication;
    vm.ucgv2hymnal = ucgv2hymnal;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Ucgv2hymnal
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.ucgv2hymnal.$remove($state.go('ucgv2hymnals.list'));
      }
    }

    // Save Ucgv2hymnal
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.ucgv2hymnalForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.ucgv2hymnal._id) {
        vm.ucgv2hymnal.$update(successCallback, errorCallback);
      } else {
        vm.ucgv2hymnal.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('ucgv2hymnals.view', {
          ucgv2hymnalId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
