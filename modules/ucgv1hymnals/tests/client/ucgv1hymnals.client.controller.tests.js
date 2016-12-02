(function () {
  'use strict';

  describe('Ucgv1hymnals Controller Tests', function () {
    // Initialize global variables
    var Ucgv1hymnalsController,
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

      // create mock Ucgv1hymnal
      mockUcgv1hymnal = new Ucgv1hymnalsService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Ucgv1hymnal Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Ucgv1hymnals controller.
      Ucgv1hymnalsController = $controller('Ucgv1hymnalsController as vm', {
        $scope: $scope,
        ucgv1hymnalResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleUcgv1hymnalPostData;

      beforeEach(function () {
        // Create a sample Ucgv1hymnal object
        sampleUcgv1hymnalPostData = new Ucgv1hymnalsService({
          name: 'Ucgv1hymnal Name'
        });

        $scope.vm.ucgv1hymnal = sampleUcgv1hymnalPostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (Ucgv1hymnalsService) {
        // Set POST response
        $httpBackend.expectPOST('api/ucgv1hymnals', sampleUcgv1hymnalPostData).respond(mockUcgv1hymnal);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Ucgv1hymnal was created
        expect($state.go).toHaveBeenCalledWith('ucgv1hymnals.view', {
          ucgv1hymnalId: mockUcgv1hymnal._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/ucgv1hymnals', sampleUcgv1hymnalPostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Ucgv1hymnal in $scope
        $scope.vm.ucgv1hymnal = mockUcgv1hymnal;
      });

      it('should update a valid Ucgv1hymnal', inject(function (Ucgv1hymnalsService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/ucgv1hymnals\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('ucgv1hymnals.view', {
          ucgv1hymnalId: mockUcgv1hymnal._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (Ucgv1hymnalsService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/ucgv1hymnals\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Ucgv1hymnals
        $scope.vm.ucgv1hymnal = mockUcgv1hymnal;
      });

      it('should delete the Ucgv1hymnal and redirect to Ucgv1hymnals', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/ucgv1hymnals\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('ucgv1hymnals.list');
      });

      it('should should not delete the Ucgv1hymnal and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());
