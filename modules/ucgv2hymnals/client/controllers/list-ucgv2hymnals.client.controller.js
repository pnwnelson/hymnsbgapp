(function () {
  'use strict';

  angular
    .module('ucgv2hymnals')
    .controller('Ucgv2hymnalsListController', Ucgv2hymnalsListController);

  Ucgv2hymnalsListController.$inject = ['Ucgv2hymnalsService','$state'];

  function Ucgv2hymnalsListController(Ucgv2hymnalsService, $state) {
    var vm = this;

    vm.ucgv2hymnals = Ucgv2hymnalsService.query();

    vm.search = function() {
      $state.go('ucgv2hymnals.view', { ucgv2hymnalId: vm.searchTerm });
    };
  }
}());

  // function search(Ucgv2hymnalsService, req, res, next) {
  //   var searchTerm = {};

  //   Ucgv2hymnalsService.findOne({page: searchTerm}).exec(function (err, ucgv2hymnals) {
  //     if (err) {
  //       console.log('this is not working');
  //     }
  //     req.jsonp(ucgv2hymnals);
  //   });
