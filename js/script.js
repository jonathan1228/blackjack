function Game(){
	this.numberOfPlayers = prompt("How many players?");
	this.players = [];
	this.deck = new Deck();
	var name = "";
	
	
	//initialize game

	this.gameStart = function(){
		// initialize each player with their own name and 2 cards.
		for(var i = 0; i < this.numberOfPlayers; i++){
			name = prompt("What is your name?");
			players[i] = new Players(name, this.deck.deal());
		};
	}
}
function Player(name, cards){
	// associate each instance of the class to the name of the player
	this.name = name;
	//cards belong to this instance of the player
	this.cards = [];
	this.cards.push(cards);
	this.tracker;
	//has its own methods of hit and stay.
	// can call the hit method if the player decides to
	
	this.hit = function(){
		for(var i = 0; i < cards.length; i++){
			tracker += this.cards.value;
		}
		if(tracker < 21){
			this.cards.push(Dealer.draw());
		}
	};

	this.stay = function(){
		Game.next();
	}


	
}
function Deck(){
	//create an array
	// all of it's elements should be instances of the Card class
	this.suits = ["Spade", "Diamond", "Clubs", "Heart"];
	this.names = ["Ace",2,3,4,5,6,7,8,9,10,"Jack","Queen","King"];
	var cards = [];
	var shuffled = [];
	for(var i = 0; i < this.suits.length; i++){
		
		for(var j = 0; j < this.names.length; j++){
			cards.push(new Card(this.suits[i], this.names[j], j+1));
		}

	}

	// two arrays
	// one for suits
	// one for values
	shuffled = _.shuffle(cards);
	for(var i = 0; i < cards.length; i++){
		
		console.log(shuffled[i]);

	}
	console.log(shuffled[5].value + " " + shuffled[5].name + " " + shuffled[5].suit)
	return shuffled;
	
}
function Card(suit,name,value){
	this.suit = suit;
	this.name = name;
	this.value = value;
	
}

new Deck();