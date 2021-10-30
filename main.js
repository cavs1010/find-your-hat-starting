const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
	constructor (pField){
		this._pField = pField; //The field created
		this._playerLocation = [0,0] // Initial position of the player
		this._currentGameState = true;
	}
	get pField(){
		return this._pField;
	}
	get currentGameState(){
		return this._currentGameState;
	}
	get playerLocation(){
		return this._playerLocation;
	}
	set currentGameState(newState){
		this._currentGameState = newState;
	}
}

const myField = new Field([
	['*', '░', 'O'],
	['░', 'O', '░'],
	['░', '^', '░'],
  ]);


  var currentPosition = [0,0];
  var xPosition = currentPosition[0];
  var yPosition = currentPosition[1];
  var xSize =myField.pField[0].length;
  var ySize = myField.pField.length;



  while(myField.currentGameState){
	try{
		printField(myField._pField);
		var movement = prompt('Which way? ');
		movement = movement.toLowerCase();
		// Getting the direction to move
		if (movement != 'u' && movement != 'd' && movement != 'l' && movement != 'r'){
			throw Error(movement+ 'is not a valid input');
			myField.currentGameState = false;
		} else{
				calculatePosition(movement);
				console.log('The current position in x is '+ xPosition + ' and in y is '+ yPosition);
				if (xPosition>=xSize || xPosition<0 || yPosition>=ySize || yPosition<0){
					console.log('the game is over');
					myField.currentGameState = false;
				}else if(myField._pField[yPosition][xPosition]=='O'){
					console.log('You fell in the hole :(')
					myField.currentGameState = false;
				}else if(myField._pField[yPosition][xPosition]=='^'){
					console.log('You find the Hat!!')
					myField.currentGameState = false;
				}
				else{
					myField._pField[yPosition][xPosition] = '*';
				}
			}
		}
	   catch(e){
		  console.log('error');
		  myField.currentGameState = false;
		  }
  }
 
 
//Function that prints the current field
function printField(field){
	field.forEach(element=> console.log(element.join('')));
}

// Function that calculates the new position based on the movement
function calculatePosition (movement) {
	switch(movement){
		case 'u':
			yPosition -= 1;
			break;
		case 'd':
			yPosition += 1;
			break;
		case 'l':
			xPosition -= 1;
			break;
		default:
			xPosition += 1;
	}
}