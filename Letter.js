var Letter = function (letter){
	this.character = letter;
	this.guessed = false;
	this.hideShow = function () {
		if (this.guessed) {
			return this.character;
		} else {
			return "_"
		}
	};
	this.update = function (guess) {
		if (guess == this.character) {
			console.log("Correct!")
			this.guessed = true;
		}
	}
};


//******TEST ZONE*********
// var chips = process.argv[2];
// var test = new Letter("w");
// console.log(test);
// console.log(test.hideShow(chips));

module.exports = Letter;