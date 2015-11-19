//<img src = "img/" + suit + "/" + value + ".png">
var row = $("<div>").addClass("row");
var row2 = $("<div>").addClass("row");
$('#game').append(row,row2);
function makeRows(){

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
	var button = $("<button>").addClass("row btn btn-danger").html("Start Game");
	button.click((function(){
		this.gameStart();
	}).bind(this));
	$('#game').append(button);

}
Game.prototype.gameStart = function(){
	// initialize each player with their own name and 2 cards.
	$(row).append(this.dealer.div);
	for(var i = 0; i < this.numberOfPlayers; i++){
		name = prompt("What is your name?");
		this.players[i] = new Player(name, this.dealer.deal(), this.dealer);
		this.players[i].playerCards();
		this.players[i].render();
		
	};

	this.dealer.dealerCards();

	this.dealer.render();

}

Game.prototype.gameRound = function(){
	//loop through the players
	for(var i = 0; i < this.players.length; i++){
		while(this.players[i].stayStatus !== true){
		//while(this.players[i].continue){
			//this.players[i].hitOrStay();

			console.log(this.players[i].cards);
			var hitOrStay = prompt("Do you like to hit or stay?")
			switch(hitOrStay){
				case "hit":
					this.players[i].hit();
					//put the below code in hit()
					if(this.players[i].cards[this.players[i].cards.length-1].name === "ace"){
						var ace = prompt("You have an ACE! 1 or 11?");
						if(ace === "1"){
							this.players[i].cards[this.players[i].cards.length-1].value = 1;
						}
						else{
							this.players[i].cards[this.players[i].cards.length-1].value = 11;
						}
					}
					this.players[i].render();
					break;
				case "stay":
					this.players[i].stay();
					break;
				default:
					console.log("Invalid answer!")
					break;

			};
		};
		if(this.players[i].bust === true){
			console.log(this.players[i].name + " BUSTED");
			this.numberOfPlayers--;
		}
	}
		while(this.dealer.stayStatus !== true){
			console.log(this.dealer.dealerCards)
			var hitOrStay = prompt("Do you like to hit or stay?")
				switch(hitOrStay){
					case "hit":
						
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
						this.dealer.render();
						this.dealer.checker();
						break;
					case "stay":
						this.dealer.stayStatus = true;
						break;
					default:
						console.log("Invalid answer!")
						break;

				};
		}
		if(this.dealer.bust === true){
				console.log("DEALER BUSTED");
			}
		if(this.dealer.bust !== true && this.numberOfPlayers > 0){
			for(var i = 0; i < this.dealer.dealerCards.length; i++){
				this.dealerScore += this.dealer.dealerCards[i].value;
			}
			for(var i = 0; i < this.players.length; i++){
				var playerScore = 0;
				if(this.players[i].bust !== true){
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
		if(this.dealer.bust === true && this.numberOfPlayers > 0){
			for(var i = 0; i < this.players.length; i++){
				var playerScore = 0;
				if(this.players[i].bust !== true){
					for(var j = 0; j < this.players[i].cards.length; j++){
						console.log(this.players[i].name + " beats the dealer!");;
					}

				}
			}
		}
		if(this.dealer.bust !== true && this.numberOfPlayers === 0){
			console.log("DEALER WINS!");
		}

	}

function Dealer(){
	this.deck = _.shuffle(new Deck());
	this.dealerCards;
	this.stayStatus = false;
	this.score = 0;
	this.bust = false;
	this.twentyOne = false;
	this.div = $("<div>").addClass("col-md-12 text-center");
	this.deal = function(){
		var twoCards = [];
		twoCards.push(this.deck.pop());
		twoCards.push(this.deck.pop());
		return twoCards
	}

}
Dealer.prototype.checker = function(){
	for(var i = 0; i < this.dealerCards.length; i++){
		this.score += this.dealerCards[i].value;
	}
	if(this.score > 21){
		this.stayStatus = true;
		this.bust = true;
	}
	else if(this.score === 21){
		this.stayStatus = true;
		this.twentyOne = true;
	}
	else{
		this.score = 0;
	}
	}
Dealer.prototype.draw = function(){
	var drawCard = this.deck.pop();
	return drawCard
}
Dealer.prototype.checker = function(){
	for(var i = 0; i < this.dealerCards.length; i++){
		this.score += this.dealerCards[i].value;
	}
	if(this.score > 21){
		this.stayStatus = true;
		this.bust = true;
	}
	else if(this.score === 21){
		this.stayStatus = true;
		this.twentyOne = true;
	}
	else{
		this.score = 0;
	}
}
Dealer.prototype.dealerCards = function(){
	this.dealerCards = this.deal();

	for(var i = 0; i < this.dealerCards.length; i++){
		if(this.dealerCards[i].name === "ace"){
			var ace = prompt("You have an ACE! 1 or 11?");
			if(ace === "1"){
				this.dealerCards[i].value = 1;
			}
			else{
				this.dealerCards[i].value = 11;
			}
		}
	}
};
Dealer.prototype.render = function(){
	this.div.html("");
	for(var i = 0; i < this.dealerCards.length; i++){
			this.div.append(this.dealerCards[i].render())
	}
};

function Player(name, twoCards, dealer){

	this.name = name;
	var dealer = dealer;
	// this player's cards
	this.cards = twoCards;
	this.bust = false;
	this.twentyOne = false;
	this.div = $("<div>").addClass("col-md-12 text-center");
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
              this.bust = true;
            }

			this.tracker = 0;
		}
		if(this.tracker === 21){
			this.twentyOne = true;
			this.stayStatus = true;
		}

	};

	this.stay = function(){
		this.stayStatus = true;
	}	
}
Player.prototype.render = function(){
	this.div.html("");
	for(var i = 0; i < this.cards.length; i++){
		this.div.append(this.cards[i].render());
	}
}
Player.prototype.playerCards = function(){
	var twentyOne = 0;
		for(var j = 0; j < this.cards.length; j++){
			$(row2).append(this.div);
			this.render();
		
			twentyOne += this.cards[j].value;
			if(this.cards[j].name === "ace"){

				var ace = prompt("You have an ACE! 1 or 11?");
				if(ace === "1"){
					this.cards[j].value = 1;
					
				}
				else{
					this.cards[j].value = 11;
					if(twentyOne === 21){
						this.twentyOne = true;
					}
					
				}
				
			}
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

Card.prototype.render = function(){
	var card = $("<img>");
	card.attr("src","img/cards/" + this.suit + "/" + this.name + ".png")
	return card;
}





