// Default Values
let cavnasSize = document.getElementById('canvas-id'),isPaused = false,startedGame;
//camera
let cameraX,cameraY,camMoveWithChick;
//for the chicken
var myX, myY,myW,myH,dx=0,chickFrames = 0,chickenAnimNum = 0,preChickFrames = 0,isMoving = true;
//Default Car
let carX = [],carY = [],oldCarX = [],oldCarY = [],carSound = [],carCount = 60 + randomInteger(80),colWithCar = false;; //randomInteger() is a build in FN
let carXrandom = []
for(let i = 0; i <= carCount; i++) { //creates the cars
carX[i] = randomInteger(48000) + 2000;
carY[i] = randomInteger(550);
carXrandom[i]  = carX[i]
oldCarX[i] = carX[i];
oldCarY[i] = carY[i];
carSound[i] = document.getElementById('CarHitID');    
}
//Deadly Cars
let dCarX = [],dCarY = [],oldDCarX = [],oldDCarY = [],dcDx = [],dCarCount = 20,fireF = 0,fireFB = 0;
for(let i = 0; i <= dCarCount; i++) { //creates the cars
dCarX[i] = randomInteger(80000) + 30000;
dCarY[i] = randomInteger(550); 
dcDx[i] = 5;  
oldDCarX[i] = dCarX[i]; 
oldDCarY[i] = dCarY[i];
}
//HealthBar
let curHealth = 50, iconPos = 300;
var whereHealth = 125, healthUpdate = true;

//Tutorial Stuff
var TcarX = [],TcarY = [],TcarBr = 60,TcarSound = [],TseedX = [],TseedY = [],TseedCount = 100,TseedSound = [],skipedIntro,fartSFX = document.getElementById('FartID');
for(i=0;i<TcarBr;i++) {
TcarX[i] = 10000 + randomInteger(20000);
TcarY[i] = 100 + randomInteger(399);
TcarSound[i] = document.getElementById('CarHitID'); 
}
for(var i = 0; i < TseedCount; i++) {    
TseedX[i] = 13000 + randomInteger(17000);
TseedY[i] = 100 + randomInteger(400);
TseedSound[i] = document.getElementById('SeedID');    
}

//seeds
var seedX = [],seedY = [],seedXrandom = [],seedCount = 80 + randomInteger(80),seedSound = [],oldSeedX = [],oldSeedY = [],score,CityhighScore = localStorage.getItem('CITYHIGHSCORE');
for(var i = 0; i < seedCount; i++) {    
seedX[i] = 2000 + randomInteger(48000);
seedY[i] = randomInteger(400);
seedXrandom[i] = seedX[i];
oldSeedX[i] = seedX[i];
oldSeedY[i] = seedY[i];
seedSound[i] = document.getElementById('SeedID')    
}
//sounds
var runsound = document.getElementById("chickenRunningID");
document.body.appendChild(runsound);
document.body.addEventListener("init", function () {
    runsound.play();
});

let ingameMusic,pauseMusic,tutorialMusic = document.getElementById('TutorialID'),victorySong = document.getElementById('THX');
let menuMusic = document.getElementById('MenuChickThemeID'),vicSong;
document.body.appendChild(menuMusic);
document.body.addEventListener('click' , function () {
 menuMusic.play();   
})
var musicVolume = 1,soundVolume = 1;
//Chicken anims:
//0 = null
//1 = run
function init() {
    // Kodut tuk se izpulnqva vednuj v nachaloto
    myX = 300;
    myY = 300;
    myW = 125;
    myH = 150;
    score = 0;
    skipedIntro = false;//Not skipedIntro
    menuStartX = 555;
    menuStartY = 620;
    cameraX=myX-50;
    camMoveWithChick = true;
    myY=myY+(mouseY-myY)/10;	
    chickenAnimNum = 1;
    startedGame = false;
    isDeadScreen = false;
    ingameMusic = document.getElementById('Street-HardID');
    pauseMusic = document.getElementById('PauseMenuThemeID');
    vicSong = document.getElementById('VictoryID');
}

