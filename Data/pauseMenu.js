let isShowStats = true;
var pauseOptions = [{name: 'resume',pos: -40},{name: 'exit',pos: 0 }];

function ShowStats() {
    context.font = "25px SHOWCARD GOTHIC";
    context.fillText(" Score - " + 0 ,1000, 185);
    context.fillText(' Health - ' + Math.floor(iconPos - 5) ,1000, 225);    
}

function drawPauseOptions() {
    for (var i = 0; i < pauseOptions.length; i++) {
    context.fillStyle = "white";
    context.font = "60px SHOWCARD GOTHIC";
    context.fillText(pauseOptions[i].name,550 + pauseOptions[i].pos, 200 + (70 * i));
    }
}