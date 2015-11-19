//<img src = "img/" + suit + "/" + value + ".png">
var row;
var row2;
window.onload = function(){
	row = $("<div>").addClass("row");
	row2 = $("<div>").addClass("row");
	var game = new Game();
	$('#game').append(row,row2);


}
function makeRows(){

}
function Game(){

	this.numberOfPlayers = prompt("How many players?");
	this.players = [];
	this.game = this;
	this.dealer = new Dealer(this.game);
	this.dealerScore = 0;
	var name;
	this.i;
	this.currentPlayer;
	this.endRound = 0;
	//add outcome
	//add betting
	//initialize game
	var startRound = $("<button>").addClass("row btn btn-danger start").html("Start Round");
	var button = $("<button>").addClass("row btn btn-danger button").html("Start Game");
	button.click((function(){
		this.gameStart();
		$(".button").hide();
		$('#game').append(startRound);
		startRound.click((function(){
			this.gameRound();
		}).bind(this));

	}).bind(this));
	$('#game').append(button);

}
Game.prototype.gameStart = function(){
	// initialize each player with their own name and 2 cards.
	$(row).append(this.dealer.div);
	for(var i = 0; i < this.numberOfPlayers; i++){
		name = prompt("What is your name?");
		this.players[i] = new Player(name, this.dealer.deal(), this.dealer, this.game);
		this.players[i].playerCards();
		this.players[i].render();
	};
	this.dealer.dealerCards();
	this.dealer.render();
	this.i = 0;
	this.currentPlayer = this.players[this.i];
	this.currentPlayer.hitOrStay();
	this.gameTurn();
}
Game.prototype.dealerRound = function(){
	if(this.dealer.bust || this.dealer.stay){
		this.dealer.removeButtons();
		this.outcome();
	}
}
Game.prototype.gameRound = function(){
	$(row).empty();
	$(row2).empty();
	for(var i = 0; i < this.players.length; i++){
		this.players[i].cards.length = 0;
		this.players[i].bust = false;
		this.players[i].stay = false;
		this.players[i].cards.push(this.dealer.draw());
		this.players[i].cards.push(this.dealer.draw());
		this.players[i].playerCards();
		this.players[i].render();
	}
	$(row).append(this.dealer.div);
	this.dealer.bust = false;
	this.dealer.stay = false;
	this.dealer.cards.length = 0;
	this.dealer.dealerCards();
	this.dealer.render();
	this.i = 0;
	this.currentPlayer = this.players[this.i];
	this.currentPlayer.hitOrStay();
	this.gameTurn();
}
Game.prototype.gameTurn = function(){
		if(this.currentPlayer.bust || this.currentPlayer.stay){
			this.currentPlayer.removeButtons();
			this.i++;
			if(this.currentPlayer.bust){
				this.numberOfPlayers--;
			}
			this.currentPlayer = this.players[this.i];
			if(this.currentPlayer !== undefined){
				this.currentPlayer.hitOrStay();
			}
			else{
				this.dealer.hitOrStay();
				this.dealerRound();
			}
		}
		
	}
