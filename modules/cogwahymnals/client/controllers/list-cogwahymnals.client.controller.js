(function () {
  'use strict';

  angular
    .module('cogwahymnals')
    .controller('CogwahymnalsListController', CogwahymnalsListController);

  CogwahymnalsListController.$inject = ['CogwahymnalsService'];

  function CogwahymnalsListController(CogwahymnalsService) {
    var vm = this;

    vm.cogwahymnals = CogwahymnalsService.query();
  }
}());
