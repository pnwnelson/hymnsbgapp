(function () {
  'use strict';

  describe('Ucgv2hymnals List Controller Tests', function () {
    // Initialize global variables
    var Ucgv2hymnalsListController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      Ucgv2hymnalsService,
      mockUcgv2hymnal;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _Ucgv2hymnalsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      Ucgv2hymnalsService = _Ucgv2hymnalsService_;

      // create mock article
      mockUcgv2hymnal = new Ucgv2hymnalsService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Ucgv2hymnal Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Ucgv2hymnals List controller.
      Ucgv2hymnalsListController = $controller('Ucgv2hymnalsListController as vm', {
        $scope: $scope
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('Instantiate', function () {
      var mockUcgv2hymnalList;

      beforeEach(function () {
        mockUcgv2hymnalList = [mockUcgv2hymnal, mockUcgv2hymnal];
      });

      it('should send a GET request and return all Ucgv2hymnals', inject(function (Ucgv2hymnalsService) {
        // Set POST response
        $httpBackend.expectGET('api/ucgv2hymnals').respond(mockUcgv2hymnalList);


        $httpBackend.flush();

        // Test form inputs are reset
        expect($scope.vm.ucgv2hymnals.length).toEqual(2);
        expect($scope.vm.ucgv2hymnals[0]).toEqual(mockUcgv2hymnal);
        expect($scope.vm.ucgv2hymnals[1]).toEqual(mockUcgv2hymnal);

      }));
    });
  });
}());
