(function () {
  'use strict';

  angular
    .module('lcghymnals')
    .controller('LcghymnalsListController', LcghymnalsListController);

  LcghymnalsListController.$inject = ['LcghymnalsService'];

  function LcghymnalsListController(LcghymnalsService) {
    var vm = this;

    vm.lcghymnals = LcghymnalsService.query();
  }
}());
