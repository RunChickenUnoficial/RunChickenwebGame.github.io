var isMenu = true,inCity = false,inTutorial = false,menustartX,menustartY,
diffs = [{name: 'easy', color: 'green',pos: 0},{name: 'normal', color: 'yellow',pos: -40},{name: 'hard', color: 'red',pos: 0}],
curdiff = 1,storymodes = [
{mode: 'tutorial', icon: menuIcon_Tutorial,background: MenuTutorialBack, desc: 'Tutorial: how to play the game'},
{mode: 'normalMode', icon: menuIcon_Normalmode,background: MenuStreetBack, desc: 'Default mode: running in the street'}],
menuOptions = [{mode:'credits', icon: MenuIcon[0]}];0
let storymodeSavedCurSelected = localStorage.getItem('storyModeCurSelected');
let storymodeCurSelected = 0;
function drawMenuSelections() {
    context.fillStyle = "#585858";
    context.fillRect(0, 0 ,150, 720);
    context.fillStyle = "yellow";
    context.fillRect(0,0 + (150 * storymodeCurSelected),150, 150);
    context.fillStyle = 'gray';
    context.font = "20px SHOWCARD GOTHIC";
    context.fillText(storymodes[storymodeCurSelected].desc, 150, 10);
    drawImage(storymodes[storymodeCurSelected].background, 150, 40,988, 300);
    context.fillStyle = 'white';
    context.font = "20px SHOWCARD GOTHIC";
    context.fillText('Tip: Press ENTER to pause the game', 150, 350);    
    for(i = 0; i < storymodes.length; i++) {
    //context.fillStyle = "orange";
    //context.fillRect(35, 35  + (150 * i),80, 80);
    drawImage(storymodes[i].icon, 10, 10  + (150 * i),130, 130);
    context.fillStyle = 'black';
    context.font = "20px SHOWCARD GOTHIC";
    context.fillText('Tutorial', 25, 130);
    context.fillText('Play', 45, 275);     
    //storymodes[storymodeCurSelected].background  storymodes[storymodeCurSelected].desc       
    }
}
function drawMenuOptions() {
    context.fillStyle = "gray";
    context.fillRect(1138, 0 ,150, 720);
    for(i = 0; i < menuOptions.length; i++) {
    context.fillStyle = "orange";
    drawImage(menuOptions[i].icon, 1148, 10  + (150 * i),130, 130);
    context.fillStyle = 'black';
    context.font = "20px SHOWCARD GOTHIC";
    context.fillText('Credits', 1173, 130);        
    }
}

function drawDiffs() {
 for (let index = 0; index < diffs.length; index++) {
    context.fillStyle = diffs[index].color;
    context.font = "60px SHOWCARD GOTHIC";
    context.fillText(diffs[index].name,914 + diffs[index].pos,409  + (80 * index));
   // context.fillText('>' + diffs[curdiff].name + '<',914 + diffs[index].pos,409  + (80 * index));
    
 }
 context.fillStyle = diffs[curdiff].color;
 context.font = "60px SHOWCARD GOTHIC";
 context.fillText('>',914 - 25 + diffs[curdiff].pos,409  + (80 * curdiff));
 if(storymodeCurSelected == 0) {
    context.fillStyle = 'black';
    context.fillRect(850, 409 ,285, 720); 
    context.fillStyle = '#990344';
    context.fillText('Tutorial',894 - 25 + diffs[1].pos,409  + (80 * 1));
    }
}

function startGame(isCity = true) {
    if(isCity){
    isMenu = false;
    inCity = true;
    }else{
    isMenu = false;
    inTutorial = true;
    }
}

function startTutorial(isCity = false) {
    if(isCity){
    isMenu = false;
    inCity = true;
    }else{
    isMenu = false;
    inTutorial = true;
    }
}
