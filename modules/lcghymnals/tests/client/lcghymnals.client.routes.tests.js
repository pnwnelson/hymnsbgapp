(function () {
  'use strict';

  describe('Lcghymnals Route Tests', function () {
    // Initialize global variables
    var $scope,
      LcghymnalsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _LcghymnalsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      LcghymnalsService = _LcghymnalsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('lcghymnals');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/lcghymnals');
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
          LcghymnalsController,
          mockLcghymnal;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('lcghymnals.view');
          $templateCache.put('modules/lcghymnals/client/views/view-lcghymnal.client.view.html', '');

          // create mock Lcghymnal
          mockLcghymnal = new LcghymnalsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Lcghymnal Name'
          });

          // Initialize Controller
          LcghymnalsController = $controller('LcghymnalsController as vm', {
            $scope: $scope,
            lcghymnalResolve: mockLcghymnal
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:lcghymnalId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.lcghymnalResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            lcghymnalId: 1
          })).toEqual('/lcghymnals/1');
        }));

        it('should attach an Lcghymnal to the controller scope', function () {
          expect($scope.vm.lcghymnal._id).toBe(mockLcghymnal._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/lcghymnals/client/views/view-lcghymnal.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          LcghymnalsController,
          mockLcghymnal;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('lcghymnals.create');
          $templateCache.put('modules/lcghymnals/client/views/form-lcghymnal.client.view.html', '');

          // create mock Lcghymnal
          mockLcghymnal = new LcghymnalsService();

          // Initialize Controller
          LcghymnalsController = $controller('LcghymnalsController as vm', {
            $scope: $scope,
            lcghymnalResolve: mockLcghymnal
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.lcghymnalResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/lcghymnals/create');
        }));

        it('should attach an Lcghymnal to the controller scope', function () {
          expect($scope.vm.lcghymnal._id).toBe(mockLcghymnal._id);
          expect($scope.vm.lcghymnal._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/lcghymnals/client/views/form-lcghymnal.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          LcghymnalsController,
          mockLcghymnal;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('lcghymnals.edit');
          $templateCache.put('modules/lcghymnals/client/views/form-lcghymnal.client.view.html', '');

          // create mock Lcghymnal
          mockLcghymnal = new LcghymnalsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Lcghymnal Name'
          });

          // Initialize Controller
          LcghymnalsController = $controller('LcghymnalsController as vm', {
            $scope: $scope,
            lcghymnalResolve: mockLcghymnal
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:lcghymnalId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.lcghymnalResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            lcghymnalId: 1
          })).toEqual('/lcghymnals/1/edit');
        }));

        it('should attach an Lcghymnal to the controller scope', function () {
          expect($scope.vm.lcghymnal._id).toBe(mockLcghymnal._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/lcghymnals/client/views/form-lcghymnal.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