function update() {
    if(isMenu && !isPaused && !startedGame && !isDeadScreen && !inCity) {
    //menuMusic.play();  
    }
    if(!isPaused && startedGame && !isDeadScreen && !isMenu && inCity && !inTutorial){
        if(diffs[curdiff].name == 'easy') {
        createBGPhysics('city');
        if(myX >= 32000) {
        ActivateVictory('city')
        ingameMusic.pause();
        }else{
        updateColliding(4);
        updateCam();
        updateDeadlyCarmovement(19);
        }
        menuMusic.pause();
        menuMusic.currentTime = 0; 
        updateMovement(0.08,4.9);
        updateChickAnim();
        updateHealthBar(0.1,healthUpdate);
        createWarningSignAnim();
        ActivateDeath(iconPos);
        if(!isThanksForPlaying && !finishedCity) {
        ingameMusic = document.getElementById('Street-EasyID');
        ingameMusic.play();
        }else if(!isThanksForPlaying && finishedCity) {
        vicSong.play();
        }else if(isThanksForPlaying) {
        vicSong.currentTime = 0;
        vicSong.pause();    
        }
        }else if(diffs[curdiff].name == 'normal') {
        createBGPhysics('city');
        if(myX >= 43000) {
        ActivateVictory('city')
        ingameMusic.pause();
        }else{
        updateColliding(10);
        updateCam();
        updateDeadlyCarmovement(19);
        }
        menuMusic.pause();
        menuMusic.currentTime = 0; 
        updateMovement(0.3,6.9);
        updateChickAnim();
        updateHealthBar(0.1,healthUpdate);
        createWarningSignAnim();
        ActivateDeath(iconPos);
        if(!isThanksForPlaying && !finishedCity) {
        ingameMusic = document.getElementById('Street-NormalID');
        ingameMusic.play();
        }else if(!isThanksForPlaying && finishedCity) {
        vicSong.play();
        }else if(isThanksForPlaying) {
            vicSong.currentTime = 0;
            vicSong.pause();    
        }
        }else if(diffs[curdiff].name == 'hard') {
        createBGPhysics('city');
        if(myX >= 50000) {
        ActivateVictory('city')
        ingameMusic.pause();
        }else{
        updateColliding(18);
        updateCam();
        updateDeadlyCarmovement(19);
        }
        menuMusic.pause();
        menuMusic.currentTime = 0;
        updateMovement(1 , 10.9);
        updateChickAnim();
        updateHealthBar(0.1,healthUpdate);  
        createWarningSignAnim();
        ActivateDeath(iconPos);
        if(!isThanksForPlaying && !finishedCity) {
        ingameMusic = document.getElementById('Street-HardID');
        ingameMusic.play();
        }else if(!isThanksForPlaying && finishedCity) {
        vicSong.play();
        }else if(isThanksForPlaying) {
        vicSong.currentTime = 0;
        vicSong.pause();    
        }
        }
    }else if(!isPaused && startedGame && !isDeadScreen && !isMenu && !inCity && inTutorial){
        menuMusic.pause();
        menuMusic.currentTime = 0; 
        if(myX <= 33000){
        updateCam();
        tutorialMusic.play();
        }else{
        ActivateVictory();
        tutorialMusic.pause();
        vicSong.play();
        }
        updateMovement(0.1 , 5.9);    
        updateChickAnim(); 
        createBGPhysics('tutorial');
        if(tutorialMusic.currentTime >= 18){
        updateTColliding();
        updateHealthBar(0.2,healthUpdate);
        ActivateDeath(iconPos);

        }
        //updateColliding(10);
    
    }
    if(isDeadScreen) {
        ingameMusic.pause();
        tutorialMusic.pause();
        tutorialMusic.currentTime = 0;
        ingameMusic.currentTime = 0; 
        preChickDeathFrames++;
        if(hasWaitedDeathAnim && preChickDeathFrames >= 120) {
        preChickDeathFrames = 0;
        hasWaitedDeathAnim = false
        chickDeathFrames++;
        }else if(!hasWaitedDeathAnim && preChickDeathFrames >= 5) {
            preChickDeathFrames = 0;
            chickDeathFrames++;
        }    
        if(chickDeathFrames >= 22){
        chickDeathFrames = 22;  
        }  
    }
   
}
function draw() {
    // Tuk naprogramirai kakvo da se risuva
    if(isMenu) {
    context.fillStyle = "black";
    context.fillRect(0, 0 ,1300, 720);
    context.fillStyle = "yellow";
    context.font = "68px SHOWCARD GOTHIC";
    context.fillText("START",menuStartX, menuStartY);
    drawMenuOptions();
    drawMenuSelections();
    drawDiffs();
    if(isCredits){
    drawCreditsMenu();
    drawImage(CancelButton ,1148, 10  + (150 * 0),130, 130)
    }
    }
    if(!isDeadScreen && inCity && !isMenu && !inTutorial) {

    drawImage(backDesert, 0 -cameraX, 0, 1280, 720);
    //createloopedbackground(backDesert);
    drawImage(backStreet,1280-(cameraX%1280),-50,1282,820);
    drawImage(backStreet,0-(cameraX%1280),-50,1282,820);

    //events ingame
    if(ingameMusic.currentTime >= 13.6 && ingameMusic.currentTime <= 17){
    if(diffs[curdiff].name == 'hard'){
    var space1 = tryToLoad('space','blue');
    context.fillStyle = "black";
    context.fillRect(1280-(cameraX%1280),-50,1282,820);
    context.fillRect(0-(cameraX%1280),-50,1282,820);
    drawImage(space1,1280-(cameraX%1280),-50,1282,820);
    drawImage(space1,0-(cameraX%1280),-50,1282,820);   
    }
    }
    if(diffs[curdiff].name == 'hard') {
    drawImage(FinishLine, 50000-cameraX, 80, 200, 560);
    }else if(diffs[curdiff].name == 'normal') {
    drawImage(FinishLine, 43000-cameraX, 80, 200, 560);
    }else if(diffs[curdiff].name == 'easy') {
    drawImage(FinishLine, 31950-cameraX, 80, 200, 560);
    }
    // myX = 42550 - cameraX, cameraX = myX - 50
    for(var i = 0; i < carCount; i++) {
    drawImage(CarRedStatic,carX[i]-cameraX,carY[i],175,125)    
    }

    for(var i = 0; i < dCarCount; i++) {
    drawImage(CarBlackStatic,dCarX[i]-cameraX,dCarY[i],175,100);
    let fr = 0,frb = 0;
    frb++;
    if(frb >= 4) {
    frb = 0;
    fr++;
    }
    if(fr >= 3){
    fr = 0;
    }
    drawImage(Fire[fr],(dCarX[i]+170)-cameraX,dCarY[i]+20,175,70);    
    drawImage(WarningforDeadlyCar[fireF],(dCarX[i] - 1500)-cameraX,dCarY[i],175,100);
    }
    for(var i = 0; i < seedCount; i++) {    
    drawImage(seed,seedX[i]-cameraX,seedY[i],40,60);
    }

    switch(chickenAnimNum){
    case 1:
    drawImage(ChickenRunning[chickFrames],myX-cameraX, myY, myW, myH);
    break;
    case 2:
    drawImage(ChickenHitted[chickFrames],myX-cameraX, myY, myW, myH);
    break;
    case 3:
    drawImage(ChickenWinning[chickFrames],myX-cameraX, myY - 30, myW, myH);
    break;
    default:
        //code
    break;
    }
 
   if(!startedGame){
   context.fillStyle = "black";
   context.font = "50px SHOWCARD GOTHIC";
   context.fillText("Click to start",menuStartX, menuStartY);
   } 
   
   //The HUD
   if(!isPaused && startedGame) {
   createhealthBar(true);
   context.fillStyle = "red";
   context.font = "25px SHOWCARD GOTHIC";
   context.fillText(" Score - " + score + '   (HIGHSCORE :' +  CityhighScore+ ')   ' +'  |  Health - ' + Math.floor(iconPos - 5) ,10, 685);
   }else if(isPaused && !isDeadScreen) {
   drawImage(lilDark,0,0, 1300, 720); 
   context.fillStyle = "white";
   context.font = "125px SHOWCARD GOTHIC";
   context.fillText("PAUSED",400, 5);
   ShowStats();
   drawPauseOptions();
   //context.fillStyle = "gray";
   //context.fillStyle = "white";
   //context.fillText('CROWDED - by DarkSashko ',35, 680);
   }
   if(diffs[curdiff].name == 'hard') {

   if(myX >= 50000) {
   drawVictoryScreen();
   }

   }else if(diffs[curdiff].name == 'normal') {
    if(myX >= 43000) {
    drawVictoryScreen();
    }
   }else if(diffs[curdiff].name == 'easy') {
    if(myX >= 32000) {
    drawVictoryScreen();
    }
   }
   if(isThanksForPlaying) {
   drawThanksScreen(); 
   }

   }else if (!isDeadScreen && !inCity && !isMenu && inTutorial){

   
   context.fillStyle = "#990000";
   context.fillRect(1280-(cameraX%1280),-50,1282,820);
   context.fillRect(0-(cameraX%1280),-50,1282,820);
   drawImage(oc_coolman,1280-(cameraX%1280),0,172,270);
   drawImage(oc_coolman,0-(cameraX%1280),0,172,270);
   drawImage(oc_justin,1580-(cameraX%1280),-30,202,270);
   drawImage(oc_justin,300-(cameraX%1280),-30,202,270);
   drawImage(oc_fred,1880-(cameraX%1280),0,142,270);
   drawImage(oc_fred,600-(cameraX%1280),0,142,270);
   drawImage(oc_repear,2080-(cameraX%1280),0,172,270);
   drawImage(oc_repear,800-(cameraX%1280),0,172,270);
   drawImage(oc_Shreder,2280-(cameraX%1280),0,272,270);
   drawImage(oc_Shreder,1000-(cameraX%1280),0,272,270);
   drawImage(oc_wildMan,1450-(cameraX%1280),0,172,270);
   drawImage(oc_wildMan,170-(cameraX%1280),0,172,270);

   drawImage(BackWood,2560-(cameraX%2560),150,2560,420);
   drawImage(BackWood,0-(cameraX%2560),150,2560,420);
   context.fillStyle = "gray";
   context.fillRect(33000,150,200,420);
   //drawImage(BackWood,0-(cameraX%2560),150,1282,420);
   //drawImage(BackWood,0-(cameraX%2560),150,-1282,420);
   //drawImage(BackWood,0-(cameraX%1280),150,1282,420);
   //   2560
   for(var i = 0; i < TseedCount; i++) {    
   drawImage(seed,TseedX[i]-cameraX,TseedY[i],40,60);
   }
   for(let i = 0; i <= carCount; i++) {
   drawImage(CarRedStatic,TcarX[i]-cameraX,TcarY[i],105,85);   
   }
   switch(chickenAnimNum){
   case 1:
   drawImage(ChickenRunning[chickFrames],myX-cameraX, myY, myW / 1.5, myH  / 1.5);
   break;
   case 2:
   drawImage(ChickenHitted[chickFrames],myX-cameraX, myY, myW / 1.5, myH / 1.5);
   break;
   case 3:
   drawImage(ChickenWinning[chickFrames],myX-cameraX, myY - 30, myW / 1.5, myH  / 1.5);
   break;
   default:

    break;
    }
    drawImage(oc_henchman,1280-(cameraX%1280),510,272,270);
    drawImage(oc_henchman,0-(cameraX%1280),510,272,270);
    drawImage(oc_Greadead,1380-(cameraX%1280),510,272,270);
    drawImage(oc_Greadead,100-(cameraX%1280),510,272,270);
    drawImage(oc_henchman,1780-(cameraX%1280),610,-272,270);
    drawImage(oc_henchman,500-(cameraX%1280),610,-272,270);
    drawImage(oc_humanbeing,1680-(cameraX%1280),560,122,270);
    drawImage(oc_humanbeing,400-(cameraX%1280),560,122,270);
    drawImage(oc_wisp,1780-(cameraX%1280),560,272,270);
    drawImage(oc_wisp,500-(cameraX%1280),560,272,270);
    drawImage(oc_DsOld,2080-(cameraX%1280),560,272,270);
    drawImage(oc_DsOld,800-(cameraX%1280),560,272,270);
    drawImage(oc_pizzaMen,2380-(cameraX%1280),500,182,270);
    drawImage(oc_pizzaMen,1100-(cameraX%1280),500,182,270)

    tutorialEvents();
    if(tutorialMusic.currentTime >= 18 && myX <= 33000){
    createhealthBar(true);    
    }
    if(tutorialMusic.currentTime >= 26){
    context.fillStyle = "yellow";
    context.font = "25px SHOWCARD GOTHIC";
    context.fillText(" Score - " + score +'  |  Health - ' + Math.floor(iconPos - 5) ,10, 685);
    }
    if(!startedGame){
    context.fillStyle = "black";
    context.fillRect(1280-(cameraX%1280),-50,1282,820);
    context.fillRect(0-(cameraX%1280),-50,1282,820);
    context.fillStyle = "yellow";
    context.font = "50px SHOWCARD GOTHIC";
    context.fillText("Click to start",menuStartX, menuStartY);
    }
    if(myX >= 32000 && myX <= 32050){
    context.fillStyle = "black";
    context.fillRect(1280-(cameraX%1280),-50,1282,100);
    context.fillRect(0-(cameraX%1280),-50,1282,100);
    context.fillRect(1280-(cameraX%1280),700,1282,100);
    context.fillRect(0-(cameraX%1280),700,1282,100);
    }
    if(myX >= 32050 && myX <= 32075){
    context.fillStyle = "black";
    context.fillRect(1280-(cameraX%1280),-50,1282,125);
    context.fillRect(0-(cameraX%1280),-50,1282,125);
    context.fillRect(1280-(cameraX%1280),675,1282,100);
    context.fillRect(0-(cameraX%1280),675,1282,100);
    } 
    if(myX >= 32075 && myX <= 33000){
    context.fillStyle = "black";
    context.fillRect(1280-(cameraX%1280),-50,1282,150);
    context.fillRect(0-(cameraX%1280),-50,1282,150);
    context.fillRect(1280-(cameraX%1280),650,1282,100);
    context.fillRect(0-(cameraX%1280),650,1282,100);
    }else if(myX >= 33000){
    drawVictoryScreen();
    } 

    if(isPaused && !isDeadScreen) {
        drawImage(lilDark,0,0, 1300, 720); 
        context.fillStyle = "white";
        context.font = "125px SHOWCARD GOTHIC";
        context.fillText("PAUSED",400, 5);
        ShowStats();
        drawPauseOptions();
    }

   }else if(isDeadScreen){
   DrawDeathScreen();
   drawImage(ChickenDeathAnim[chickDeathFrames],500 , 350 - myH,myW * 2, myH * 2);
   }

   
}
function mouseup() {
    // Pri klik s lqv buton - pokaji koordinatite na mishkata
    console.log("Mouse clicked at", mouseX, mouseY);
    if(!startedGame && !isDeadScreen && !isMenu && !inOptions){
    startedGame = true;
    }
    if(isMenu && !startedGame && !isDeadScreen && !isPaused && !inOptions) {
    for(i = 0; i < storymodes.length; i++) {
    if(areColliding(mouseX,mouseY,20,20,10, 10  + (150 * i),130, 130)) {
    storymodeCurSelected = i;
    localStorage.setItem('storymodeCurSelected', storymodeCurSelected);
    var clicksound = document.getElementById('menumodeClickID');
    clicksound.play();   
    }

    }
    for(i = 0; i < diffs.length; i++) {
    if(areColliding(mouseX,mouseY,20,20,914 + diffs[i].pos,409  + (80 * i),80, 130)) {
    curdiff = i;
    localStorage.setItem('storymodeCurSelected', storymodeCurSelected);
    var clicksound = document.getElementById('menumodeClickID');
    clicksound.play();    
    }
    }

        if (storymodes[storymodeCurSelected].mode == 'normalMode') {
        if(areColliding(mouseX,mouseY,30,30,menuStartX,menuStartY,200,100)) {
        console.log('startedGame');
        setTimeout(startGame, 20);
        var o = document.getElementById('StartID');
        o.play();
    }         
    }else if (storymodes[storymodeCurSelected].mode == 'tutorial') {
        if(areColliding(mouseX,mouseY,30,30,menuStartX,menuStartY,200,100)) {
        console.log('startedGame');
        setTimeout(startTutorial, 20);
        var o = document.getElementById('StartID');
        o.play();
    }         
    }
      
    }else if(inOptions && isMenu && !startedGame) {
    //Realy easy : Find by name OPTIONSHERE
    for(var i = 0; i < MyOptions.length; i++) {
    if(areColliding(mouseX,mouseY,20,20,750, 100,60,60)) {
    AtOptionsClick('Music Volume',false);
    }
    if(areColliding(mouseX,mouseY,20,20,830, 100,60,60)) {
    AtOptionsClick('Music Volume',true);
    }
    }

    }
    if(isDeadScreen && showDeathOptions){
        if(areColliding(mouseX,mouseY,20,20,retryTextX,retryTextY,300,100)) {
        console.log('Yeah');
        resetGame();
    }  
    }  
    if(!isMenu && !isDeadScreen && startedGame && isPaused) {
    for(var i=0; i<pauseOptions.length; i++) {
        if(areColliding(mouseX,mouseY,20,20,550 + pauseOptions[0].pos, 200 + (70 * 0),230, 60)) {
        isPaused = false;
        var pauseOFFSound = document.getElementById("pauseoffID");
        pauseOFFSound.play();
        pauseMusic.pause();
        pauseMusic.currentTime = 0;
        }else if(areColliding(mouseX,mouseY,20,20,550 + pauseOptions[1].pos, 200 + (70 * 1),130, 60)) {
        resetGame();
        inCity = false;
        inTutorial =false;
        isPaused = false;
        isMenu = true;
        pauseMusic.pause();
        pauseMusic.currentTime = 0;
        ingameMusic.pause();
        ingameMusic.currentTime = 0;
        menuMusic.play();
        }
      }
    }
    if (inTutorial && !inCity && finishedTutorial && !isMenu) {
        if(areColliding(mouseX,mouseY,30,30,menuStartX,menuStartY,200,100)) {
        finishedTutorial = false;
        inCity = false;
        inTutorial =false;
        isPaused = false;
        isMenu = true;
        resetGame();
        pauseMusic.pause();
        pauseMusic.currentTime = 0;
        ingameMusic.pause();
        ingameMusic.currentTime = 0;
        menuMusic.play();
    }         
    }
    if (!inTutorial && inCity && finishedCity && !isMenu && !isThanksForPlaying) {
        if(areColliding(mouseX,mouseY,30,30,menuStartX - 30,menuStartY,200,100)) {
        isThanksForPlaying = true;
        ingameMusic.pause();
        ingameMusic.currentTime = 0;
        victorySong.play();
        }         
    }else if (!inTutorial && inCity && finishedCity && !isMenu && isThanksForPlaying) { 
    if(areColliding(mouseX,mouseY,30,30,menuStartX + 100,menuStartY,200,100)) {
        finishedCity = false;
        inCity = false;
        isThanksForPlaying = false;
        inTutorial = false;
        isPaused = false;
        isMenu = true;
        resetGame(true);
        pauseMusic.pause();
        pauseMusic.currentTime = 0;
        ingameMusic.pause();
        ingameMusic.currentTime = 0;
        menuMusic.play();
    }    
    }

    if(isMenu && !startedGame && !isDeadScreen && !isCredits) {
    if(areColliding(mouseX,mouseY,30,30,1148, 10  + (150 * 0),130, 130)) {
    setTimeout(function() {
    isCredits = true;
    var Kaka = document.getElementById('CreditsIn');
    Kaka.currentTime = 0;
    Kaka.play();
    }, 10);
    }
    }
    if(isMenu && !startedGame && !isDeadScreen && isCredits) {
    for(var i = 0; i < creditsNames.length; i++) {
    if(areColliding(mouseX,mouseY,30,30,250,600, 100 + (60 * i))) {
    let url = new URL(creditsNames[i].link);
    alert(url)    
    }
    }
    if(areColliding(mouseX,mouseY,30,30,1148, 10  + (150 * 0),130, 130)) {        
    setTimeout(function() {
    isCredits = false;
    var Kaka = document.getElementById('CreditsOut');
    Kaka.currentTime = 0;
    Kaka.play();    
    }, 10);
    }        
    }


}
function keyup(key) {
    // Pechatai koda na natisnatiq klavish
    console.log("Pressed", key);    
    if(startedGame && !isDeadScreen && !isPaused && CanPause){
    if(key == 13){
    setTimeout(function(){
    isPaused = true;
    var pauseOnSound = document.getElementById("pauseonID");
    pauseOnSound.play();
    pauseMusic.play();
    ingameMusic.pause();
    tutorialMusic.pause();
    }, 50)
    }
    }
    if(isPaused && !isDeadScreen && CanPause){
    if(key == 13){
    setTimeout(function(){
    isPaused = false;
    var pauseOFFSound = document.getElementById("pauseoffID");
    pauseOFFSound.play();
    pauseMusic.pause();
    pauseMusic.currentTime = 0;
    }, 50)
    }
    } 
    //if(inTutorial && !inCity && !skipedIntro && startedGame) {
    //skipedIntro = true;
    //tutorialMusic.currentTime = 7.8;
    //myX = 4400-cameraX;
    //}
    if(startedGame && !isPaused && !isDeadScreen){
    if(key == 82){
    ActivateDeath(5);
    }
    }
}

