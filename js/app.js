/*
 * Create a list that holds all of your cards
 */

// LIST OF CARDS FOR array IN shuffle()
let array = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor',  'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];

let deck = $('.deck');
let card = $('.card');
//let diamond = $('.fa-diamond'); // this does not work, idky
paperPlane = $('.fa-paper-plane-o');
anchor = $('.fa-anchor');
bolt = $('.fa-bolt');
cube = $('.fa-cube');
leaf = $('.fa-leaf');
bicycle = $('.fa-bicycle');
bomb = $('.fa-bomb');
icon = $('.card > i');
restart = $('.restart');
let openCards = [];
let numClickedCards = 0;
let matches = 0;


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;

} // close of shuffle()
console.log(array); //test
console.log(shuffle(array)); //test
/********************************************************************
*  Create the Deck
*
********************************************************************
/
/* 1. Remove old class
 * 2. Add new class from array
 */
// Code adapted from http://api.jquery.com/jquery.each/
function makeDeck() {
  icon.removeClass();
  let index = 0;
  icon.each(function() {
    $(this).addClass(array[index]);
    index ++;
  });
} // close of makeDeck

makeDeck();
////////////////////////////////////////////////////////////////////

// TODO: CREATE LIST FOR OPEN CARDS (HOLD)
// TODO: WRITE A LOOP TO ITERATE THROUGH array (HOLD)
// TODO: CHECK LIST FOR MATCHING CARDS
// TODO: TURN ONLY TWO CARDS (Current)

/********************************************************************
*  Count the Number of Mouse Clicks
*
********************************************************************/


// Count card clicks
function clickCount() {
  card.click(function() {
    numClickedCards += 1;
    console.log("clicks: " + numClickedCards);
  });
  return numClickedCards;
} // close of clickCount
clickCount();
////////////////////////////////////////////////////////////////////

/********************************************************************
*  Open Card and Show Icons, add Icon Class to Array
*
********************************************************************/

// const openCard = $(this).toggleClass('open show'); // this does not work, idky

// Toggle card class open show
function closeCard() {

  card.click(function() {
    $(this).toggleClass('open show');
    openCards.push($(this).children().attr('class'));
    checkMatch();
  });
} // close of closeCard, consider renaming this function

closeCard();
////////////////////////////////////////////////////////////////////

function checkMatch() {
  if (openCards.length < 2) {
    console.log("no cards open");
  } else {
    if (openCards.length === 2) {
      if (openCards[0] === openCards[1]) {
        console.log("match");
        $('.card.open.show').addClass('match').removeClass('open');
        lockCard();
        matches ++;
        console.log("Number of matches:" + matches);
      } else {
        console.log("try again");
        hideNoMatch();
      }
      openCards = [];
    }
  }
} // close of checkMatch

function lockCard() {
  $('.match').click(function() {
    $(this).off("click");
  });
}

function hideNoMatch() {
    setTimeout(function() {
      $('.card.open.show').removeClass('open show');
    },
    300
  );
}

function goTimer(){
  let today = new Date();
  let timerHours = today.getHours();
  let timerMinutes = today.getMinutes();
  let timerSeconds = today.getSeconds();
  let totalSeconds = 0;
  if(timerSeconds < 10){
    timerSeconds = "0" + timerSeconds;
  }

  $("#hours").text(timerHours);
  $("#minutes").text(timerMinutes);
  $("#seconds").text(timerSeconds);
  setTimeout(function() {
    totalSeconds++;
    goTimer()
  }, 250);
}

goTimer();


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
