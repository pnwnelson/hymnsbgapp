(function () {
  'use strict';

  angular
    .module('wcg1993hymnals')
    .controller('Wcg1993hymnalsListController', Wcg1993hymnalsListController);

  Wcg1993hymnalsListController.$inject = ['Wcg1993hymnalsService'];

  function Wcg1993hymnalsListController(Wcg1993hymnalsService) {
    var vm = this;

    vm.wcg1993hymnals = Wcg1993hymnalsService.query();
  }
}());