Game.prototype.outcome = function(){
	if(this.dealer.bust){
				alert("DEALER BUSTED");
	}
	if(this.dealer.bust === false && this.numberOfPlayers > 0){
		for(var i = 0; i < this.dealer.cards.length; i++){
			this.dealerScore += this.dealer.cards[i].value;
		}
		for(var i = 0; i < this.players.length; i++){
			var playerScore = 0;
			if(this.players[i].bust === false){
				for(var j = 0; j < this.players[i].cards.length; j++){
					playerScore += this.players[i].cards[j].value;
				}
				
				if(playerScore > this.dealerScore){
					alert(this.players[i].name + " beats the dealer!");
				}
				else{
					alert("Dealer beats " + this.players[i].name);
				}
			}
		}
	}
	if(this.dealer.bust === true && this.numberOfPlayers > 0){
		for(var i = 0; i < this.players.length; i++){
			var playerScore = 0;
			if(this.players[i].bust !== true){
				for(var j = 0; j < this.players[i].cards.length; j++){
					alert(this.players[i].name + " beats the dealer!");;
				}

			}
		}
	}
	if(this.dealer.bust !== true && this.numberOfPlayers === 0){
		alert("DEALER WINS!");
	}

}
function Dealer(game){
	this.deck = _.shuffle(new Deck());
	this.cards;
	this.game = game;
	this.stay = false;
	this.score = 0;
	this.bust = false;
	this.twentyOne = false;
	this.div = $("<div>").addClass("col-md-12 text-center");
}
Dealer.prototype.deal = function(){
	var twoCards = [];
	twoCards.push(this.deck.pop());
	twoCards.push(this.deck.pop());
	return twoCards
}
Dealer.prototype.checker = function(){
	for(var i = 0; i < this.cards.length; i++){
		this.score += this.cards[i].value;
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
	for(var i = 0; i < this.cards.length; i++){
		this.score += this.cards[i].value;
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
	this.cards = this.deal();

	for(var i = 0; i < this.cards.length; i++){
		if(this.cards[i].name === "ace"){
			var ace = Number(prompt("You have an ACE! 1 or 11?"));
			if(ace === 1){
				this.cards[i].value = 1;
			}
			else{
				this.cards[i].value = 11;
			}
		}
	}
};
Dealer.prototype.render = function(){
	this.div.html("");
	for(var i = 0; i < this.cards.length; i++){
			this.div.append(this.cards[i].render())
	}
};
Dealer.prototype.hitOrStay = function(){
var row3 = $("<div>").addClass("row");
	var row4 = $("<div>").addClass("row");
	var hit = $("<div>").addClass("col-md-2 col-md-offset-5 btn btn-danger hit").html("Hit");
	hit.click((function(){
		this.hit();
	}).bind(this));
	(row3).append(hit);
	var stay = $("<div>").addClass("col-md-2 col-md-offset-5 btn btn-danger stay").html("Stay");
	stay.click((function(){
		this.stayPut();
	}).bind(this));
	$(row4).append(stay);
	$("#game").append(row3, row4);
}
Dealer.prototype.removeButtons = function(){
	$('.hit').remove();
	$('.stay').remove();
}
Dealer.prototype.isBust = function(){
	for(var i = 0; i < this.cards.length; i++){
		this.score += this.cards[i].value;
	}
	if(this.score > 21){
		this.score = 0;
        this.bust = true;
    }
}
Dealer.prototype.hit = function(){
	this.cards.push(this.draw());
	if(this.cards[this.cards.length-1].name === "ace"){
		var ace = Number(prompt("You have an ACE! 1 or 11?"));
		if(ace === 1){
			this.cards[this.cards.length-1].value = 1;
		}
		else{
			this.cards[this.cards.length-1].value = 11;
		}
	}
	this.render();
	this.isBust();
	this.game.dealerRound();

};
Dealer.prototype.stayPut = function(){
	this.stay = true;
	this.game.dealerRound();
}	
function Player(name, twoCards, dealer, game){
	this.game = game;
	this.name = name;
	this.dealer = dealer;
	// this player's cards
	this.cards = twoCards;
	this.bust = false;
	this.stay = false;
	this.twentyOne = false;
	this.div = $("<div>").addClass("col-md-12 text-center");
	// tracks player's score
	this.tracker = 0;
	this.stayStatus = false;
}
Player.prototype.hitOrStay = function(){
	var row3 = $("<div>").addClass("row");
	var row4 = $("<div>").addClass("row");
	var hit = $("<div>").addClass("col-md-2 col-md-offset-5 btn btn-danger hit").html("Hit");
	hit.click((function(){
		this.hit();
	}).bind(this));
	(row3).append(hit);
	var stay = $("<div>").addClass("col-md-2 col-md-offset-5 btn btn-danger stay").html("Stay");
	stay.click((function(){
		this.stayPut();
	}).bind(this));
	$(row4).append(stay);
	$("#game").append(row3, row4);
}
Player.prototype.removeButtons = function(){
	$('.hit').remove();
	$('.stay').remove();
}
Player.prototype.isBust = function(){
	for(var i = 0; i < this.cards.length; i++){
		this.tracker += this.cards[i].value;
	}
	if(this.tracker > 21){
		this.tracker = 0;
        this.bust = true;
    }
}
Player.prototype.hit = function(){
	this.cards.push(this.dealer.draw());
	if(this.cards[this.cards.length-1].name === "ace"){
		var ace = Number(prompt("You have an ACE! 1 or 11?"));
		if(ace === 1){
			this.cards[this.cards.length-1].value = 1;
		}
		else{
			this.cards[this.cards.length-1].value = 11;
		}
	}
	this.render();
	this.isBust();
	this.game.gameTurn();

};
Player.prototype.stayPut = function(){
	this.stay = true;
	this.game.gameTurn();
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

				var ace = Number(prompt("You have an ACE! 1 or 11?"));
				if(ace === 1){
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





