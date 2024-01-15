
let batteryIsland = document.querySelector('.box-battery #battery')
let startTimeBattery = new Date()
let checkEnergy = setInterval(goCheckEnergy,5000)

function goCheckEnergy(percent=1){

    let checkTime = new Date()
    batteryIsland.innerHTML = batteryIsland.innerHTML - ( 1 * percent) + ''

    if (batteryIsland.innerHTML <= 0){
        let platform = document.querySelector('.platform')
        platform.hidden = true
        testForScreenOff = true
        conditionIphoneOnOff = false
        clearInterval(checkEnergy)
    }
} 

