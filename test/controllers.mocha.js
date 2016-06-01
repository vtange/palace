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
  describe('Toggles', function() {

	beforeEach(function(){
	})
	afterEach(function() {
	});

	it('should toggle Menu between games', function() {
		expect(scope.showMenu()['opacity']).to.equal(1);
		expect(scope.showMenu()['z-index']).to.be.above(1);
		scope.startGame();
		expect(scope.showMenu()['opacity']).to.equal(0);
		expect(scope.showMenu()['z-index']).to.be.below(1);
	});

	it('should toggle Deck between games', function() {
		expect(scope.showDeck()['opacity']).to.equal(0);
		expect(scope.showDeck()['z-index']).to.be.below(1);
		scope.startGame();
		expect(scope.showDeck()['opacity']).to.equal(1);
		expect(scope.showDeck()['z-index']).to.be.above(1);
	});
	  
	it('should only show play area for a player when he/she is ready', function() {
		var players = ['player1','player2','player3','player4'];
		players.forEach(function(player){
			expect(scope.showPlayer(scope[player])['opacity']).to.equal(0);
			scope[player].ready = true;
			expect(scope.showPlayer(scope[player])['opacity']).to.equal(1);
		});
	});

	it('should only show hand when I say so', function() {
			expect(scope.showHand()['opacity']).to.equal(0);
			scope.handOn = true;
			expect(scope.showHand()['opacity']).to.equal(1);
	});

	it('should only show the pile when I says so', function() {
			expect(scope.pileOn).to.equal(false);
			scope.showPile();
			expect(scope.pileOn).to.equal(true);
			scope.showPile();
			expect(scope.pileOn).to.equal(false);
	});

	it('should only show the pile when I says so', function() {
			expect(scope.tutOn).to.equal(false);
			scope.showTut();
			expect(scope.tutOn).to.equal(true);
			scope.showTut();
			expect(scope.tutOn).to.equal(false);
	});

  });
  describe('Animations', function() {

	beforeEach(function(){
	})
	afterEach(function() {
	});

	it('should highlight selected cards', function() {
	});
	it('should dim cards not of similar value to selected card', function() {
	});

	it('should use drawing animation for deck to simulate drawing', function() {
		function capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
		var players = ['player1','player2','player3','player4'];
		players.forEach(function(player){
			scope[player].isDrawing = true;
			expect(scope.drawAnims()['animation']).to.equal('drawTo'+capitalizeFirstLetter(player)+' 0.75s');
			scope[player].isDrawing = false;
		});
		expect(scope.drawAnims()['opacity']).to.equal(0);
	});
	  
	it('should use fortfeit animation for pile to simulate picking up the pile', function() {
	});
	  
	it('should use blowUp animation for pile to simulate pile reset (played a 10)', function() {
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

	it('should not start game multiple times if I spam start', function() {
		sinon.stub(scope, 'setupGame', function() {});
		scope.startGame();
		scope.startGame();
		expect(scope.setupGame.callCount).to.equal(1);
	});
  });
});
