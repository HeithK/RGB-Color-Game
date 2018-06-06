var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square"); //Selects all elements with class square and create a node list
var colorDisplay = document.querySelector("#colorDisplay"); //Selects the first element with id colordisplay
var messageDisplay = document.querySelector("#message"); //Selects first element found with id message
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset"); 
var modeButtons = document.querySelectorAll(".mode"); //Select all elements with class mode

init();

function init(){
	setUpModeButtons();
	setupSquares();	
	reset();
}

function setUpModeButtons(){
	for(var i = 0; i<modeButtons.length; i++){ //modeButtons is equal to the number of elements selected, allowing for additional difficulties to be added at a later date
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected"); //remove the selected class from the first element in the node list
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected"); //add the class selected to the element clicked by the user
			if(this.textContent === "Easy"){ //If the text content of the element selected is Easy, set var numsquares to 3
				numSquares = 3;
			}
			else {
				numSquares = 6;
			}
			reset(); //this numsquares var that was changed will be used in reset
			
		});
	}
}

function setupSquares(){
	for(var i = 0; i<squares.length; i++){
		//add click listeners to squares
			squares[i].addEventListener("click", function(){
		//grab color of clicked square
			var clickedColor = this.style.backgroundColor;
		//compare color to pickedColor
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "Great Job!"
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
				resetButton.textContent = "Play Again?";
			} 	else{
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Incorrect. Try Again!"
			}
		});
	}
}

function reset(){
	colors = generateRandomColors(numSquares); //pass numSquares var declared in setModeButtons to determine the number of squares and colors of those squares. Set to globally declared arr colors
	//pick a new random color from array
	pickedColor = pickColor(); //select the puzzle answer
	//change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor; //set the span with id colorDisplay to the string determined by pickColor()
	resetButton.textContent = "New Colors"
	messageDisplay.textContent = "";
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		}
		else {
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "steelblue"; //reset the background color to the default steelblue after finished puzzle
}


resetButton.addEventListener("click", function(){
	reset();
})

function changeColors(color){
	//loop through all squares
	for(var i = 0; i<squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
	//change each color to match given color
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length); //gen a random number from 0-1, multiply by number of squares, and round to nearest integer
	return colors[random]; //return the array position of the answer to the puzzle
}

function generateRandomColors(num){
	//make an array
	var arr = [];
	//add num random colors to array
	for (var i = 0; i<num; i++){
		//get random color and push into array
		arr.push(randomColor()); //gen and store strings into the array that will display the color of the respective squares
	}
	//return that array
	return arr;
}

function randomColor(){
	//pick a "red" from 0 to 255
	var r = Math.floor(Math.random() * 256) //gen number of 0-1 and multiply to 256
	//pick a "blue" from 0 to 255
	var b = Math.floor(Math.random() * 256)
	//pick a "green" from 0 to 255
	var g = Math.floor(Math.random() * 256)
	return "rgb(" + r + ", " + g + ", " + b + ")"; //return string
}