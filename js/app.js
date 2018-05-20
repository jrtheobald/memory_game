/*
 * Create a list that holds all of your cards
 */

// LIST OF CARDS FOR array IN shuffle()
let array = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor',  'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];

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
console.log(array);
console.log(shuffle(array));


deck = $('.deck');
card = $('.card');
diamond = $('.fa-diamond');
paperPlane = $('.fa-paper-plane-o');
anchor = $('.fa-anchor');
bolt = $('.fa-bolt');
cube = $('.fa-cube');
leaf = $('.fa-leaf');
bicycle = $('.fa-bicycle');
bomb = $('.fa-bomb');
icon = $('.card > i');
restart = $('.restart');

// TODO: CREATE jQUERY OBJECTS ADD SHUFFLED CARDS TO HTML (DONE)
// TODO: WRITE A LOOP TO ITERATE THROUGH array (HOLD)
// TODO: LOOP THROUGH CARDS WITH each, REMOVE CLASS (DONE)
// TODO: ADD FUNCTIONALITY TO LOOP TO CREATE AND ADD HTML (DELETE)
// TODO: CREATE FOR LOOP TO INDEX OVER array AND ADD CLASS (DONE)
// TODO: PUT DECK-CARD-CLASS INTO FUNCTION (DONE)

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
}

makeDeck();

// TODO: CREATE FUNCTION TO OPEN CARD (DONE)
function open() {
  card.addClass("open show");
} // this adds open and show to all cards

// TODO: SET UP EVENT LISTENER FOR CARD CLICK (DONE)
card.click(function() {
  $(this).addClass("open show");
  let open_cards = [];
  let class_name = $(this).children().attr("class");
  open_cards.push(class_name);
  console.log(class_name);
  console.log(open_cards);
});

// TODO: CREATE LIST FOR OPEN CARDS (Current)


// TODO: CHECK LIST FOR MATCHING CARDS

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
