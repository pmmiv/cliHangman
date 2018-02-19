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
	//uses fs to read a .txt db and split the entries into the bank array.
    fs.readFile("comedyDB.txt", "utf8", function(error, data) {
    	bank = data.split(', ');
    game();
	});
};
	
function game () {
	// uses a recursive loop for each word in the word bank
	if (bank.length > 0) {
		lives = 8;
		lettersGuessed = [];
		//select a random word from the bank
		var randomIndex = Math.floor(Math.random() * Math.floor(bank.length));
		var wordInPlay = new Word(bank[randomIndex]);
		wordInPlay.create();
		wordInPlay.check("-");
		// console.log(wordInPlay.inProg)
		//probably uses a recursive loop with inquirer prompts until the word is solved.
		guessing();
		function guessing () {
			if (wordInPlay.inProg.includes("_")) {
				inquirer.prompt({
					name: "letterGuess",
					message: "Please guess a letter."
				}).then(function (answer) {
					if (alphabet.includes(answer.letterGuess)) {
						wordInPlay.check(answer.letterGuess);
						guessing();
					} else {
						guessing();
					}
				})
			} else {
				console.log("Nice work! On to the next one!")
				game();
			}
		}
	} else {
		inquirer.prompt([
			{
				name: "success",
				message: "You've successfully solved all of the words! Would you like to play again?",
				type: "confirm"
			}.then(function(answers){
				if (answers.success) {
					reset();
				} else {
					console.log("That's okay. Do what you want.");
				}
			})
		])
	}
};

function reset () {
	bankLoad();
}