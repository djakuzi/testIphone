let rot = document.querySelector('.menu-phone_but')

rot.onclick = function(event){

    batteryIsland.innerHTML = '100';
    checkEnergy = setInterval(goCheckEnergy,5000)
    
}

let scaleButCharge = document.querySelector('#scaleButCharge')

function goScaleButCharge(){

    rot.classList.toggle('sizebut')
    // setTimeout(()=> rot.classList.toggle('sizebut'), 1500)
    scaleButCharge.addEventListener('pointerleave', goScaleButCharge)
}

scaleButCharge.addEventListener('pointerenter', goScaleButCharge)