var Letter = require('./Letter.js');
// var guess = process.argv[2];

var Word = function (b){
	// each letter of the word is in this array (wet version)
	this.word = b.split('');
	//each letter obj is in this array
	this.objArray = [];
	//the word inProgress is in this array (this will be printed to the console)
	this.inProg = [];
	this.create = function () {
		for (i=0;i<this.word.length;i++) {
			var snarf = new Letter(this.word[i]);
			this.objArray.push(snarf);
		}
	};
	this.check = function (j) {
		this.inProg = [];
		for (i=0;i<this.objArray.length;i++) {
			this.objArray[i].update(j);
			this.inProg.push(this.objArray[i].hideShow());
			console.log(this.inProg);
		}
	};
}

// var test = new Word("testing");
// test.create();
// test.check(process.argv[2]);
// console.log(test.inProg);
// test.check(process.argv[3]);
// console.log(test.inProg);
// test.check(process.argv[4]);
// console.log(test.inProg);

module.exports = Word;