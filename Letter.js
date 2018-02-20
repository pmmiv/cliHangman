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
			this.guessed = true;
		}
	}
};

module.exports = Letter;