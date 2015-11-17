
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
	// for(var i = 0; i < cards.length; i++){
		
	// 	console.log(shuffled[i]);

	// }
	// console.log(shuffled[5].value + " " + shuffled[5].name + " " + shuffled[5].suit)
	return shuffled;
	
}
function Card(suit,name, value){
	this.suit = suit;
	this.name = name;
	this.value = value;
	
}

new Deck();