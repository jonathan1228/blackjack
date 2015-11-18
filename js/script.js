//<img src = "img/" + suit + "/" + value + ".png">
var row = $("<div>").addClass("row");
var row2 = $("<div>").addClass("row");
var dealer = $("<div>").addClass("col-md-12 text-center");
var player = $("<div>").addClass("col-md-12 text-center");
$('#game').append(row,row2);
$(row).append(dealer);
$(row2).append(player);
function makeCards(cards){
	var card = $("<img>");
	card.attr("src","img/cards/" + cards.suit + "/" + cards.name + ".png")
	return card;
}

function Game(){
	this.numberOfPlayers = prompt("How many players?");
	this.players = [];
	this.dealer = new Dealer();
	this.dealerScore = 0;
	var name;
	this.endRound = 0;
	//add outcome
	//add betting
	//initialize game

	this.gameStart = function(){
		// initialize each player with their own name and 2 cards.
		for(var i = 0; i < this.numberOfPlayers; i++){
			name = prompt("What is your name?");
			this.players[i] = new Player(name, this.dealer.deal(), this.dealer);
			
		};

		this.dealer.dealerCards = this.dealer.deal();
		for(var i = 0; i < this.dealer.dealerCards.length; i++){
			$(dealer).append(makeCards(this.dealer.dealerCards[i]))
		}
		for(var i = 0; i < this.players.length; i++){
			for(var j = 0; j < this.players[i].cards.length; j++){
				$(player).append(makeCards(this.players[i].cards[j]));
				
				if(this.players[i].cards[j].name === "ace"){
					var ace = prompt("You have an ACE! 1 or 11?");
					if(ace === "1"){
						this.players[i].cards[j].value = 1;
						
					}
					else{
						this.players[i].cards[j].value = 11;
						
					}
					
				}
			}
		}
	}
	this.gameRound = function(){
		for(var i = 0; i < this.players.length; i++){
			while(this.players[i].stayStatus !== true){
				console.log(this.players[i].cards);
				var hitOrStay = prompt("Do you like to hit or stay?")
				switch(hitOrStay){
					case "hit":
						this.players[i].hit();
						if(this.players[i].cards[this.players[i].cards.length-1].name === "ace"){
							var ace = prompt("You have an ACE! 1 or 11?");
							if(ace === "1"){
								this.players[i].cards[this.players[i].cards.length-1].value = 1;
							}
							else{
								this.players[i].cards[this.players[i].cards.length-1].value = 11;
							}
						}
						player.append(makeCards(this.players[i].cards[this.players[i].cards.length - 1]));
						break;
					case "stay":
						this.players[i].stay();
						break;
					default:
						console.log("Invalid answer!")
						break;

				};
			};
		}
		while(this.dealer.stayStatus !== true){
			console.log(this.dealer.dealerCards)
			var hitOrStay = prompt("Do you like to hit or stay?")
				switch(hitOrStay){
					case "hit":
						this.dealer.checker();
						this.dealer.dealerCards.push(this.dealer.draw());
						if(this.dealer.dealerCards[this.dealer.dealerCards.length-1].name === "ace"){
							var ace = prompt("You have an ACE! 1 or 11?");
							if (ace === "1"){
								this.dealer.dealerCards[this.dealer.dealerCards.length-1].value = 1;
							}
							else{
								this.dealer.dealerCards[this.dealer.dealerCards.length-1].value = 11;
							}
						}
						$(dealer).append(makeCards(this.dealer.dealerCards[this.dealer.dealerCards.length - 1]));
						break;
					case "stay":
						this.dealer.stayStatus = true;
						break;
					default:
						console.log("Invalid answer!")
						break;

				};
		}
		for(var i = 0; i < this.dealer.dealerCards.length; i++){
			this.dealerScore += this.dealer.dealerCards[i].value;
		}
		for(var i = 0; i < this.players.length; i++){
			var playerScore = 0;
			for(var j = 0; j < this.players[i].cards.length; j++){
				playerScore += this.players[i].cards[j].value;
			}
			
			if(playerScore > this.dealerScore ){
				console.log(this.players[i].name + " beats the dealer!");
			}
			else{
				console.log("Dealer beats " + this.players[i].name);
			}
			
		}
	}
}


function Dealer(){
	this.deck = _.shuffle(new Deck());
	this.dealerCards;
	this.stayStatus = false;
	this.score = 0;
	this.deal = function(){
		var twoCards = [];
		twoCards.push(this.deck.pop());
		twoCards.push(this.deck.pop());
		return twoCards
	}

	this.draw = function(){
		var drawCard = this.deck.pop();
		return drawCard
	}
	this.checker = function(){
		for(var i = 0; i < this.dealerCards.length; i++){
			this.score += this.dealerCards.value;
		}
		if(this.score > 21){
			this.stayStatus = true;
		}
		else{
			this.score = 0;
		}
	}
}

function Player(name, twoCards, dealer){

	this.name = name;
	var dealer = dealer;
	// this player's cards
	this.cards = twoCards;
	
	// tracks player's score
	this.tracker = 0;
	this.stayStatus = false;
	this.hit = function(){
		
		for(var i = 0; i < this.cards.length; i++){
			this.tracker += this.cards[i].value;
		}

		if(this.tracker < 21){

			this.cards.push(dealer.draw());
			
			var newTotal = this.tracker + this.cards[this.cards.length -1].value;
            if (newTotal > 21) {
              this.stayStatus = true;
            }

			this.tracker = 0;
		}

	};

	this.stay = function(){
		this.stayStatus = true;
	}	
}

function Deck(){
	//create an array
	// all of it's elements should be instances of the Card class
	this.suits = ["spade", "diamond", "club", "heart"];
	this.names = ["ace","2","3","4","5","6","7","8","9","10","jack","queen","king"];
	this.cards = [];

	for(var i = 0; i < this.suits.length; i++){
		
		for(var j = 0; j < this.names.length; j++){
			if(j >= 10){
				this.cards.push(new Card(this.suits[i], this.names[j], 10));
			}
			else{
				this.cards.push(new Card(this.suits[i], this.names[j], j+1));
			}
		}

	}

	

	// console.log(shuffled[5].value + " " + shuffled[5].name + " " + shuffled[5].suit)
	
	return this.cards;
	
}


function Card(suit, name, value){
	this.suit = suit;
	this.name = name;
	this.value = value;
	
}
