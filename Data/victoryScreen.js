var finishedTutorial = false,finishedCity = false;
var CanPause = true,isThanksForPlaying = false;
function drawVictoryScreen(curMode = 'tutorial') {
    if(curMode == 'tutorial') { 
    context.fillStyle = "blue";
    context.font = "100px SHOWCARD GOTHIC";
    context.fillText("VICTORY",menuStartX - 100, menuStartY - 500);
    context.fillStyle = "black";
    context.font = "50px SHOWCARD GOTHIC";
    context.fillText("EXIT",menuStartX, menuStartY);
    }else if(curMode == 'city') { 
    context.fillStyle = "blue";
    context.font = "100px SHOWCARD GOTHIC";
    context.fillText("VICTORY",menuStartX - 100, menuStartY - 500);
    context.fillStyle = "black";
    context.font = "50px SHOWCARD GOTHIC";
    context.fillText("continue",menuStartX - 35, menuStartY);        
    }
}
function drawThanksScreen() {
    drawImage(ThanksForPlaying,0,0,1290,720);
    context.fillStyle = "white";
    context.font = "50px SHOWCARD GOTHIC";
    context.fillText("Exit",menuStartX + 100, menuStartY); 
}
function ActivateVictory(mode = 'tutorial') {
if(mode == 'tutorial'){
    finishedTutorial = true;
    CanPause = false;
    chickenAnimNum = 3;
}
if(mode == 'city') {
    finishedCity = true;
    CanPause = false;
    chickenAnimNum = 3;
}
}