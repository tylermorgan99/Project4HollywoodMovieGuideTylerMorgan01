
/**
 * @author Morgan, Tyler (morgant@student.ncmich.edu)
 * @version 1
 * @summary Tyler Morgan's Project 4 || created: 11.27.2017
 */

/** This is the pragma and library call section of the program*/
"use strict";
const PROMPT = require('readline-sync');

/** This is the global factor section of the program*/
let rating,moviePosition; //sets rating and moviePosition as variables
let currentMovieTitle, continueResponse, askForRating, openingMenu, existingMovieList; //sets currentMovieTitle, continueResponse, askForRating, openingMenu, and existingMovieList as variables
let allMovieTitles = ["Starman", "Flying Guy", "Singing Bird", "Jumping Child"]; //creates a array that stores movie titles
let movies = [ //creates a multidimensional array representing the movie titles, average rating, total of previous user ratings, and number of previous user ratings
    ["Starman", 3, 0, 0],
    ["Flying Guy", 3, 0, 0],
    ["Singing Bird", 3, 0, 0],
    ["Jumping Child", 3, 0, 0]
    ];
let newReviewArray = [];
const MIN_RATING = 1, MAX_RATING = 5; //sets MIN_RATING and MAX_RATING as global factors

/** This section contains the dispatch method of the program*/
function main () { //declares main as the dispatch method
    process.stdout.write('\x1Bc'); //Clears the screen
    if (continueResponse == null) { //program begins here as continueResponse starts with a null value
        setContinueResponse(); //runs continueResponse function
        setOpeningMenu();
    }
    if (continueResponse === 0) {
        setPrintGoodbye();
    }
    if (continueResponse === 1) { //if the user accepts the prompt to continue responding or if it's the first loop, the rating function begins
        setAskForRating();
        setDisplayMovieList();
        setContinueResponse();
        return main();
    }
}

/** This is the mutator and utility section of the program*/
main(); //main function calls to the following section

function setContinueResponse() { //the setContinueResponse function prompts the user if they want to continue responding after their first rating
    if (continueResponse === 1) {
        continueResponse = Number(PROMPT.question(`\nDo you want to continue? (1=yes, 0=no): `));
        if (continueResponse !== 0 && continueResponse !== 1) {
            console.log(`${continueResponse} is an incorrect value. Please try again.`);
            continueResponse = 1;
            setContinueResponse();
        }
    }
    else {
        continueResponse = 1;
    }
}

function setOpeningMenu() { //The opening text of the program
    openingMenu = PROMPT.question(`\nWelcome to the Hollywood Movie Rating Guide! Please enter anything to continue: `)
}


function setAskForRating() { //Prompts the user for whether they want to view previous ratings or add new ones
    askForRating=0;
    while (askForRating < 1 || askForRating > 2 || typeof askForRating === 'undefined' || isNaN(askForRating)) {
        askForRating = Number(PROMPT.question(`\nWould you like to view previous user ratings, or enter your own? [1 = previous ratings, 2 = enter new ratings]: `));
    }
}

function setDisplayMovieList() { //Depending on askForRating value, will display a list of movies to view reviews from or add reviews to
    existingMovieList = 0;
    if (askForRating === 1) {
        currentMovieTitle = PROMPT.question(`\nPlease select the movie which you would like to view the reviews for:
            ${allMovieTitles}
            `);
        if (allMovieTitles.includes(currentMovieTitle)) {
            setViewReviews();
        } else {
            process.stdout.write('\x1Bc');
            console.log(`"${currentMovieTitle}" is not an eligible movie to view the reviews for. Please try again!`);
            setDisplayMovieList();
        }
    }
    if (askForRating === 2) {
        currentMovieTitle = PROMPT.question(`\nPlease select the movie you wish to review from the following list by entering its full name, or by entering a new one:
        ${allMovieTitles}
        `);
        if (allMovieTitles.includes((currentMovieTitle))) {
            existingMovieList=1;
        }
        setAddNewReviews();
    }
}

function setViewReviews() { //Views the previous reviews of movies
    moviePosition = allMovieTitles.indexOf(currentMovieTitle);
    if (movies[moviePosition][3] === 0) { //Movies entered in advance have a set value before other user entries are put into the system
            PROMPT.question(`\nThe average rating for the movie ${currentMovieTitle} is ${movies[moviePosition][1]}. Please enter anything to return to the selection menu.`);
    }   else { //Displays rating average of movie chosen by user that is determined by the average of previous user entries
            movies[moviePosition][1] = movies[moviePosition][2] / movies [moviePosition][3];
            console.log(`\nThe average rating for the movie ${currentMovieTitle} is ${movies[moviePosition][1]}. Please enter anything to return to the selection menu.`);
    }
}

function setAddNewReviews() { //Allows the user to add new reviews to movies in the system, or to a new movie
    rating = 'q';
    if (existingMovieList === 1) { //Adds new information to movies in the system
        while (rating === 'undefined' || isNaN(rating) || rating < MIN_RATING || rating > MAX_RATING) {
            rating = Number(PROMPT.question(`Please enter the amount of stars between 1 and 5 that you'd like to give the movie "${currentMovieTitle}": `));
        }
        moviePosition = allMovieTitles.indexOf(currentMovieTitle);
        (movies[moviePosition][2]) += rating;
        (movies[moviePosition][3]) += 1;
        console.log(`\nYou gave the movie "${currentMovieTitle}" ${rating} stars!`)
    }   else { //Creates a new movie in the system and pushes it to the main movie list
          newReviewArray [0] = currentMovieTitle;
          allMovieTitles.push(currentMovieTitle);
          while (rating === 'undefined' || isNaN(rating) || rating < MIN_RATING || rating > MAX_RATING) {
              rating = Number(PROMPT.question(`Please enter the amount of stars between 1 and 5 that you'd like to give the movie "${currentMovieTitle}": `));
          }
          newReviewArray [2] = rating;
          newReviewArray [3] = 1;
          movies.push(newReviewArray);
          console.log(`\nYou gave the movie "${currentMovieTitle}" ${rating} stars!`)
    }
}

function setPrintGoodbye() { //Prints goodbye to the user if they choose to not continue responding
    console.log(`\nGoodbye.`)
}

/*
This program is designed to prompt the user for whether they want to rate movies, or look at previous ratings. All previous ratings are stored,
and users are allowed to add new movies into the system.
 */