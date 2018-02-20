var inquirer = require('inquirer');
var fs = require('file-system');
var Word = require('./Word.js');
var bank = [];
var lettersGuessed = [];
var lives = 8;
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

console.log("Welcome to CLI Hangman!\n\rThe theme for this game is stand-up comedy! Every word puzzle is the name of a comedian, or joke.")

inquirer.prompt([
{
	name: "ready",
	message: "Are you ready to begin?",
	type: "confirm"
}
]).then(function (answers) {
	if (answers.ready) {
		bankLoad();
	} else {
		console.log("Well okay. Have fun doing something else.")
	};
});

function bankLoad () {
    fs.readFile("comedyDB.txt", "utf8", function(error, data) {
    	bank = data.split(', ');
    game();
	});
};
	
function game () {
	if (bank.length > 0) {
		lives = 8;
		lettersGuessed = [];
		var randomIndex = Math.floor(Math.random() * Math.floor(bank.length));
		var wordInPlay = new Word(bank[randomIndex]);
		bank.splice(randomIndex, 1);
		wordInPlay.create();
		wordInPlay.check("-");
		wordInPlay.check(" ");
		guessing();
		function guessing () {
			if (wordInPlay.inProg.includes("_") && lives<0) {
				wordInPlay.print();
				inquirer.prompt({
					name: "letterGuess",
					message: "Please guess a letter."
				}).then(function (answer) {
					if (alphabet.includes(answer.letterGuess)) {
						if (lettersGuessed.includes(answer.letterGuess)) {
							console.log("\r\nYou've already guessed "+answer.letterGuess+". Try another letter.")
							guessing();
						} else {
							lettersGuessed.push(answer.letterGuess);
							if (wordInPlay.word.includes(answer.letterGuess)) {
								wordInPlay.check(answer.letterGuess);
								console.log("\r\nYou've guessed "+lettersGuessed.join(', '));
								guessing();
							} else {
								lives--;
								console.log("Nope! You have "+lives+" lives remaining.");
								console.log("\r\nYou've guessed "+lettersGuessed.join(', '));
								console.log(lettersGuessed.join(', '));
								guessing();
							}
						}
					} else {
						console.log("That's not a letter.. Try a letter.")
						guessing();
					}
				})
			} else if (lives<0) {
				console.log("\r\nNice work! You got "+wordInPlay.wordJoined+". On to the next one!")
				game();
			} else {
				console.log("\r\nYou ran out of lives.")
				inquirer.prompt({
						name: "failure",
						message: "You ran out of lives. Want to play again?",
						type: "confirm"
				}).then(function(answers){
					if (answers.failure) {
						reset();
					} else {
						console.log("That's okay. Do what you want.");
					}
				})
			}
		}
	} else {
		inquirer.prompt({
				name: "success",
				message: "You've successfully solved all of the words! Would you like to play again?",
				type: "confirm"
		}).then(function(answers){
			if (answers.success) {
				reset();
			} else {
				console.log("That's okay. Do what you want.");
			}
		})
	}
};

function reset () {
	bankLoad();
}