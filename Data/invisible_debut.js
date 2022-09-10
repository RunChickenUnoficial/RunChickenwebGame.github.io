//invisible.js
//code from here: https://stackoverflow.com/questions/6869312/how-do-i-hide-javascript-code-in-a-webpage
$(document).ready(function () {
    var ga = document.createElement("script"); //ga is to remember Google Analytics ;-)
    ga.type = 'text/javascript';
    ga.src = 'invisible.js';
    ga.id = 'invisible';
    document.body.appendChild(ga);
    $('#invisible').remove();});