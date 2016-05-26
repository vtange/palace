describe('Palace Game: ', function() {

  var scope;
  var ctrl;

  beforeEach(module('palace-game'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    ctrl = $controller('MainCtrl', {$scope: scope});
  }));


  describe('App', function() {

	beforeEach(function(){
	})
	afterEach(function() {
	});
	  
	it('should do blah', function() {
	});

  });
});
