const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;

$(document).keypress(function () {
  if (!gameStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
    
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000)
        }
    } else {
        console.log("wrong")
        playSound("Wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}

$(document).keypress(function (event) {
  var key = event.keyCode ? event.keyCode : event.which;
  var ch = String.fromCharCode(key);
  console.log(`You pressed key: + ${ch}`);
});




function nextSequence() {
    userClickedPattern = [];
    level++;
  $("#level-title").text("Level " + level);
  let randNum = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randNum];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name) {
  var playAudio = new Audio("sounds/" + name + ".mp3");
  playAudio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed ");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed ");
  }, 100);
}
