class Healthbar {
constructor(){
//Healt
let curHealth = 50, iconPos = 180;
var whereHealth = 125;
function createHealthbar(params) {
    context.fillStyle = "black";
    console.log(params);
    context.fillRect(200 + whereHealth, 25 ,575, 10);
    context.fillRect(200 + whereHealth, 55 ,575, 10);
    context.fillRect(195 + whereHealth, 25 ,10, 40);
    context.fillRect(775 + whereHealth, 25 ,10, 40);

    context.fillStyle = "#808080";
    context.fillRect(200 + whereHealth, 30 ,iconPos, 30);    
}

}   
}