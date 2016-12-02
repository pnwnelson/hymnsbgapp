(function () {
  'use strict';

  angular
    .module('ucgv2hymnals')
    .controller('Ucgv2hymnalsListController', Ucgv2hymnalsListController);

  Ucgv2hymnalsListController.$inject = ['Ucgv2hymnalsService'];

  function Ucgv2hymnalsListController(Ucgv2hymnalsService) {
    var vm = this;

    vm.ucgv2hymnals = Ucgv2hymnalsService.query();
  }
}());
