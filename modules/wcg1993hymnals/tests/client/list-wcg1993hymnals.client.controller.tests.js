(function () {
  'use strict';

  describe('Wcg1993hymnals List Controller Tests', function () {
    // Initialize global variables
    var Wcg1993hymnalsListController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      Wcg1993hymnalsService,
      mockWcg1993hymnal;

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
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _Wcg1993hymnalsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      Wcg1993hymnalsService = _Wcg1993hymnalsService_;

      // create mock article
      mockWcg1993hymnal = new Wcg1993hymnalsService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Wcg1993hymnal Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Wcg1993hymnals List controller.
      Wcg1993hymnalsListController = $controller('Wcg1993hymnalsListController as vm', {
        $scope: $scope
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('Instantiate', function () {
      var mockWcg1993hymnalList;

      beforeEach(function () {
        mockWcg1993hymnalList = [mockWcg1993hymnal, mockWcg1993hymnal];
      });

      it('should send a GET request and return all Wcg1993hymnals', inject(function (Wcg1993hymnalsService) {
        // Set POST response
        $httpBackend.expectGET('api/wcg1993hymnals').respond(mockWcg1993hymnalList);


        $httpBackend.flush();

        // Test form inputs are reset
        expect($scope.vm.wcg1993hymnals.length).toEqual(2);
        expect($scope.vm.wcg1993hymnals[0]).toEqual(mockWcg1993hymnal);
        expect($scope.vm.wcg1993hymnals[1]).toEqual(mockWcg1993hymnal);

      }));
    });
  });
}());