//ignore if its closed
function updateChickAnim(){
    switch(chickenAnimNum){
    case 1:  
    preChickFrames ++;
    if(preChickFrames  >= 5){
    preChickFrames  = 0;
    chickFrames++;
    }
    if(chickFrames >= 15){
    chickFrames = 0;
    }       
    break;
    case 2:
    preChickFrames ++;
    if(preChickFrames  >= 8){
    preChickFrames  = 0;
    chickFrames++;
    }
    if(chickFrames >= 4){
    chickFrames = 0;
    chickenAnimNum = 1;
    }      
    break;
    case 3:
    preChickFrames ++;
    if(preChickFrames  >= 5){
    preChickFrames  = 0;
    chickFrames++;
    }
    if(chickFrames >= 15){
    chickFrames = 0;
    }      
    break;
    default:
            //code
    break;
    }
}
 function resetGame(victory = false) {
    myX = 300;
    myY = 300;
    myW = 125;
    myH = 150;
    cameraX=myX-50;
    camMoveWithChick = true;
    myY=myY+(mouseY-myY)/10;	
    chickenAnimNum = 1;
    startedGame = false;
    isPaused = false;
    isDeadScreen = false;
    curHealth = 50;
    iconPos = 300;
    chickDeathFrames = 0;
    preChickDeathFrames = 0;
    score = 0;
    CanPause = true;
    finishedTutorial = false;
    tutorialMusic.pause();
    tutorialMusic.currentTime = 0;
    curframe = 0;
    victorySong.pause();
    victorySong.currentTime = 0;
    vicSong.currentTime = 0;
    vicSong.pause(); 
    //curdiff = 0;
    //storymodeCurSelected = 0;
    resetDeathScreen();
    if(victory == false) {
    for(let i = 0; i <= carCount; i++) { //creates the cars
        carX[i] = oldCarX[i];
        carY[i] = oldCarY[i];   
    }
    
    for(let i = 0; i <= dCarCount; i++) { //creates the cars
        dCarX[i] = oldDCarX[i];
        dCarY[i] = oldDCarY[i];   
    } 
    for(i=0; i<seedCount; i++) {
    seedX[i] = oldSeedX[i];
    seedY[i] = oldSeedY[i];
    }
    for(var i = 0; i < TseedCount; i++) {    
    TseedX[i] = 13000 + randomInteger(20000);
    TseedY[i] = 100 + randomInteger(400);    
    }
    }else{
    for(let i = 0; i <= carCount; i++) { //creates the cars
    carX[i] = randomInteger(48000) + 2000;
    carY[i] = randomInteger(550);
    oldCarX[i] = carX[i];
    oldCarY[i] = carY[i];   
    }

    
    for(let i = 0; i <= dCarCount; i++) { //creates the cars
        dCarX[i] = randomInteger(80000) + 30000;
        dCarY[i] = randomInteger(550); 
        dcDx[i] = 5;  
        oldDCarX[i] = dCarX[i]; 
        oldDCarY[i] = dCarY[i];   
    } 
    for(var i = 0; i < seedCount; i++) {    
        seedX[i] = 2000 + randomInteger(48000);
        seedY[i] = randomInteger(400);
        oldSeedX[i] = seedX[i];
        oldSeedY[i] = seedY[i];    
    }
    for(var i = 0; i < TseedCount; i++) {    
    TseedX[i] = 13000 + randomInteger(20000);
    TseedY[i] = 100 + randomInteger(400);    
    }        
    }     
 }