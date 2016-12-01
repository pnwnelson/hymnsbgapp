(function () {
  'use strict';

  describe('Wcg1993hymnals Route Tests', function () {
    // Initialize global variables
    var $scope,
      Wcg1993hymnalsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _Wcg1993hymnalsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      Wcg1993hymnalsService = _Wcg1993hymnalsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('wcg1993hymnals');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/wcg1993hymnals');
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
          Wcg1993hymnalsController,
          mockWcg1993hymnal;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('wcg1993hymnals.view');
          $templateCache.put('modules/wcg1993hymnals/client/views/view-wcg1993hymnal.client.view.html', '');

          // create mock Wcg1993hymnal
          mockWcg1993hymnal = new Wcg1993hymnalsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Wcg1993hymnal Name'
          });

          // Initialize Controller
          Wcg1993hymnalsController = $controller('Wcg1993hymnalsController as vm', {
            $scope: $scope,
            wcg1993hymnalResolve: mockWcg1993hymnal
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:wcg1993hymnalId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.wcg1993hymnalResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            wcg1993hymnalId: 1
          })).toEqual('/wcg1993hymnals/1');
        }));

        it('should attach an Wcg1993hymnal to the controller scope', function () {
          expect($scope.vm.wcg1993hymnal._id).toBe(mockWcg1993hymnal._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/wcg1993hymnals/client/views/view-wcg1993hymnal.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          Wcg1993hymnalsController,
          mockWcg1993hymnal;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('wcg1993hymnals.create');
          $templateCache.put('modules/wcg1993hymnals/client/views/form-wcg1993hymnal.client.view.html', '');

          // create mock Wcg1993hymnal
          mockWcg1993hymnal = new Wcg1993hymnalsService();

          // Initialize Controller
          Wcg1993hymnalsController = $controller('Wcg1993hymnalsController as vm', {
            $scope: $scope,
            wcg1993hymnalResolve: mockWcg1993hymnal
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.wcg1993hymnalResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/wcg1993hymnals/create');
        }));

        it('should attach an Wcg1993hymnal to the controller scope', function () {
          expect($scope.vm.wcg1993hymnal._id).toBe(mockWcg1993hymnal._id);
          expect($scope.vm.wcg1993hymnal._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/wcg1993hymnals/client/views/form-wcg1993hymnal.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          Wcg1993hymnalsController,
          mockWcg1993hymnal;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('wcg1993hymnals.edit');
          $templateCache.put('modules/wcg1993hymnals/client/views/form-wcg1993hymnal.client.view.html', '');

          // create mock Wcg1993hymnal
          mockWcg1993hymnal = new Wcg1993hymnalsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Wcg1993hymnal Name'
          });

          // Initialize Controller
          Wcg1993hymnalsController = $controller('Wcg1993hymnalsController as vm', {
            $scope: $scope,
            wcg1993hymnalResolve: mockWcg1993hymnal
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:wcg1993hymnalId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.wcg1993hymnalResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            wcg1993hymnalId: 1
          })).toEqual('/wcg1993hymnals/1/edit');
        }));

        it('should attach an Wcg1993hymnal to the controller scope', function () {
          expect($scope.vm.wcg1993hymnal._id).toBe(mockWcg1993hymnal._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/wcg1993hymnals/client/views/form-wcg1993hymnal.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
