(function () {
  'use strict';

  describe('Ucgv2hymnals Controller Tests', function () {
    // Initialize global variables
    var Ucgv2hymnalsController,
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

      // create mock Ucgv2hymnal
      mockUcgv2hymnal = new Ucgv2hymnalsService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Ucgv2hymnal Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Ucgv2hymnals controller.
      Ucgv2hymnalsController = $controller('Ucgv2hymnalsController as vm', {
        $scope: $scope,
        ucgv2hymnalResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleUcgv2hymnalPostData;

      beforeEach(function () {
        // Create a sample Ucgv2hymnal object
        sampleUcgv2hymnalPostData = new Ucgv2hymnalsService({
          name: 'Ucgv2hymnal Name'
        });

        $scope.vm.ucgv2hymnal = sampleUcgv2hymnalPostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (Ucgv2hymnalsService) {
        // Set POST response
        $httpBackend.expectPOST('api/ucgv2hymnals', sampleUcgv2hymnalPostData).respond(mockUcgv2hymnal);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Ucgv2hymnal was created
        expect($state.go).toHaveBeenCalledWith('ucgv2hymnals.view', {
          ucgv2hymnalId: mockUcgv2hymnal._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/ucgv2hymnals', sampleUcgv2hymnalPostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Ucgv2hymnal in $scope
        $scope.vm.ucgv2hymnal = mockUcgv2hymnal;
      });

      it('should update a valid Ucgv2hymnal', inject(function (Ucgv2hymnalsService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/ucgv2hymnals\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('ucgv2hymnals.view', {
          ucgv2hymnalId: mockUcgv2hymnal._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (Ucgv2hymnalsService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/ucgv2hymnals\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Ucgv2hymnals
        $scope.vm.ucgv2hymnal = mockUcgv2hymnal;
      });

      it('should delete the Ucgv2hymnal and redirect to Ucgv2hymnals', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/ucgv2hymnals\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('ucgv2hymnals.list');
      });

      it('should should not delete the Ucgv2hymnal and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());
