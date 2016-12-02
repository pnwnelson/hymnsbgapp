(function () {
  'use strict';

  angular
    .module('ucgv1hymnals')
    .controller('Ucgv1hymnalsListController', Ucgv1hymnalsListController);

  Ucgv1hymnalsListController.$inject = ['Ucgv1hymnalsService'];

  function Ucgv1hymnalsListController(Ucgv1hymnalsService) {
    var vm = this;

    vm.ucgv1hymnals = Ucgv1hymnalsService.query();
  }
}());
