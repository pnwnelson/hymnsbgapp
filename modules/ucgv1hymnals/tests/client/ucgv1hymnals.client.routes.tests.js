(function () {
  'use strict';

  describe('Ucgv1hymnals Route Tests', function () {
    // Initialize global variables
    var $scope,
      Ucgv1hymnalsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _Ucgv1hymnalsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      Ucgv1hymnalsService = _Ucgv1hymnalsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('ucgv1hymnals');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/ucgv1hymnals');
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
          Ucgv1hymnalsController,
          mockUcgv1hymnal;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('ucgv1hymnals.view');
          $templateCache.put('modules/ucgv1hymnals/client/views/view-ucgv1hymnal.client.view.html', '');

          // create mock Ucgv1hymnal
          mockUcgv1hymnal = new Ucgv1hymnalsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Ucgv1hymnal Name'
          });

          // Initialize Controller
          Ucgv1hymnalsController = $controller('Ucgv1hymnalsController as vm', {
            $scope: $scope,
            ucgv1hymnalResolve: mockUcgv1hymnal
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:ucgv1hymnalId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.ucgv1hymnalResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            ucgv1hymnalId: 1
          })).toEqual('/ucgv1hymnals/1');
        }));

        it('should attach an Ucgv1hymnal to the controller scope', function () {
          expect($scope.vm.ucgv1hymnal._id).toBe(mockUcgv1hymnal._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/ucgv1hymnals/client/views/view-ucgv1hymnal.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          Ucgv1hymnalsController,
          mockUcgv1hymnal;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('ucgv1hymnals.create');
          $templateCache.put('modules/ucgv1hymnals/client/views/form-ucgv1hymnal.client.view.html', '');

          // create mock Ucgv1hymnal
          mockUcgv1hymnal = new Ucgv1hymnalsService();

          // Initialize Controller
          Ucgv1hymnalsController = $controller('Ucgv1hymnalsController as vm', {
            $scope: $scope,
            ucgv1hymnalResolve: mockUcgv1hymnal
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.ucgv1hymnalResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/ucgv1hymnals/create');
        }));

        it('should attach an Ucgv1hymnal to the controller scope', function () {
          expect($scope.vm.ucgv1hymnal._id).toBe(mockUcgv1hymnal._id);
          expect($scope.vm.ucgv1hymnal._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/ucgv1hymnals/client/views/form-ucgv1hymnal.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          Ucgv1hymnalsController,
          mockUcgv1hymnal;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('ucgv1hymnals.edit');
          $templateCache.put('modules/ucgv1hymnals/client/views/form-ucgv1hymnal.client.view.html', '');

          // create mock Ucgv1hymnal
          mockUcgv1hymnal = new Ucgv1hymnalsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Ucgv1hymnal Name'
          });

          // Initialize Controller
          Ucgv1hymnalsController = $controller('Ucgv1hymnalsController as vm', {
            $scope: $scope,
            ucgv1hymnalResolve: mockUcgv1hymnal
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:ucgv1hymnalId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.ucgv1hymnalResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            ucgv1hymnalId: 1
          })).toEqual('/ucgv1hymnals/1/edit');
        }));

        it('should attach an Ucgv1hymnal to the controller scope', function () {
          expect($scope.vm.ucgv1hymnal._id).toBe(mockUcgv1hymnal._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/ucgv1hymnals/client/views/form-ucgv1hymnal.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
