(function () {
  'use strict';

  // Hymnals controller
  angular
    .module('hymnals')
    .controller('HymnalsController', HymnalsController);

  HymnalsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'hymnalResolve'];

  function HymnalsController ($scope, $state, $window, Authentication, hymnal) {
    var vm = this;

    vm.authentication = Authentication;
    vm.hymnal = hymnal;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Hymnal
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.hymnal.$remove($state.go('hymnals.list'));
      }
    }

    // Save Hymnal
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.hymnalForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.hymnal.page) {
        vm.hymnal.$update(successCallback, errorCallback);
      } else if (vm.hymnal._id) {
        vm.hymnal.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('hymnals.view', {
          hymnalId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
