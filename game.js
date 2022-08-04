const colors  = ["green","red","yellow","blue"];
const sounds  = ["sounds/green.mp3","sounds/red.mp3","sounds/yellow.mp3","sounds/blue.mp3"];
const buttons = document.querySelectorAll("div .btn");
var   userPat = [];
var   pattern = [];
var   level   = 0;
var   gameOn  = 0;
var highScore = 0;
var   flag    = 0;

$(document).keypress(function(event) {
    if (!gameOn && event.key == "Enter") {
      $("#level-title").text("Level " + level);
      nextSeq();
      gameOn = 1;
    }
});
function playAudio(index){
    var audio;
    if (index==-1)
        audio = new Audio("sounds/wrong.mp3");
    else
        audio = new Audio(sounds[index]);
    
    audio.play();
}
function flash(index){
    $("#"+colors[index]).addClass("pressed");
    setTimeout(function () {
        $("#" + colors[index]).removeClass("pressed");
      }, 100);
}
function nextSeq(){
    var randNo = Math.floor(Math.random() * 4);
    pattern.push(randNo);

    userPat = [];

    $("#" + colors[randNo]).fadeIn(100).fadeOut(100).fadeIn(100);

    playAudio(sounds[randNo]);
    $("#"+colors[randNo]).fadeOut(100).fadeIn(100);
    playAudio(randNo);

    console.log(pattern);
}
function startOver(){
    level   = 0;
    userPat = [];
    pattern = [];
    gameOn  = 0;
}
function gameOver(){
    playAudio(-1);

    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
      }, 1100);
      
    $("#level-title").text("Press enter to restart game");
    startOver();
}
function gameLoop() {
    var curr = userPat.length-1;

    if (userPat[curr]===pattern[curr]) {
        if (userPat.length===pattern.length) {

            if (level>highScore) {
                document.querySelector("#high").innerHTML=level;
                highScore = level;
            }

            setTimeout(function (){
                nextSeq();
            }, 1000);

            if (level>5){
                if (flag==0){
                    alert("Now 2 more pattern will come with each level");
                    flag = 1;
                }
                setTimeout(function (){
                    nextSeq();
                }, 1500);
            }

            $("#level-title").text("Level "+(level++));
        }
    }
    else{
        gameOver();
    }
}
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click",()=>{
        
        flash(i);
        playAudio(i);

        if (gameOn==1){
            userPat.push(i);
            gameLoop();
        }
    })
}