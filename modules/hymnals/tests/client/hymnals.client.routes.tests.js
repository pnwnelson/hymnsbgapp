(function () {
  'use strict';

  describe('Hymnals Route Tests', function () {
    // Initialize global variables
    var $scope,
      HymnalsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _HymnalsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      HymnalsService = _HymnalsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('hymnals');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/hymnals');
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
          HymnalsController,
          mockHymnal;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('hymnals.view');
          $templateCache.put('modules/hymnals/client/views/view-hymnal.client.view.html', '');

          // create mock Hymnal
          mockHymnal = new HymnalsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Hymnal Name'
          });

          // Initialize Controller
          HymnalsController = $controller('HymnalsController as vm', {
            $scope: $scope,
            hymnalResolve: mockHymnal
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:hymnalId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.hymnalResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            hymnalId: 1
          })).toEqual('/hymnals/1');
        }));

        it('should attach an Hymnal to the controller scope', function () {
          expect($scope.vm.hymnal._id).toBe(mockHymnal._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/hymnals/client/views/view-hymnal.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          HymnalsController,
          mockHymnal;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('hymnals.create');
          $templateCache.put('modules/hymnals/client/views/form-hymnal.client.view.html', '');

          // create mock Hymnal
          mockHymnal = new HymnalsService();

          // Initialize Controller
          HymnalsController = $controller('HymnalsController as vm', {
            $scope: $scope,
            hymnalResolve: mockHymnal
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.hymnalResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/hymnals/create');
        }));

        it('should attach an Hymnal to the controller scope', function () {
          expect($scope.vm.hymnal._id).toBe(mockHymnal._id);
          expect($scope.vm.hymnal._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/hymnals/client/views/form-hymnal.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          HymnalsController,
          mockHymnal;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('hymnals.edit');
          $templateCache.put('modules/hymnals/client/views/form-hymnal.client.view.html', '');

          // create mock Hymnal
          mockHymnal = new HymnalsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Hymnal Name'
          });

          // Initialize Controller
          HymnalsController = $controller('HymnalsController as vm', {
            $scope: $scope,
            hymnalResolve: mockHymnal
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:hymnalId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.hymnalResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            hymnalId: 1
          })).toEqual('/hymnals/1/edit');
        }));

        it('should attach an Hymnal to the controller scope', function () {
          expect($scope.vm.hymnal._id).toBe(mockHymnal._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/hymnals/client/views/form-hymnal.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
