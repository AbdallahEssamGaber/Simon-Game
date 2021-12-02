var buttonColours = ["red", "blue", "green", "yellow"],
    gamePattern = [],
    userPattern = [];

var level = 0,
    delay=1000,
    cheatingMins=0;

var started=false,
    changed=false,
    clicked=false;
$(document).keypress(function() {
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started=true;
  }
});


$(".btn").click( function(){
  clicked=true;
  cheatingMins=0;
  var userChosenColour = $(this).attr("id");
  userPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  if(started){
    CheckAnswer(userPattern.length-1);
  }
  //CheatersCounter();


})
function CheckAnswer(currentLevel){

  if(gamePattern[currentLevel] == userPattern[currentLevel]){
    if(userPattern.length == gamePattern.length && delay <= 300 && !changed){
      changed=true;
      setTimeout(function(){
        buttonColours.forEach(function(item) {
          if($("."+item).hasClass("pressed")){
            $("."+item).removeClass("pressed");
          }
        });
      }, 50)


      $(".green").removeAttr('id').attr("id","blue");
      $(".blue").removeAttr('id').attr("id", "green");
      $("#blue").removeClass("green").animate({height: "-=50", width:"-=50"}).addClass("blue").animate({height: "+=50", width:"+=50"});
      $("#green").removeClass("blue").animate({height: "-=50", width:"-=50"}).addClass("green").animate({height: "+=50", width:"+=50"});

      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
    else if(userPattern.length == gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else {
    wrong();

  }
}
function nextSequence()
{
  delay=delay-100;
  console.log(delay);
  userPattern = [];
  level++;
  $("#level-title").text("level " +level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);


  $("#" + randomChosenColour).fadeOut(delay).fadeIn(delay);

  playSound(randomChosenColour);


  //CheatersCounter();

}




function wrong(){
  playSound("wrong");

  $("body").addClass("game-over");
  $("#level-title").text("Game Over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);

  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
}


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
            $("#" + currentColour).removeClass('pressed');
    }, 100);
}


// function CheatersCounter(){
//   setTimeout(function(){
//     cheatingMins++;
//     if(cheatingMins > 4){
//       alert("Where r u?🤔");
//       alert("Your Cheating🤬");
//       wrong();
//       return;
//     }
//     else{
//       CheatersCounter();
//     }
//   },6000);
//
// }

function startOver(){
  cheatingMins=0;
  clicked=false;
  gamePattern=[];
  level=0;
  delay=650;
  started=false;
}
