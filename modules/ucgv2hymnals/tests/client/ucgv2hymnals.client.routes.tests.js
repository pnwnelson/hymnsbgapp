(function () {
  'use strict';

  describe('Ucgv2hymnals Route Tests', function () {
    // Initialize global variables
    var $scope,
      Ucgv2hymnalsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _Ucgv2hymnalsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      Ucgv2hymnalsService = _Ucgv2hymnalsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('ucgv2hymnals');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/ucgv2hymnals');
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
          Ucgv2hymnalsController,
          mockUcgv2hymnal;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('ucgv2hymnals.view');
          $templateCache.put('modules/ucgv2hymnals/client/views/view-ucgv2hymnal.client.view.html', '');

          // create mock Ucgv2hymnal
          mockUcgv2hymnal = new Ucgv2hymnalsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Ucgv2hymnal Name'
          });

          // Initialize Controller
          Ucgv2hymnalsController = $controller('Ucgv2hymnalsController as vm', {
            $scope: $scope,
            ucgv2hymnalResolve: mockUcgv2hymnal
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:ucgv2hymnalId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.ucgv2hymnalResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            ucgv2hymnalId: 1
          })).toEqual('/ucgv2hymnals/1');
        }));

        it('should attach an Ucgv2hymnal to the controller scope', function () {
          expect($scope.vm.ucgv2hymnal._id).toBe(mockUcgv2hymnal._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/ucgv2hymnals/client/views/view-ucgv2hymnal.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          Ucgv2hymnalsController,
          mockUcgv2hymnal;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('ucgv2hymnals.create');
          $templateCache.put('modules/ucgv2hymnals/client/views/form-ucgv2hymnal.client.view.html', '');

          // create mock Ucgv2hymnal
          mockUcgv2hymnal = new Ucgv2hymnalsService();

          // Initialize Controller
          Ucgv2hymnalsController = $controller('Ucgv2hymnalsController as vm', {
            $scope: $scope,
            ucgv2hymnalResolve: mockUcgv2hymnal
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.ucgv2hymnalResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/ucgv2hymnals/create');
        }));

        it('should attach an Ucgv2hymnal to the controller scope', function () {
          expect($scope.vm.ucgv2hymnal._id).toBe(mockUcgv2hymnal._id);
          expect($scope.vm.ucgv2hymnal._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/ucgv2hymnals/client/views/form-ucgv2hymnal.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          Ucgv2hymnalsController,
          mockUcgv2hymnal;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('ucgv2hymnals.edit');
          $templateCache.put('modules/ucgv2hymnals/client/views/form-ucgv2hymnal.client.view.html', '');

          // create mock Ucgv2hymnal
          mockUcgv2hymnal = new Ucgv2hymnalsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Ucgv2hymnal Name'
          });

          // Initialize Controller
          Ucgv2hymnalsController = $controller('Ucgv2hymnalsController as vm', {
            $scope: $scope,
            ucgv2hymnalResolve: mockUcgv2hymnal
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:ucgv2hymnalId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.ucgv2hymnalResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            ucgv2hymnalId: 1
          })).toEqual('/ucgv2hymnals/1/edit');
        }));

        it('should attach an Ucgv2hymnal to the controller scope', function () {
          expect($scope.vm.ucgv2hymnal._id).toBe(mockUcgv2hymnal._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/ucgv2hymnals/client/views/form-ucgv2hymnal.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
