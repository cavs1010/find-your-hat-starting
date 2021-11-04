const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
	constructor (pField){
		this._pField = pField; //The field created
		this._currentGameState = true; //Initial state of the game
		this._xPosition = 0; //Initial x position
		this._yPosition = 0; //Initial y position
		this._xSize = this._pField[0].length; //SIze of the field in the x axis
		this._ySize = this._pField.length; //Size of the field in the y axis
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

	//Function that prints the current field
	printField(field){
		field.forEach(element=> console.log(element.join('')));
	}

	//Function that calculates the new position
	calculatePosition (movement) {
		switch(movement){
			case 'u':
				this._yPosition -= 1;
				break;
			case 'd':
				this._yPosition += 1;
				break;
			case 'l':
				this._xPosition -= 1;
				break;
			default:
				this._xPosition += 1;
		}
	}

	//Start the game
	startGame(){
		while(this._currentGameState){
			try{
				this._pField.forEach(element=> console.log(element.join('')));
				var movement = prompt('Which way? ');
				movement = movement.toLowerCase();
				// Getting the direction to move
				if (movement != 'u' && movement != 'd' && movement != 'l' && movement != 'r'){
					throw Error(movement+ ' is not a valid input');
				} else{
						this._pField[this._yPosition][this._xPosition] = "*";
						this.calculatePosition(movement);
						if (this._xPosition>=this._xSize || this._xPosition<0 || this._yPosition>=this._ySize || this._yPosition<0){
							console.log('the game is over');
							this._currentGameState = false;
						}else if(this._pField[this._yPosition][this._xPosition]=='O'){
							console.log('You fell in the hole :(')
							this._currentGameState = false;
						}else if(this._pField[this._yPosition][this._xPosition]=='^'){
							console.log('You find the Hat!!')
							this._currentGameState = false;
						}
						else{
							this._pField[this._yPosition][this._xPosition] = "\x1b[36m*\x1b[0m";
						}
					}
				}
			   catch(e){
					this._currentGameState = false;
				  console.log(e);
				  }
		  }
	}
}

const myField = new Field([
	["\x1b[36m*\x1b[0m", '░', 'O'],
	['░', 'O', '░'],
	['░', '^', '░'],
  ]);
myField.startGame();
  
  // Creation of the initial field
  let newField = []
  function generateField(width, height){
	
	  for (let i = 0; i < height; i++){
		  newField[i] = [];
		  for (let j = 0; j < width; j++){
			newField[i][j] = fieldCharacter
		  }
	  }
  }


var width = 4 //Width of the field
var height = 4 //Height of the field
var required_positions = 5 //Number of required position in the field
var look_random = true //Keep looking for random values
var positions_secured = []; //Array of positions already used


// Function required for finding the array inide arrays
Array.prototype.containsArray = function(val) {
    var hash = {};
    for(var i=0; i<this.length; i++) {
        hash[this[i]] = i;
    }
    return hash.hasOwnProperty(val);
}

//Creation of the fields
while (look_random)
  	if (positions_secured.length<required_positions){
		var ran_x_pos = Math.floor(Math.random() * width);
		var ran_y_pos = Math.floor(Math.random() * height);
		var single_position = []; //Single position to create
		single_position.push(ran_x_pos);
		single_position.push(ran_y_pos);
		if(!positions_secured.containsArray(single_position)){
			positions_secured.push(single_position);
		}
	  } 
	else{
		look_random = false;
	  };

generateField(4,4);

newField[positions_secured[0][0]][positions_secured[0][1]] = '\x1b[36m*\x1b[0m';
newField[positions_secured[1][0]][positions_secured[1][1]] = '^';
for (let i = 2; i<required_positions; i++){
	newField[positions_secured[i][0]][positions_secured[i][1]] = 'O';
}

//newField.forEach(element=> console.log(element.join('')));
