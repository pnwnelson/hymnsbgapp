(function () {
  'use strict';

  // Cogwahymnals controller
  angular
    .module('cogwahymnals')
    .controller('CogwahymnalsController', CogwahymnalsController);

  CogwahymnalsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'cogwahymnalResolve'];

  function CogwahymnalsController ($scope, $state, $window, Authentication, cogwahymnal) {
    var vm = this;

    vm.authentication = Authentication;
    vm.cogwahymnal = cogwahymnal;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Cogwahymnal
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.cogwahymnal.$remove($state.go('cogwahymnals.list'));
      }
    }

    // Save Cogwahymnal
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.cogwahymnalForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.cogwahymnal.page) {
        vm.cogwahymnal.$update(successCallback, errorCallback);
      } else {
        vm.cogwahymnal.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('cogwahymnals.view', {
          cogwahymnalId: res.page
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
