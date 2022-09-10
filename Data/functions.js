var curframe = 0,beforeFrame = 0;
let otherIconAnim = false, curChicIcon = 3;

console.log("LETSGOOOO");

function updateMovement(change = 0.2,maxSpeed = 5.9) {
  //updates the movement
  if(isMoving){
  myX = myX + dx;
  dx = dx + change;
  }
  myY = myY + (mouseY-myY) / 10;	

  if(dx < 0) {
  dx = 0
  }
  if(dx > maxSpeed) {
  dx = maxSpeed - 0.9;
  }
  
}
function updateDeadlyCarmovement(thechange = 10) {
for(var i = 0; i < dCarCount; i++) {
  dCarX[i] = dCarX[i] - thechange;  
}

}
function updateCam(updatecam = 50){
  //this is for better and smoother camera animations
  if(camMoveWithChick){
  cameraX = cameraX + dx;
  }else{
  cameraX = myX - updatecam;
  }
}

function updateColliding(BcarDamage= 5) {
  for(let iv = 0; iv < carCount ; iv++){  
  if(areColliding(myX-cameraX,myY,myW,myH,(carX[iv] + 30)-cameraX,carY[iv] + 20, 100,75)) {
  colWithCar = true;
  setScore(-2);
  updateIsMoving(true);
  setTimeout(function() {
  carSound[iv].currentTime = 0;
  carSound[iv].play()
  },10)   
  }else{
  colWithCar = false;
  updateIsMoving(false);   
  }

  }
  for(i = 0; i < dCarCount; i++) {
   if(areColliding((myX+50)-cameraX,myY + 25,myW -20,myH -20,dCarX[i]-cameraX,(dCarY[i] - 10),150,100 - 10)){
   updateIsMoving(true,-BcarDamage);
   setScore(-10);
   }else{
   updateIsMoving(false);
   } 
  }
  for(i = 0; i < seedCount; i++) {
    if(areColliding((myX+50)-cameraX,myY + 25,myW -20,myH -20,seedX[i]-cameraX,(seedY[i] - 10),40,60)){
    //updateIsMoving(true,1,false);
    seedY[i] = 9909090900909;
    seedSound[i].currentTime = 0;
    seedSound[i].play();
    iconPos = iconPos + BcarDamage / 5;
    setScore(110 + randomInteger(200))
    } 
   }
 

  
}
function updateTColliding(BcarDamage= 1) {
  for(let i = 0; i <= TcarBr; i++) {
    if(areColliding((myX+50)-cameraX,myY + 25,(myW / 2) -20,(myH / 2) -20,TcarX[i]-cameraX,(TcarY[i] - 10),150,100 - 10)){
      //console.log('Tutorial finished' + iconPos);
      updateIsMoving(true,-BcarDamage);
      TcarSound[i].currentTime = 0;
      TcarSound[i].play()
      }else{
      updateIsMoving(false);
      }  
  }
  for(i = 0; i < TseedCount; i++) {
    if(areColliding((myX+50)-cameraX,myY + 25,myW -20,myH -20,TseedX[i]-cameraX,(TseedY[i] - 10),40,60)){
    //updateIsMoving(true,1,false);
    TseedY[i] = 9909090900909;
    TseedSound[i].currentTime = 0;
    TseedSound[i].play();
    setScore(110 + randomInteger(200))
    console.warn('HAHA')
    iconPos = iconPos + 10;
    } 
   }
     
}
function updateIsMoving(abc,TheChange = -1,anim = true) {
  if(abc){
    
    chickFrames = 0;
    console.log(dx);
    dx=dx-2;
    if(anim) {
    chickenAnimNum = 2;
    curframe = 0;
    }
    
    updateHealthBar(TheChange); 
    isMoving = false;
    healthUpdate = false;
    }else{
    isMoving = true;
    healthUpdate = true;
    }
}

function createBGPhysics(WhichMode = '') {
  if(WhichMode == ''){

  }else if(WhichMode == 'tutorial') {
  if(myY <= 100){
  myY = 100;
  }
  if(myY >= 460){
  myY = 459;
  }
  }else if(WhichMode == 'city') {
  if(myY >= 525){
   myY = 524;
  }    
  }

}

