//store the colours in an Array
var buttonColours = ["red", "blue", "green", "yellow"];

//Create Empty Array to store sequence of colours
var gamePattern = [];

//Array to store the sequence of buttons pressed by User
var userClickedPattern = [];

//start with level=0
var level=0;

//Initially game started is set to true
var started = true;

//checks if game is about to start or is already started
$(document).on("keydown",function(){
  if(started){
    nextSequence();
    started = false;
  }
});

//adds the colour of button that user clicked to the Arraya and then checks it with the correct pattern
$(".btn").on("click",function(){
var userChosenColour = $(this).attr("id");
userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);
});

//adds the next sequence to gamePattern Array and increments the level
function nextSequence(){

  userClickedPattern = [];
  $("#level-title").html("Level "+level);
  var randomNumber =Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
}


//play the sound when button is clicked
function playSound(name){

  var audio= new Audio("sounds/"+name+".mp3");
  audio.play();
}

//Animate(Fade in-out) the button when pressed
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}

//checks if the user is pressing the correct sequence or not
function checkAnswer(currentLevel){
  //correct sequence
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //If the user got the most recent answer correct, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length){

      //Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } 
  //worng sequence pressed by user
  else {

    var audio= new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over")
    },200);
    $("#level-title").html("Game Over! Press any Key to Restart");
    startOver();
  }
}

//After Game is over and click on restart, it initializes the variables with initial values
function startOver(){
  level = 0;
  gamePattern = [];
  started = true;
}
