const	cards 	= [...document.getElementsByClassName("card")],
			deck 		= document.querySelector(".deck"),
			mCount 	= document.getElementsByClassName("matched"),
			restart	= document.querySelector(".score-panel .restart"),
			moves		= document.querySelector(".moves"),
			star1		= document.getElementById("star1"),
			star2		= document.getElementById("star2"),
			star3		= document.getElementById("star3"),
			end			= document.getElementById("overlay"),
			mMove	 	= document.getElementById("totalMove"),
			mStar  	= document.getElementById("totalStar"),
			stars		= document.querySelector(".stars");

let		match 	= [],
			move 		= 0;


function init() {

	// reset all
	star1.style.visibility = "visible";
	star2.style.visibility = "visible";
	star3.style.visibility = "visible";
	moves.innerHTML = 0;

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
  	count();
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
  	overlay();
  }
}

// restart button
function reload() {

	// clean stars from overlay
	mStar.innerHTML = "";

	// reset move
	move = 0;

	init();
}


// count moves and display stars
function count() {

  move++;
  moves.innerHTML = move;

  // more move = less stars
  if (move === 22) {
  	star3.style.visibility = "hidden";
  } else if (move === 27) {
    star2.style.visibility = "hidden";
  } else if (move === 29) {
  	star1.style.visibility = "hidden";
  }
}


// modal from https://raventools.com/blog/create-a-modal-dialog-using-css-and-javascript/
function overlay() {

	// display moves and stars
 	mMove.innerText = moves.innerText;
 	mStar.innerHTML = stars.innerHTML;

	end.style.visibility = (end.style.visibility == "visible") ? "hidden" : "visible";
}


init();