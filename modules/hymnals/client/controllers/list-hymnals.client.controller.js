(function () {
  'use strict';

  angular
    .module('hymnals')
    .controller('HymnalsListController', HymnalsListController);

  HymnalsListController.$inject = ['HymnalsService'];

  function HymnalsListController(HymnalsService) {
    var vm = this;

    vm.hymnals = HymnalsService.query();
  }
}());