function createhealthBar(hasIcon = false){
  context.fillStyle = "black";
  context.fillRect(200 + whereHealth, 25 ,575, 10);
  context.fillRect(200 + whereHealth, 55 ,575, 10);
  context.fillRect(195 + whereHealth, 25 ,10, 40);
  context.fillRect(775 + whereHealth, 25 ,10, 40);

  context.fillStyle = "#ffca18";
  context.fillRect(200 + whereHealth, 30 ,iconPos, 30);
  
  if(hasIcon){
  updateIconAnim();

  if(iconPos >= 5 && iconPos <= 120){
  curChicIcon = 1;
  }   
  if(iconPos >= 120 && iconPos <= 240){
  curChicIcon = 2;
  }  
  if(iconPos >= 240 && iconPos <= 370){
  curChicIcon = 3;
  }
  if(iconPos >= 370 && iconPos <= 460){
  curChicIcon = 4;
  }
  if(iconPos >= 460 && iconPos <= 579){
  curChicIcon = 5;
  }  

  switch(curChicIcon) {
  case 1:
  drawImage(iconChicLosing[curframe],(170 + iconPos) + whereHealth, 0, 60, 80);   
  break; 
  case 2:
  drawImage(iconChicalmostLosing[curframe],(170 + iconPos) + whereHealth, 0, 60, 80);    
  break;  
  case 3:
  drawImage(iconChicOk[curframe],(160 + iconPos) + whereHealth, 0, 80, 80);    
  break;
  case 4:
  drawImage(iconChicalmostWinning[curframe],(160 + iconPos) + whereHealth, 0, 80, 80);  
  break;
  case 5:
  drawImage(IconWinningAnim[curframe],(160 + iconPos) + whereHealth, 0, 80, 90);  
  break;
  }
  
 }
}

function updateIconAnim() { 
    switch(curChicIcon) {
    case 1:
    if(iconPos >= 50 && iconPos <= 770){
    beforeFrame++;
    if(beforeFrame >= 2) {
    beforeFrame = 0;
    curframe++;
    }
    if(curframe >= 9){
    curframe = 0;  
    }  
    }
    break;     
    case 2:
    if(iconPos >= 50 && iconPos <= 770){
    beforeFrame++;
    if(beforeFrame >= 4) {
    beforeFrame = 0;
    if(otherIconAnim){
    curframe--;
    }else{
    curframe++;
    }
    }
    if(curframe >= 3){
    otherIconAnim = true;
    curframe = 3;
    }else if(curframe <= 0){
    otherIconAnim = false;
    curframe = 0;
    }
      
    }   
    break;    
    case 3:
    if(iconPos >= 50 && iconPos <= 770){
    beforeFrame++;
    if(beforeFrame >= 4) {
    beforeFrame = 0;
    if(otherIconAnim){
    curframe--;
    }else{
    curframe++;
    }
    }
    if(curframe >= 8){
    otherIconAnim = true;
    curframe = 8;
    }else if(curframe <= 0){
    otherIconAnim = false;
    curframe = 0;
    }
    
    }   
    break;
    case 4:
      if(iconPos >= 50 && iconPos <= 770){
        beforeFrame++;
        if(beforeFrame >= 4) {
        beforeFrame = 0;
        if(otherIconAnim){
        curframe--;
        }else{
        curframe++;
        }
        }
        if(curframe >= 8){
        otherIconAnim = true;
        curframe = 8;
        }else if(curframe <= 0){
        otherIconAnim = false;
        curframe = 0;
        }
        
        }  
    break;
    case 5:
      if(iconPos >= 50 && iconPos <= 770){
        beforeFrame++;
        if(beforeFrame >= 4) {
        beforeFrame = 0;
        if(otherIconAnim){
        curframe--;
        }else{
        curframe++;
        }
        }
        if(curframe >= 9){
        otherIconAnim = true;
        curframe = 9;
        }else if(curframe <= 0){
        otherIconAnim = false;
        curframe = 0;
        }
          
        }   
    break;
    }

}
function createWarningSignAnim() {
  fireFB++;
  if(fireFB >= 3) {
  fireFB = 0;
  fireF++;
  }
  if(fireF >= 7) {
  fireF = 0;
  }
}

function updateHealthBar(change,updateVar = true) {
  if(updateVar) {
  iconPos = iconPos + change;
  }
  if(iconPos >= 575){
  iconPos = 574.7;
  }
  if(iconPos <= 5){
  iconPos = 5.1;
  }
}

function animateFrames(daframe,Maxframes,fps = 24,loop = true){
  
    var curframe = 0;
  
    curframe++;
    daframe++;
    if(curframe >= fps){
    curframe = 0;
    daframe++;
    }
    if(daframe >= Maxframes){
    if(loop){
    daframe = 0;
    }else{
    daframe = Maxframes;
    }  
    }
  
  }

function setScore(change) {
  score = score + change;
  if(score >= CityhighScore) {
  localStorage.setItem('CITYHIGHSCORE',score);
  }
}

