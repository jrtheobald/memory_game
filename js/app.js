// LIST OF CARDS FOR array IN shuffle()
let array = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];

const deck = $('.deck');
const card = $('.card');
const icon = $('.card > i');
const restart = $('.restart');
const stars = $('.stars');
let openCards = [];
let numClickedCards = 0;
let matches = 0;
let clicksPerMatch = Math.floor(numClickedCards / matches);
let numMoves = 0;
let hideTime = 300;

// Shuffle the Cards
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Create the Deck
// Code adapted from http://api.jquery.com/jquery.each/
function makeDeck() {
  icon.removeClass();
  let index = 0;
  icon.each(function () {
    $(this).addClass(array[index]);
    index++;
  });
}

//Count the Number of Mouse Clicks
// Count card clicks
let play = true;

function clickCount(play) {
  if (play) {
    card.click(function () {
      numClickedCards += 1;
      numMoves = Math.floor(numClickedCards / 2);
      starRating();
    });
  }

  return numClickedCards, numMoves;
}

//Open Card and Show Icons, add Icon Class to Array
// Toggle card class open show
function closeCard() {
  card.click(function () {
    $(this).toggleClass('open show');
    openCards.push($(this).children().attr('class'));
    checkMatch();
    win();
  });
}

// Check open cards for a match
function checkMatch() {
  if (openCards.length < 2) {} else {
    if (openCards.length === 2) {
      if (openCards[0] === openCards[1]) {
        $('.card.open.show').addClass('match').removeClass('open');
        lockCard();
        matches++;
      } else {
        hideNoMatch();
      }
      openCards = [];
    }
  }
  updateMoves();
}

function updateMoves() {
  $('.moves').html(numMoves);
}

// Disable click on open cards, i.e. lock
function lockCard() {
  $('.match').click(function () {
    $(this).off("click");
  });
}

// Hide open cards that don't match
function hideNoMatch() {
  setTimeout(function () {
      $('.card.open.show').removeClass('open show');
    },
    hideTime
  );
}

// Demote Star Rating based on metric
let rating = "";

function starRating() {
  if (numClickedCards <= 24) {
    rating = "3 stars";
  } else if (numClickedCards <= 48) {
    rating = "2 stars";
    $('#one-star').hide();
    hideTime = 240;
  } else if (numClickedCards <= 96) {
    rating = "1 star";
    $('#two-star').hide();
    hideTime = 192;
  } else {
    rating = "No stars";
    $('#three-star').hide();
    hideTime = 154;
  }
}

// Start the Timer
let gameSeconds = 0;
let gameMinutes = 0;
let gameHours = 0;

//Adapted from https://codepad.co/snippet/YMYUDYgr
function goTimer() {
  //counts up by minutes and seconds
  gameSeconds++;
  if (gameSeconds >= 60) {
    gameSeconds = 0;
    gameMinutes++;
    if (gameMinutes >= 60) {
      gameMinutes = 0;
      gameHours++;
    }
  }

  if (gameSeconds) {
    if (gameSeconds > 9) {
      gameSeconds = `${gameSeconds}`;
    } else {
      gameSeconds = `0${gameSeconds}`;
    }
  }

  $('#hours').text(gameHours);
  $('#minutes').text(gameMinutes);
  $('#seconds').text(gameSeconds);

  timeOut();
}

// Begin the countdown for goTimer()
function timeOut() {
  gameTimeout = setTimeout(goTimer, 1000);
  return gameTimeout;
}

// Stops the timer
function stopTimer() {
  clearInterval(gameTimeout);
}

// Shows the alert upon winning
function box() {
  alert(`Congratulations! You Won!
  All matches found in ${numMoves} moves and ${gameHours}:${gameMinutes}:${gameSeconds}.
  Your Star Rating is ${rating}.`);
}

// Upon win executes stopTimer and box
function win() {
  if (matches === 8) {
    play = false;
    $('.deck').click(function () {
      $(this).off("click");
    });
    stopTimer();
    box();
  } else {
    $('.deck').click(function () {
      $(this).on("click");
    })
  }
}

function gameRestart() {
  $('#hours').text(00);
  $('#minutes').text(00);
  $('#seconds').text(00);
  updateMoves();
  $('#one-star').show();
  $('#two-star').show();
  $('#three-star').show();
  play = true;
}

function playGame() {
  shuffle(array);
  makeDeck();
  clickCount(play);
  closeCard();
  timeOut();
}

$(document).ready(function () {
  playGame();
  restart.click(function () {
    location.reload();
    gameRestart();
    playGame();
  });
});

//TODO: Find programmatic way to control clickability on open cards
//TODO: Code a different, more customizable style dialog box for the alert
//TODO: Find a way to restart a game without relaoding the page