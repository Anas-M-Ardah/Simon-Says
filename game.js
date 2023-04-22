var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(".btn").click(function () { 
    var userChosenColour = $(this).attr('id');  
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

$(".btn").ontouchstart(function () { 
    var userChosenColour = $(this).attr('id');  
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

$("body").keypress(function (e) { 
    if(!started){
        nextSequence();
        started = true;
    }
});


function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").html("Level "+level);
}

function playSound(name){
    var audio = new Audio("sounds/"+name+'.mp3');
    audio.play(); 
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(()=>{
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(()=>{
                nextSequence();
                userClickedPattern = [];
            },1000);
        }

    } else {
       $("body").addClass("game-over");
       playSound("wrong");
       $("#level-title").html("Game Over, Press Any Key to Restart"); 
       setTimeout(()=>{
        $("body").removeClass("game-over");
       },200);
       startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}
