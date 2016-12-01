(function () {
  'use strict';

  describe('Wcg1993hymnals Controller Tests', function () {
    // Initialize global variables
    var Wcg1993hymnalsController,
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

      // create mock Wcg1993hymnal
      mockWcg1993hymnal = new Wcg1993hymnalsService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Wcg1993hymnal Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Wcg1993hymnals controller.
      Wcg1993hymnalsController = $controller('Wcg1993hymnalsController as vm', {
        $scope: $scope,
        wcg1993hymnalResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleWcg1993hymnalPostData;

      beforeEach(function () {
        // Create a sample Wcg1993hymnal object
        sampleWcg1993hymnalPostData = new Wcg1993hymnalsService({
          name: 'Wcg1993hymnal Name'
        });

        $scope.vm.wcg1993hymnal = sampleWcg1993hymnalPostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (Wcg1993hymnalsService) {
        // Set POST response
        $httpBackend.expectPOST('api/wcg1993hymnals', sampleWcg1993hymnalPostData).respond(mockWcg1993hymnal);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Wcg1993hymnal was created
        expect($state.go).toHaveBeenCalledWith('wcg1993hymnals.view', {
          wcg1993hymnalId: mockWcg1993hymnal._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/wcg1993hymnals', sampleWcg1993hymnalPostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Wcg1993hymnal in $scope
        $scope.vm.wcg1993hymnal = mockWcg1993hymnal;
      });

      it('should update a valid Wcg1993hymnal', inject(function (Wcg1993hymnalsService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/wcg1993hymnals\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('wcg1993hymnals.view', {
          wcg1993hymnalId: mockWcg1993hymnal._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (Wcg1993hymnalsService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/wcg1993hymnals\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Wcg1993hymnals
        $scope.vm.wcg1993hymnal = mockWcg1993hymnal;
      });

      it('should delete the Wcg1993hymnal and redirect to Wcg1993hymnals', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/wcg1993hymnals\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('wcg1993hymnals.list');
      });

      it('should should not delete the Wcg1993hymnal and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());
