/* Fields */
const nonMatchingCardTime = 500;
let countMoves = 0;
let indexOpenCard = -1;
let cardObjectList = [];
let modal=null;

/**
* @description Create Card Object
* @param {index} The index of card
* @param {value} The value of css
* @returns {cardObj} Card Object
*/
function Card(index, value) {
	let cardObj = new Object();
	cardObj.index = index
	cardObj.value = value
	cardObj.isRevealed = false
	cardObj.isMatchingCard = false
	cardObj.matchingCard = function() {
		cardObj.isMatchingCard = true
	}
	cardObj.reveal = function() {
		cardObj.isRevealed = true
	}
	cardObj.conceal = function() {
		cardObj.isRevealed = false
	}
	return cardObj
};

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex -= 1
		temporaryValue = array[currentIndex]
		array[currentIndex] = array[randomIndex]
		array[randomIndex] = temporaryValue
	}
	return array
};

function exitsCardOpen(currentValue, index) {
	if (currentValue.isRevealed === true) {
		indexOpenCard = index;
		return true;
	}
}

function machtedCount(value) {
	return value.isMatchingCard === true;
}

function remove(el) {
	el.classList.remove('open', 'show', 'wrong')
}

function hideCard() {
	const childNodes = document.getElementsByTagName('li');
	for (let i = 0; i < childNodes.length; i++) {
		let card = childNodes[i];
		if (childNodes[i].classList.contains('open', 'show')) {
			childNodes[i].classList.add('wrong');
			if (childNodes[i].classList.contains('wrong')) {
				setTimeout(function() {
					remove(card);
				}, 1200);
			}
		}
	}
}

function matchCard() {
	const childNodes = document.getElementsByTagName('li');
	for (let i = 0; i < childNodes.length; i++) {
		if (childNodes[i].classList.contains('open', 'show')) {
			childNodes[i].classList.remove('open', 'show');
			childNodes[i].classList.add('match');
		}
	}
}

function gameScore() {
	countMoves = countMoves + 1;
	document.getElementById('moves').innerText = countMoves;
	if (countMoves === 8 || countMoves === 14 || countMoves === 20) {
		let starts = document.getElementsByClassName('fa', 'fa-star');
		starts[0].classList.remove('fa', 'fa-star');
	}
}

/**
* @description Handle clicking on card
* @param {event} The click event
*/
let handleFlipCard = function(event) {
	event.preventDefault();
	let cardObject = cardObjectList[this.index - 3];
	if (cardObject.isMatchingCard === true) {
		return
	}
	cardObjectList.forEach(exitsCardOpen);
	const cardsEle = document.getElementById('memorycards');
	let openCard = cardsEle.getElementsByClassName('open', 'show');
	if (openCard.length < 2) {
		let cardCurrent = document.getElementsByTagName('li')[this.index]
		cardCurrent.classList.add('open', 'show')
		cardObject.reveal();
		if (indexOpenCard !== -1 && openCard.length === 2) {
			let previousOpen = cardObjectList[indexOpenCard]
			if (previousOpen.value === cardObject.value) {
				matchCard()
				previousOpen.matchingCard();
				cardObject.matchingCard();
				previousOpen.conceal();
				cardObject.conceal();
			} else {
				setTimeout(function() {
					hideCard();
					previousOpen.conceal();
					cardObject.conceal();
				}.bind(status), nonMatchingCardTime);
			}
			indexOpenCard = -1;
			/* Game Score*/
			gameScore();
			/* Validate memory game winning*/
			const matchCards = cardObjectList.filter(machtedCount);
			if (matchCards.length === 16) {
				startClock();
				const span = document.getElementsByClassName("close")[0];
				const btn = document.getElementById("btnAgain");
				const starlist =document.getElementById("stars"); 
				const stars = starlist.getElementsByClassName('fa-star').length;
				document.getElementById("movesCount").innerText = countMoves;
				document.getElementById("starsCount").innerText = stars;
				document.getElementById("elapsedTime").innerText = document.getElementById('crono').innerHTML;
				modal = document.getElementById('myModal');
				modal.style.display = "block";
				span.onclick = function() {
					modal.style.display = "none";
				}
				btn.onclick = function() {
					resetGame();
					modal.style.display = "none";
				}
			}
		}
	}
};

// Build single card
const buildCardNode = function(index, card) {
	let flipContainer = document.createElement('li')
	let flipper = document.createElement('i')
	flipContainer.index = index + 3
	flipContainer.classList.add('card') 
	flipper.classList.add('fa', card.value)
	flipContainer.appendChild(flipper)
	flipContainer.addEventListener('click', handleFlipCard)
	return flipContainer
};
// Build cards list
const createCards = function() {
	const cardList = ['fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-bomb']
	let cards = []
	let count = 0
	const maxValue = 8
	while (count < maxValue) {
		cards[2 * count] = new Card(count + 1, cardList[count])
		cards[2 * count + 1] = new Card(count + 1, cardList[count])
		count++
	}
	cardObjectList = shuffle(cards);
	return cardObjectList
};

function buildCardNodes() {
	const memoryCards = document.getElementById('memorycards');
	const cards = createCards();
	for (let i = 0; i < 16; i++) {
		const newLiElement = buildCardNode(i, cards[i]);
		memoryCards.appendChild(newLiElement);
	}
	startClock();
}
/* Reset Game */
function resetGame() {
	timeout = 0;
	indexOpenCard = -1;
	countMoves = 0;
	let cards = document.getElementById("memorycards");
	while (cards.hasChildNodes()) {
		cards.removeChild(cards.firstChild);
	}
	const stars = document.getElementsByTagName('i');
	for (let i = 0; i < stars.length; i++) {
		stars[i].classList.toggle('fa', true);
		stars[i].classList.toggle('fa-star', true);
	}
	document.getElementById('moves').innerText = countMoves;
	if (cardObjectList.length > 0) {
		cardObjectList = [];
	}
	buildCardNodes();
}
/* Cronometer*/
let init = 0;
let timeout = 0;

function startClock() {
	if (timeout == 0) {
		init = new Date().getTime();
		working();
	} else {
		clearTimeout(timeout);
		timeout = 0;
	}
}

function working() {
	const current = new Date().getTime();
	let diff = new Date(current - init);
	let result = LeadingZero(diff.getUTCHours()) + ":" + LeadingZero(diff.getUTCMinutes()) + ":" + LeadingZero(diff.getUTCSeconds());
	document.getElementById('crono').innerHTML = result;
	timeout = setTimeout("working()", 1000);
}

function LeadingZero(Time) {
	return (Time < 10) ? "0" + Time : +Time;
}
window.addEventListener("load", buildCardNodes)
document.getElementById("reset").onclick = resetGame;
window.onclick = function(event) {
	if (modal !== null) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	 }
}
