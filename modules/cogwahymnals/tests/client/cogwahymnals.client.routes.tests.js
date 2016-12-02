(function () {
  'use strict';

  describe('Cogwahymnals Route Tests', function () {
    // Initialize global variables
    var $scope,
      CogwahymnalsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _CogwahymnalsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      CogwahymnalsService = _CogwahymnalsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('cogwahymnals');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/cogwahymnals');
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
          CogwahymnalsController,
          mockCogwahymnal;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('cogwahymnals.view');
          $templateCache.put('modules/cogwahymnals/client/views/view-cogwahymnal.client.view.html', '');

          // create mock Cogwahymnal
          mockCogwahymnal = new CogwahymnalsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Cogwahymnal Name'
          });

          // Initialize Controller
          CogwahymnalsController = $controller('CogwahymnalsController as vm', {
            $scope: $scope,
            cogwahymnalResolve: mockCogwahymnal
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:cogwahymnalId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.cogwahymnalResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            cogwahymnalId: 1
          })).toEqual('/cogwahymnals/1');
        }));

        it('should attach an Cogwahymnal to the controller scope', function () {
          expect($scope.vm.cogwahymnal._id).toBe(mockCogwahymnal._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/cogwahymnals/client/views/view-cogwahymnal.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          CogwahymnalsController,
          mockCogwahymnal;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('cogwahymnals.create');
          $templateCache.put('modules/cogwahymnals/client/views/form-cogwahymnal.client.view.html', '');

          // create mock Cogwahymnal
          mockCogwahymnal = new CogwahymnalsService();

          // Initialize Controller
          CogwahymnalsController = $controller('CogwahymnalsController as vm', {
            $scope: $scope,
            cogwahymnalResolve: mockCogwahymnal
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.cogwahymnalResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/cogwahymnals/create');
        }));

        it('should attach an Cogwahymnal to the controller scope', function () {
          expect($scope.vm.cogwahymnal._id).toBe(mockCogwahymnal._id);
          expect($scope.vm.cogwahymnal._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/cogwahymnals/client/views/form-cogwahymnal.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          CogwahymnalsController,
          mockCogwahymnal;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('cogwahymnals.edit');
          $templateCache.put('modules/cogwahymnals/client/views/form-cogwahymnal.client.view.html', '');

          // create mock Cogwahymnal
          mockCogwahymnal = new CogwahymnalsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Cogwahymnal Name'
          });

          // Initialize Controller
          CogwahymnalsController = $controller('CogwahymnalsController as vm', {
            $scope: $scope,
            cogwahymnalResolve: mockCogwahymnal
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:cogwahymnalId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.cogwahymnalResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            cogwahymnalId: 1
          })).toEqual('/cogwahymnals/1/edit');
        }));

        it('should attach an Cogwahymnal to the controller scope', function () {
          expect($scope.vm.cogwahymnal._id).toBe(mockCogwahymnal._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/cogwahymnals/client/views/form-cogwahymnal.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
