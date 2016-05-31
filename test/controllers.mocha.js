describe('Palace Game: ', function() {

  var scope;
  var ctrl;

  beforeEach(module('palace-game'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    ctrl = $controller('MainCtrl', {$scope: scope});
  }));


  describe('Aesthetics', function() {

	beforeEach(function(){
	})
	afterEach(function() {
	});

	it('should use JQK instead of 11,12,13', function() {
		var nonface = [1,2,3,4,5,6,7,8,9,10];
		nonface.forEach(function(value){
			expect(scope.JQK(value)).to.equal(value);
		});
		expect(scope.JQK(11)).to.equal("J");
		expect(scope.JQK(12)).to.equal("Q");
		expect(scope.JQK(13)).to.equal("K");
	});
	  
	it('should count 11-13 as face cards (JQK)', function() {
		var face = [11,12,13];
		face.forEach(function(value){
			expect(scope.isFace(value)).to.equal(true);
		});
	});

	it('should not count 1-10 as face cards', function() {
		var nonface = [1,2,3,4,5,6,7,8,9,10];
		nonface.forEach(function(value){
			expect(scope.isFace(value)).to.equal(false);
		});
	});

	it('should use the right SVG for suits', function() {
		var suits = ['hearts','diamonds','spades','clubs'];
		suits.forEach(function(suit){
			expect(scope.getSuit(suit)["background-image"]).to.equal("url(img/Emblem-"+suit.slice(0,suit.length-1)+".svg)");
		});
	});

	it('should show JQK for 11,12,13', function() {
		var redsuits = ['hearts','diamonds'];
		var blksuits = ['spades','clubs'];
		blksuits.forEach(function(suit){
				expect(scope.getFace(suit,11)["background-image"]).to.equal("url(img/jack.png)");
				expect(scope.getFace(suit,12)["background-image"]).to.equal("url(img/queen.png)");
				expect(scope.getFace(suit,13)["background-image"]).to.equal("url(img/king.png)");
		});
		redsuits.forEach(function(suit){
				expect(scope.getFace(suit,11)["background-image"]).to.equal("url(img/jack2.png)");
				expect(scope.getFace(suit,12)["background-image"]).to.equal("url(img/queen2.png)");
				expect(scope.getFace(suit,13)["background-image"]).to.equal("url(img/king2.png)");
		});
	});

	it('should use red for hearts/diamonds and black for spades/clubs', function() {
		var redsuits = ['hearts','diamonds'];
		var blksuits = ['spades','clubs'];
		blksuits.forEach(function(suit){
				expect(scope.color(suit)["color"]).to.equal("#222");
		});
		redsuits.forEach(function(suit){
				expect(scope.color(suit)["color"]).to.equal("#d00");
		});
	});

	it('should build an Array of x length for ng-repeating icons', function() {
		var nonface = [1,2,3,4,5,6,7,8,9,10];
		var face = [11,12,13];
		nonface.forEach(function(value){
			expect(scope.getNum(value).length).to.equal(value);
		});
		face.forEach(function(value){
			expect(scope.getNum(value).length).to.equal(0);
		});
	});
  });

  describe('Gameplay', function() {

	beforeEach(function(){
	})
	afterEach(function() {
	});

	it('should have a deck', function() {
		expect(scope.deck.length).to.not.equal(0);
	});
  });
});
