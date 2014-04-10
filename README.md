##2048-GameCenter
================

###Created by Jacob Rosenberg
-----------------------------

Tufts Comp20 Assignment 4, due 4-10-14

To my knowledge, all aspects are correctly implemented, including:
 * / - splash page
 * /scores.json - GET scores for some username (from query)
 * /submit.json - POST username, score, and grid, add timestamp, and put into Mongo Database

This application uses Node.js, MongoDB, and is hosted on Heroku, at http://mighty-chamber-7267.herokuapp.com

Collaborated with: none

Time Spent: ~3 hours

----------------------------------

In the __2048__ Game: The score and grid are stored in the Game_Manager object.

__Modifications:__ In _game\_manager.js_, a post request is sent with `this.score` and `this.grid` to the submit page.  This is added around line 200, right after `this.over` is set to `true`.  Also, in index.html, a link to jquery was added.

It would also be quite easy to add a place on the page to put the global high score, which could be retrieved through a get request to scores.json.  I did not implement this.