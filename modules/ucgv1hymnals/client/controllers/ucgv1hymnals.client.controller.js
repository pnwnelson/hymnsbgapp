(function () {
  'use strict';

  // Ucgv1hymnals controller
  angular
    .module('ucgv1hymnals')
    .controller('Ucgv1hymnalsController', Ucgv1hymnalsController);

  Ucgv1hymnalsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'ucgv1hymnalResolve'];

  function Ucgv1hymnalsController ($scope, $state, $window, Authentication, ucgv1hymnal) {
    var vm = this;

    vm.authentication = Authentication;
    vm.ucgv1hymnal = ucgv1hymnal;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Ucgv1hymnal
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.ucgv1hymnal.$remove($state.go('ucgv1hymnals.list'));
      }
    }

    // Save Ucgv1hymnal
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.ucgv1hymnalForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.ucgv1hymnal.page) {
        vm.ucgv1hymnal.$update(successCallback, errorCallback);
      } else {
        vm.ucgv1hymnal.$save(successCallback, errorCallback);
      }


      function successCallback(res) {
        $state.go('ucgv1hymnals.view', {
          ucgv1hymnalId: res.page
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