function tutorialEvents() {
  if(tutorialMusic.currentTime >= 0 && tutorialMusic.currentTime <= 7.8){
    context.fillStyle = "black";
    context.fillRect(1280-(cameraX%1280),-50,1282,820);
    context.fillRect(0-(cameraX%1280),-50,1282,820);
    if(tutorialMusic.currentTime >= 0 && tutorialMusic.currentTime <= 2){
    context.fillStyle = "white";
    context.font = "50px SHOWCARD GOTHIC";
    context.fillText("Sashko",470, 210);
    //context.fillText("?????",640, 270);  
    //context.fillText("Flaming I",640, 340);  
    //context.fillText("Present",640, 460);      
    }
    if(tutorialMusic.currentTime >= 0.25 && tutorialMusic.currentTime <= 2){
        context.fillStyle = "white";
        context.font = "50px SHOWCARD GOTHIC";
        context.fillText('ben sheen',470, 270);        
    }
    if(tutorialMusic.currentTime >= 0.5 && tutorialMusic.currentTime <= 2){
        context.fillStyle = "white";
        context.font = "50px SHOWCARD GOTHIC"; 
        context.fillText("Jakekup Sherlock",470, 340);        
        }
    if(tutorialMusic.currentTime >= 0.6 && tutorialMusic.currentTime <= 2){
        context.fillStyle = "white";
        context.font = "50px SHOWCARD GOTHIC";  
        context.fillText("Dominik",470, 400);      
    }
        if(tutorialMusic.currentTime >= 0.75 && tutorialMusic.currentTime <= 2){
        context.fillStyle = "white";
        context.font = "50px SHOWCARD GOTHIC";  
        context.fillText("Present",470, 520);      
    }
    if(tutorialMusic.currentTime >= 2.5 && tutorialMusic.currentTime <= 4){
      context.fillStyle = "white";
      context.font = "50px SHOWCARD GOTHIC";
      context.fillText("Idea by",540, 210);
      //context.fillText("?????",640, 270);  
      //context.fillText("Flaming I",640, 340);  
      //context.fillText("Present",640, 460);      
      }
      if(tutorialMusic.currentTime >= 2.7 && tutorialMusic.currentTime <= 4){
        context.fillStyle = "white";
        context.font = "50px SHOWCARD GOTHIC";
        context.fillText("Frenzy Ghost",450, 270);      
      }
      if(tutorialMusic.currentTime >= 4.7 && tutorialMusic.currentTime <= 6){
        context.fillStyle = "white";
        context.font = "50px SHOWCARD GOTHIC";
        context.fillText("a silly little game made for fun",220, 270);      
      }
      //if(tutorialMusic.currentTime >= 6.7 && tutorialMusic.currentTime <= 6.8){
      //drawImage(run_chicken_logo2,540,320,200,80)      
      ///}
      if(tutorialMusic.currentTime >= 6.7 && tutorialMusic.currentTime <= 8){
        drawImage(run_chicken_logo2,490,270,400,180)      
      }           
    }
    if(tutorialMusic.currentTime >= 7.7 && tutorialMusic.currentTime <=7.9){
    console.log('chicks pos',myX,myY)
    }
    if(tutorialMusic.currentTime >= 8 && tutorialMusic.currentTime <= 15){
      context.fillStyle = "white";
      context.font = "40px SHOWCARD GOTHIC";
      context.fillText("      Move the mouse, so the chicken moves with it",50, 70);      
    }

    if(tutorialMusic.currentTime >= 18 && tutorialMusic.currentTime <= 25){
      context.fillStyle = "white";
      context.font = "40px SHOWCARD GOTHIC";
      context.fillText("    Try to not hit the CARS!! They deal damage",50, 500);      
    }

    if(tutorialMusic.currentTime >= 26 && tutorialMusic.currentTime <= 32){
      context.fillStyle = "white";
      context.font = "40px SHOWCARD GOTHIC";
      context.fillText("   Collect The Seeds. The Heal you + give you score",50, 500);    
    }
    if(tutorialMusic.currentTime >= 32 && tutorialMusic.currentTime <= 45){
      context.fillStyle = "white";
      context.font = "35px SHOWCARD GOTHIC";
      context.fillText("   In every game mode there are different/extra objects",20, 500);
      context.fillText("to avoid. this tutorial gives you basic skills to play the game :)",0, 550);     
    }
    if(myX-cameraX >= 30000 || myX >= 30000 && myX <= 33000){
    context.fillStyle = "white";
    context.font = "40px SHOWCARD GOTHIC";
    context.fillText("Congratulations, you finished the tutorial, master!",25, 500);  
    }
}
