(function () {
  'use strict';

  describe('Purplehymnals Route Tests', function () {
    // Initialize global variables
    var $scope,
      PurplehymnalsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _PurplehymnalsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      PurplehymnalsService = _PurplehymnalsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('purplehymnals');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/purplehymnals');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          PurplehymnalsController,
          mockPurplehymnal;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('purplehymnals.view');
          $templateCache.put('modules/purplehymnals/client/views/view-purplehymnal.client.view.html', '');

          // create mock Purplehymnal
          mockPurplehymnal = new PurplehymnalsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Purplehymnal Name'
          });

          // Initialize Controller
          PurplehymnalsController = $controller('PurplehymnalsController as vm', {
            $scope: $scope,
            purplehymnalResolve: mockPurplehymnal
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:purplehymnalId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.purplehymnalResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            purplehymnalId: 1
          })).toEqual('/purplehymnals/1');
        }));

        it('should attach an Purplehymnal to the controller scope', function () {
          expect($scope.vm.purplehymnal._id).toBe(mockPurplehymnal._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/purplehymnals/client/views/view-purplehymnal.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          PurplehymnalsController,
          mockPurplehymnal;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('purplehymnals.create');
          $templateCache.put('modules/purplehymnals/client/views/form-purplehymnal.client.view.html', '');

          // create mock Purplehymnal
          mockPurplehymnal = new PurplehymnalsService();

          // Initialize Controller
          PurplehymnalsController = $controller('PurplehymnalsController as vm', {
            $scope: $scope,
            purplehymnalResolve: mockPurplehymnal
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.purplehymnalResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/purplehymnals/create');
        }));

        it('should attach an Purplehymnal to the controller scope', function () {
          expect($scope.vm.purplehymnal._id).toBe(mockPurplehymnal._id);
          expect($scope.vm.purplehymnal._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/purplehymnals/client/views/form-purplehymnal.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          PurplehymnalsController,
          mockPurplehymnal;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('purplehymnals.edit');
          $templateCache.put('modules/purplehymnals/client/views/form-purplehymnal.client.view.html', '');

          // create mock Purplehymnal
          mockPurplehymnal = new PurplehymnalsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Purplehymnal Name'
          });

          // Initialize Controller
          PurplehymnalsController = $controller('PurplehymnalsController as vm', {
            $scope: $scope,
            purplehymnalResolve: mockPurplehymnal
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:purplehymnalId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.purplehymnalResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            purplehymnalId: 1
          })).toEqual('/purplehymnals/1/edit');
        }));

        it('should attach an Purplehymnal to the controller scope', function () {
          expect($scope.vm.purplehymnal._id).toBe(mockPurplehymnal._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/purplehymnals/client/views/form-purplehymnal.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
