(function () {
  'use strict';

  angular
    .module('wcg1993hymnals')
    .controller('Wcg1993hymnalsListController', Wcg1993hymnalsListController);

  Wcg1993hymnalsListController.$inject = ['Wcg1993hymnalsService', '$state'];

  function Wcg1993hymnalsListController(Wcg1993hymnalsService, $state) {
    var vm = this;

    vm.wcg1993hymnals = Wcg1993hymnalsService.query();

    vm.search = function() {
      $state.go("wcg1993hymnals.view", {wcg1993hymnalId: vm.searchTerm});
    };
  }
}());
