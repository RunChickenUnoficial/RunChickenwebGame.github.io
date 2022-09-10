//for pause menu
let inOptions = false;
var MyOptions = [{name: 'Music Volume',value: musicVolume,desc: 'The volume of the music', type: 'PlusMinus'},
{name: 'Sound Volume',value: 10,desc: 'The volume of the sounds', type: 'PlusMinus'}]
,savedmusicVolume = localStorage.getItem('musicVol');

function openOptionsMenu() {
inOptions = true;
}

function closeOptionsMenu() {
inOptions = false;

}

function drawOptionsMenu() {
drawImage(lilDark,0,0, 1300, 720);
context.fillStyle = "gray";
context.fillRect(205, 75 ,850, 620);
context.fillStyle = "white";
context.font = "100px SHOWCARD GOTHIC";
context.fillText("OPTIONS",400, 5);
for (var i = 0; i < MyOptions.length; i++) {
    context.font = "40px SHOWCARD GOTHIC";
    context.fillText(MyOptions[i].name + ' : ' + MyOptions[i].value,250, 100 + (80 * i));
    if(MyOptions[i].type == 'PlusMinus') {
    drawImage(OptionButtonMunis,750, 100 + (80 * i),60,60);
    drawImage(OptionButtonPlus,830, 100 + (80 * i),60,60);
    }    
}    
}

function AtOptionsClick(WhatOpp,ifminus = false) {
    for(var i = 0; i < MyOptions.length; i++) {
    if(WhatOpp == MyOptions[i].name) {
    if(MyOptions[i].type == 'PlusMinus'){
    if(!ifminus){
    if(MyOptions[i].name == 'Music Volume') {
    musicVolume = musicVolume - 0.05;
    if(musicVolume <= 0.05) {
    musicVolume = 0;
    }
    MyOptions[i].value = Math.floor(musicVolume  * 10);
    ingameMusic.volume = musicVolume;
    menuMusic.volume = musicVolume;
    pauseMusic.volume = musicVolume;
    localStorage.setItem('musicVol',musicVolume);   
    }
    
    }else{//end of ifminus
    if(MyOptions[i].name == 'Music Volume') {
    musicVolume = musicVolume + 0.05;
    if(musicVolume >= 1) {
    musicVolume = 1;
    }
    MyOptions[i].value = Math.floor(musicVolume * 10);
    ingameMusic.volume = musicVolume;
    menuMusic.volume = musicVolume;
    pauseMusic.volume = musicVolume;
    localStorage.setItem('musicVol',musicVolume);   
    }

    }
    }
    }
    }
}