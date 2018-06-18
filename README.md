# Memory Game Project

## Table of Contents

* [Instructions](#instructions)
* [Contributing](#contributing)
* [Gameplay](#gameplay)
* [Bugs](#bugs)
* [Resources](#resources)
* [Dependencies](#dependencies)

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Memory Game project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the [Udacity Classroom](https://classroom.udacity.com/me).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

## Gameplay

Upon page load the timer will begin counting up from zero.  Begin selecting card pairs.  Clicked cards will reveal the icon.  If a match is made then the icons revealed remain displayed.  If the pair do not match then the icons are hidden again.  Each pair of clicks is counted as one move.  The star rating demotes as the number of clicks (and moves) increases. The star rating demotes at the following rates:

* 3 stars: 12 moves or less to win
* 2 stars: 13 to 24 moves to win
* 1 star: 14 to 48 moves to win
* No stars: More than 48 moves to win

As each star rating demotion occurs, the icons are revealed for shorter periods of time and will hide icons quicker on non-matched pairs.  Once 8 matches are made the game is complete, and the timer stops.

Click the restart button to begin a new game.

## Bugs

The final selection of cards is always a match if all other pairs are matched. The first selected card of the final pair will show its icon.  The second selected card will not show the icon until after the player is alerted to game completion.

## Resources

Starter code provided by Udacity.

[Card Shuffle](http://stackoverflow.com/a/2450976 "Card shuffle")

[jQuery .each()](http://api.jquery.com/jquery.each/ "jQuery .each()")

[Timer](https://codepad.co/snippet/YMYUDYgr "Timer")

## Dependencies

[Font Awesome](https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css "Font Awesome")

[Google Fonts](https://fonts.googleapis.com/css?family=Coda "Google Fonts Coda")

[jQuery](http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js "jQuery")