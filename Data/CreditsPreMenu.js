var creditsNames = [{name: 'Sashko - coder,composer,artist,animator,Director',link: 'https://www.youtube.com/channel/UC4mGkD8wSagXZstn16Lo6sA'}
,{name: 'ben_sheen - artist,animator', link: ''}
,{name: 'jakekUp sherlock - artist', link: ''}
,{name: 'Dom - composer', link: ''}
,{name: 'Frenzy Ghost - Creator of the Idea', link: ''}
,{name: '', link: ''}],isCredits = false;

new URL('http://www.example.com', );

function drawCreditsMenu() {
    drawImage(lilDark,0,0, 1300, 720);
    context.fillStyle = "gray";
    context.fillRect(205, 75 ,850, 620);
    context.fillStyle = "white";
    context.font = "100px SHOWCARD GOTHIC";
    context.fillText("CREDITS",400, 5);
    for (var i = 0; i < creditsNames.length; i++) {
        context.font = "25px SHOWCARD GOTHIC";
        context.fillText(creditsNames[i].name,250, 100 + (60 * i));  
    }    
}

function openCredits() {
isCredits = true;

}

function closeCredits() {
    
}