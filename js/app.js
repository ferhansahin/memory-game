/*
 * Create a list that holds all of your cards
 */

const	cards 	= [...document.getElementsByClassName("card")],
			mCount 	= document.getElementsByClassName("matched"),
			restart	= document.querySelector(".score-panel .restart"),
			deck 		= document.querySelector(".deck");

let		match 	= [];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


function init() {

	// shuffle cards
	const shuffled = shuffle(cards);

	// clear html
	deck.innerHTML = "";

  // add html to page
	shuffled.forEach (elem => {
	  deck.appendChild(elem);

	  // remove all other class names but card
		elem.classList.remove("flipped", "matched", "blocked");

    // add event listeners on every card
		elem.addEventListener("click", flipCard);
		elem.addEventListener("click", matchTest);
	});

	// listener for restart btn
	restart.addEventListener("click", reload);
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// to display card symbol add flipped and blocked class to cards
function flipCard() {

  this.classList.toggle("flipped");
  this.classList.toggle("blocked");
};


// add flipped cards to [] and check if cards are matched or not
function matchTest() {

	// add clicked card to match array
  match.push(this);

  // if there's 2 cards, block all deck
  const flipped = match.length;
  if (flipped === 2) {
  	deck.classList.add("blocked");

		// check cards for match
  	if (match[0].innerHTML === match[1].innerHTML) {
  		matched();
	  } else {
	  	unmatched();
	  }
	}
};


// short delay when cards don't match
function unmatched() {

	setTimeout(function() {
	  match[0].classList.remove("flipped", "blocked");
		match[1].classList.remove("flipped", "blocked");

		// remove block from deck
		deck.classList.remove("blocked");

		// empty match
		match = [];

		// delay
	},300);
}


// when cards match add matched class
function matched() {

  match[0].classList.add("matched");
  match[1].classList.add("matched");

  // remove block from deck
  deck.classList.remove("blocked");

  // empty match
  match = [];

  // when all pairs matched, write to console
  if (mCount.length === 16) {
  	console.log("All paired!");
  }
}

// restart button
function reload() {

	init();
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


init();