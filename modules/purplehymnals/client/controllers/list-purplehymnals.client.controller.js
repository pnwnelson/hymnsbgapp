(function () {
  'use strict';

  angular
    .module('purplehymnals')
    .controller('PurplehymnalsListController', PurplehymnalsListController);

  PurplehymnalsListController.$inject = ['PurplehymnalsService'];

  function PurplehymnalsListController(PurplehymnalsService) {
    var vm = this;

    //vm.purplehymnals = PurplehymnalsService.query();
    vm.purplehymnals = PurplehymnalsService.query();
  }
}());
