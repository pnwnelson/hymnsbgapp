(function () {
  'use strict';

  describe('Ucgv1hymnals List Controller Tests', function () {
    // Initialize global variables
    var Ucgv1hymnalsListController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      Ucgv1hymnalsService,
      mockUcgv1hymnal;

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
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _Ucgv1hymnalsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      Ucgv1hymnalsService = _Ucgv1hymnalsService_;

      // create mock article
      mockUcgv1hymnal = new Ucgv1hymnalsService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Ucgv1hymnal Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Ucgv1hymnals List controller.
      Ucgv1hymnalsListController = $controller('Ucgv1hymnalsListController as vm', {
        $scope: $scope
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('Instantiate', function () {
      var mockUcgv1hymnalList;

      beforeEach(function () {
        mockUcgv1hymnalList = [mockUcgv1hymnal, mockUcgv1hymnal];
      });

      it('should send a GET request and return all Ucgv1hymnals', inject(function (Ucgv1hymnalsService) {
        // Set POST response
        $httpBackend.expectGET('api/ucgv1hymnals').respond(mockUcgv1hymnalList);


        $httpBackend.flush();

        // Test form inputs are reset
        expect($scope.vm.ucgv1hymnals.length).toEqual(2);
        expect($scope.vm.ucgv1hymnals[0]).toEqual(mockUcgv1hymnal);
        expect($scope.vm.ucgv1hymnals[1]).toEqual(mockUcgv1hymnal);

      }));
    });
  });
}());
