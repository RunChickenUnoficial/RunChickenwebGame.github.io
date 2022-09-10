let isDeadScreen,chickDeathFrames = 0,preChickDeathFrames = 0,deathIntervaler,hasWaitedDeathAnim = false,showDeathOptions = false;
let retryTextX = 275,retryTextY = 555,isCollidingRetryText = false;
var deathMusic = document.getElementById('DeathMusicID');

function ActivateDeath(iconDPos) {
   if(iconDPos <= 6){
   var Audio = document.getElementById('DeathScreamSoundID');
   Audio.play();
   isDeadScreen = true;
   setTimeout(PreStartDeathAnim, 100);
   setTimeout(DrawDeathOptions, 1580);
   } 
}

function resetDeathScreen() {
    isDeadScreen = false;
    hasWaitedDeathAnim = false;
    showDeathOptions = false;
    deathMusic.pause();
    deathMusic.currentTime = 0;
}
function DrawDeathScreen() {
    context.fillStyle = "black";
    context.fillRect(0, 0 ,1282 ,820 );
    if(showDeathOptions) {
    if(isCollidingRetryText){
    context.fillStyle = "cyan";
    }else{
    context.fillStyle = "blue";
    }
    context.font = "70px SHOWCARD GOTHIC";
    context.fillText("RETRY",275, 555);        
    }
}

function DrawDeathOptions() {
    context.fillStyle = "green";
    console.log('Sheat');
    showDeathOptions = true;
}
function PreStartDeathAnim() {
    deathIntervaler = setInterval(StartDeathAnim, 10);
}

function StartDeathAnim() {
  if(areColliding(mouseX,mouseY,20,20,retryTextX,retryTextY,100,300)) {
  isCollidingRetryText = true;
  }else{
  isCollidingRetryText = false;
  }
  if(chickDeathFrames == 11) { 
  console.log('Meme AudioTime');
  var memeAudio = document.getElementById('DeathMemeSoundID');
  memeAudio.play();
 // document.body.addEventListener("Manifests", function () {
  // memeAudio.play();
  // console.log("PlayedSuccessfully");
 // })

  }
}