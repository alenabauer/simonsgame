var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// Start the game when a key is pressed
$(document).keypress(function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

// Function that generates a new random color
async function nextSequence() {
    userClickedPattern = [];
    var randombNumber = Math.floor(Math.random() * 4);
    var randomColor = buttonColors[randombNumber];
    gamePattern.push(randomColor);

    gamePattern.forEach(showSequence);

    level++;
    $("#level-title").text("Level " + level);
}

// Animate buttons that are clicked by the player
$(".btn").click(function() {
    var userColor = $(this).attr("id");
    userClickedPattern.push(userColor);
    $("#" + userColor).addClass("pressed");
    playSound(userColor);
    setTimeout(function(){
        $("#" + userColor).removeClass("pressed");
    }, 150);
    checkAnswer(userClickedPattern.length-1);
});

// Check if the player clicks the right buttons
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
          }    
    } else {
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 2000);
        $("h1").text("Game Over. Press Any Key to Restart.");
        startOver();
    }
};

// Function to play audio
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

// Function that shows the game pattern from the beginning
function showSequence (item, index, arr) {
    setTimeout (function() {
        item = arr[index];
        $("#" + item).addClass("sequence");
        playSound(item);
        setTimeout(function(){
            $("#" + item).removeClass("sequence");
        }, 400);
    }, (index + 1) * 600);
};

// Set level and game pattern to zero to start a new game
function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}