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
	});
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
	});
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
		scope.startGame();
	});
	afterEach(function() {
	});

	it('should highlight selected cards', function() {
		var card = scope.deck[1];
		scope.cardsToPlay.cards.push(card);
		expect(scope.cardAnims(card)['box-shadow']).to.equal('0px 0px 25px rgba(155,255,255,0.8)');
	});
	it('should move selected card up', function() {
		var card = scope.deck[1];
		scope.cardsToPlay.cards.push(card);
		expect(scope.cardAnims(card)['transform']).to.equal('translateY(-50px)');
	});
	it('should dim cards not of similar value to selected card', function() {
		var card1 = scope.deck[1];
		scope.cardsToPlay.cards.push(card1);
		scope.cardsToPlay.value = card1.value;
		var card2 = scope.deck.getFirstElementThat(function(card){
			return card.value !== card1.value;
		})
		sinon.stub(scope, 'getCurrentHand', function() {
			return [card2];
		});
		expect(scope.cardAnims(card2)['opacity']).to.equal(0.75);
		expect(scope.cardAnims(card2)['cursor']).to.equal("default");
	});
	it('should not dim cards of similar value to selected card', function() {
		var card1 = scope.deck[1];
		scope.cardsToPlay.cards.push(card1);
		scope.cardsToPlay.value = card1.value;
		var card2 = scope.deck.getFirstElementThat(function(card){
			return card.value === card1.value && card.id !== card1.id;
		})
		sinon.stub(scope, 'getCurrentHand', function() {
			return [card2];
		});
		expect(scope.cardAnims(card2)).to.equal(undefined);
	});
	it('should not target cards not on hand/selected', function() {
		var card1 = scope.deck[1];
		scope.cardsToPlay.cards.push(card1);
		scope.cardsToPlay.value = card1.value;
		var card2 = scope.deck.getFirstElementThat(function(card){
			return card.value !== card1.value;
		})
		expect(scope.cardAnims(card2)).to.equal(undefined);
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
		function capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
		var players = ['player1','player2','player3','player4'];
		players.forEach(function(player){
			scope[player].forfeiting = true;
			expect(scope.forfAnims()['animation']).to.equal('drawTo'+capitalizeFirstLetter(player)+' 0.75s');
			scope[player].forfeiting = false;
		});
		expect(scope.forfAnims()).to.deep.equal({});
	});
	  
	it('should use blowUp animation for pile to simulate pile reset (played a 10)', function() {
		scope.blowUp = true;
		expect(scope.blowUpAnim()['animation']).to.equal('pileBlowUp 0.75s');
		scope.blowUp = false;
		expect(scope.blowUpAnim()).to.deep.equal({});
	});
  });
  describe('Gameplay', function() {

	beforeEach(function(){
	});
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
	  
	it("should be Player 1's turn", function() {
		expect(scope.getCurrentPlayer()).to.equal(scope.player1);
	});

	it("should not be showing anyone's hand without handOn", function() {
		expect(scope.getCurrentHand()).to.deep.equal([]);
	});

	it("should show Player1's hand", function() {
		scope.startGame();
		var card1 = scope.deck[1];
		scope.handOn = true;
		scope.player1.hand = [card1]
		expect(scope.getCurrentHand()).to.deep.equal([card1]);
	});
	it("should set up 3 cards in each of 4 player's hand, palaces", inject(function($timeout) {
		scope.startGame();
	  	$timeout.flush();
		var players = ['player1','player2','player3','player4'];
		players.forEach(function(player){
			expect(scope[player].hand.length).to.equal(3);
			expect(scope[player].upp_palace.length).to.equal(3);
			expect(scope[player].sec_palace.length).to.equal(3);
		});
	}));
	it("should animate and unanimate drawing", inject(function($timeout) {
		scope.startGame();
	  	$timeout.flush();
		var players = ['player1','player2','player3','player4'];
		players.forEach(function(player){
			expect(scope[player].isDrawing).to.equal(true);
		});
		$timeout.flush();
		players.forEach(function(player){
			expect(scope[player].isDrawing).to.equal(false);
		});
	}));
  	describe('Playable Cards', function() {
		beforeEach(inject(function($timeout){
			scope.startGame();
			$timeout.flush();
			$timeout.flush();
		}));
		afterEach(function() {
		});
		it("should have no card in pile, any card is playable", function() {
			expect(scope.playable).to.deep.equal(scope.weakToStrong);
		});
		it("playable cards check", inject(function($timeout) {
			for(var i = 0; i<scope.weakToStrong.length;i++){
				scope.cardToBeat = scope.weakToStrong[i];
				if (scope.cardToBeat === 7){
					expect(scope.getPlayables(scope.cardToBeat)).to.deep.equal([3,4,5,6,7,8,2,10]);
				}
				else if	(scope.cardToBeat === 8){
					expect(scope.getPlayables(scope.cardToBeat)).to.deep.equal([9,11,12,13,1,7,8,2,10]);
				}
				else if	(scope.cardToBeat === 2||scope.cardToBeat === 10){
					expect(scope.getPlayables(scope.cardToBeat)).to.deep.equal([3,4,5,6,9,11,12,13,1,7,8,2,10]);
				}
				else if (scope.cardToBeat !== null){
					expect(scope.getPlayables(scope.cardToBeat)).to.deep.equal(scope.playable.slice(scope.playable.indexOf(scope.cardToBeat)));
				}
			}
		}));
	});
  });
  describe('AI / Computer Player', function() {

	beforeEach(inject(function($timeout){
		scope.startGame();
	  	$timeout.flush();
		$timeout.flush();
	}));
	afterEach(function() {
	});
	it("should be able to do Swap Mode", inject(function($timeout) {
	  	$timeout.flush();
		$timeout.flush();
	}));
	it("should always fill upper palace with magics before filling hand with magics", inject(function($timeout) {
		$timeout.flush();
		$timeout.flush();
		//upp palace should have at most 3 magic cards
		var numMagicsUpp = scope.player1.upp_palace.reduce(function(magics,card){
			if(scope.isMagicOrAce(card.value)){
				magics.push(card);
			}
			return magics;
		},[]).length;
		var numMagicsHnd = scope.player1.hand.reduce(function(magics,card){
			if(scope.isMagicOrAce(card.value)){
				magics.push(card);
			}
			return magics;
		},[]).length;
		if(numMagicsUpp<3){
			expect(numMagicsHnd).to.equal(0);
		}
		else{
			expect(numMagicsHnd).to.be.below(4);
		}
	}));
	it("should successfully swap 3 cards everytime", inject(function($timeout) {
	  	$timeout.flush();
		$timeout.flush();
		expect(scope.player1.upp_palace.length).to.equal(3);
	}));
	it("should end up with 3 cards on hand", inject(function($timeout) {
	  	$timeout.flush();
		$timeout.flush();
		expect(scope.player1.hand.length).to.equal(3);
	}));
	it("should always play a playable card", inject(function($timeout) {
	  	$timeout.flush();
		$timeout.flush();
		expect(scope.playable.indexOf(scope.cardsToPlay.value)).to.not.equal(-1);
	}));
  });
  describe('Human Player', function() {

	beforeEach(inject(function($timeout){
		scope.nextPlayer = 3;
		scope.runNextTurn();
	}));
	afterEach(function() {
	});
	it("should be able to do Swap Mode", inject(function($timeout) {
	}));
  });
  describe('Misc functions', function() {

	beforeEach(function(){
	});
	afterEach(function() {
	});
	it("should know all the ace or magic cards", function() {
		var aces = [1,2,7,8,10];
		aces.forEach(function(value){
			expect(scope.isMagicOrAce(value)).to.equal(true);
		});
	});
	it("should sort a hand according the ideal example", function() {
		var order = [3,4,5,6,9,11,12,13,1,7,8,2,10];
		var hand1 = [2,2,2,2];
		var hand2 = [1,7,12,2];
		var hand3 = [10,7,4,3];
		expect(order.exampleSort(order)).to.deep.equal(order);
		expect(hand1.exampleSort(order)).to.deep.equal(hand1);
		expect(hand2.exampleSort(order)).to.deep.equal([12,1,7,2]);
		expect(hand3.exampleSort(order)).to.deep.equal([3,4,7,10]);
	});
	it("should know when the whole hand is the same card value", function() {
		var hand1 = [2,2,2,2];
		var hand2 = [1,2,2,2];
		var hand3 = [1];
		expect(hand1.allValuesSame()).to.equal(true);
		expect(hand2.allValuesSame()).to.equal(false);
		expect(hand3.allValuesSame()).to.equal(true);
	});
	it("should return null array (Array prototype getFirstElementThat )", function() {
		expect([1,2,3].getFirstElementThat(function(value){
			return value === 4;
		})).to.equal(null);
	});

  });
});
