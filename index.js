var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern =[];

var userChosenColor ;

var level = 0;
var i=1;

//for creating animation when button pressed
function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed");
    }, 100);
}

//for playing a sound
function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

// for comparing the button pressed and the game pattern that was randomly alloted
function checkAnswer(currentLevel){
    
    if (userClickedPattern[currentLevel-1] === gamePattern[currentLevel-1]){
        //for the last user input button matches the game pattern

        //console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();}, 1000);
        }
    }
    else{
        //for the last user buttons not matching with the random generated


        //console.log("wrong");


        playSound("wrong");


        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, press any key to restart");

        startOver();
    }
}


//for starting the sequence and consecuitively generating sequence randomly
function nextSequence(){
    userClickedPattern =[];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("." + gamePattern[level]).fadeOut(100).fadeIn(100);
    
    playSound(gamePattern[level]);

    level++;
    $("h1").text("Level " + level);
}


//for restarting the game once the user presses the wrong button
function startOver(){
    level = 0;
    i = 1;
    gamePattern = [];
}


//for detecting the keypress and starting the game
$(document).keypress(function(){
    if(i===1){
    nextSequence();
    i=0;
    }

});


//for taking button press as input 
$(".btn").click(function(event){

    
    userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);

    playSound(userChosenColor);
    console.log("user "+ userClickedPattern);
    console.log("game "+ gamePattern);
    

    checkAnswer(userClickedPattern.length);
})




