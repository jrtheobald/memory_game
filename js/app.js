$(document).ready(function() {});


// master
// LIST OF CARDS FOR array IN shuffle()
let array = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor',  'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];

const deck = $('.deck');
const card = $('.card');
const icon = $('.card > i');
const restart = $('.restart');
let openCards = [];
let numClickedCards = 0;
let matches = 0;
let clicksPerMatch = Math.floor(numClickedCards / matches);
let numMoves = 0;
let hideTime = 300;
//let win = false;
//let gameTimeBegin = new Date();

// Shuffle the Cards
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
//console.log(shuffle(array)); //test

// Create the Deck
// Code adapted from http://api.jquery.com/jquery.each/
function makeDeck() {
  icon.removeClass();
  let index = 0;
  icon.each(function() {
    $(this).addClass(array[index]);
    index ++;
  });
} // close of makeDeck

//makeDeck();


//Count the Number of Mouse Clicks
// Count card clicks
let play = true;
function clickCount(play) {
  if (play) {
    card.click(function() {
      numClickedCards += 1;
      numMoves = Math.floor(numClickedCards / 2);
      console.log("clicks: " + numClickedCards);
      starRating();  // this runs on every click?
    });
  }

  return numClickedCards, numMoves;
} // close of clickCount
//clickCount(play);



//Open Card and Show Icons, add Icon Class to Array
// Toggle card class open show
function closeCard() {
  card.click(function() {
    $(this).toggleClass('open show');
    openCards.push($(this).children().attr('class'));
    checkMatch();
    win();
  });
} // close of closeCard, consider renaming this function

//closeCard();

// Check open cards for a match
function checkMatch() {
  console.log("checking for match")
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
  updateMoves();
  //win();
} // close of checkMatch

function updateMoves() {
  $('.moves').html(numMoves);
}



// Disable click on open cards, i.e. lock
function lockCard() {
  $('.match').click(function() {
    $(this).off("click");
  });
}

// Hide open cards that don't match
function hideNoMatch() {
    setTimeout(function() {
      $('.card.open.show').removeClass('open show');
    },
    hideTime
  );
}


// Demote Star Rating based on metric
function starRating() {
  console.log('acquiring star rating');
  if (numClickedCards <= 24) {
    console.log("You rate three stars");
    //$('.star').show();
  } else if (numClickedCards <= 48) {
    console.log("You rate two stars");
    $('#one-star').remove();
    hideTime = 240;
  } else if (numClickedCards <= 96){
    console.log("You rate one star");
    $('#two-star').remove();
    hideTime = 192;
  } else {
    console.log("You rate no stars");
    $('#three-star').remove();
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
  console.log("seconds: " + gameSeconds);
  if (gameSeconds >= 60) {
    gameSeconds = 0;
    gameMinutes++;
    console.log("minutes: " + gameMinutes);
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
//timeOut();

// Stops the timer
function stopTimer() {
    clearInterval(gameTimeout);
}

// Shows the alert upon winning
function box() {

  alert(`Congratulations! You Won!
  All matches found in ${numMoves} moves and ${gameHours}:${gameMinutes}:${gameSeconds}`);


}

// Upon win executes stopTimer and box
function win() {
  // stop Timer
  if (matches === 8) {
    play = false;
    $('.deck').click(function() {
      $(this).off("click");
    });
    stopTimer();
    box();
    //makeDeck();
  }
  // execute modal with information


}

function gameRestart() {
  restart.click(function() {
    icon.toggleClass('open show');
  });
}

function playGame() {
  shuffle(array);
  makeDeck();
  clickCount(play);
  closeCard();
  timeOut();
}

$(document).ready(function() {
  playGame();
});



// TODO: Set up clear timeout function to execute upon win
// TODO: Add an alert to notify of win
// TODO: Set up win function to stop timer and show modal
// TODO: Add click listener to reset button

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
