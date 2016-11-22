(function () {
  'use strict';

  angular
    .module('purplehymnals')
    .controller('PurplehymnalsSearchController', PurplehymnalsSearchController);

  PurplehymnalsSearchController.$inject = ['PurplehymnalsService'];

  function PurplehymnalsSearchController(PurplehymnalsService) {
    var vm = this;


    vm.searchPage = function() {
      console.log(vm.searchText, 'You are searching for this page');

      vm.purplehymnals = PurplehymnalsService.query(vm.searchText).then(function(response) { 
        console.log(response);
      });
    };

  }
}());