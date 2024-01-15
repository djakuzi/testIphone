let rot = document.querySelector('.menu-phone button')

rot.onclick = function(event){

    batteryIsland.innerHTML = '100';
    checkEnergy = setInterval(goCheckEnergy,5000)
    
}