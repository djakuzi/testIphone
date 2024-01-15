function DateTime() {
    let timer;

    function render() {

        const optionsForDate1 = {
            month: 'long',
            day: 'numeric',
        }

        const optionsForDate2 = {
            weekday: 'long'
        }

        let date = new Date()

        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let mins = date.getMinutes();
        if (mins < 10) mins = '0' + mins;

        document.querySelector('.box-dataDayTime #time').innerHTML = hours + ':' + mins;
        document.querySelector('.island #time').innerHTML = hours + ':' + mins;
        

        let weekDay = date.toLocaleDateString('ru-RU', optionsForDate2)
        dateDay.innerHTML =  weekDay.replace(/./,weekDay[0].toUpperCase()) 
        + ', '+ date.toLocaleDateString('ru-RU', optionsForDate1) ;

    }

    this.start = function() {
        render();
        timer = setInterval(render, 1000);
    };

}

let dateTime = new DateTime();
dateTime.start();

let lineUnlock = document.querySelector('.line-unlock')

lineUnlock.onpointerdown = function(event){

    let lockedScreen = document.querySelector('.locked-screen')
    let iconsLockedScreen = lockedScreen.querySelector('.locked-screen_icons')
    let flashlight = lockedScreen.querySelector('.flashlight')
    let camera = lockedScreen.querySelector('.camera')

    //coord elements
    let maxHeightLockedScreen = lockedScreen.offsetHeight

    lockedScreen.style.height = maxHeightLockedScreen + 'px'
    lineUnlock.style.height = lineUnlock.offsetHeight + 'px'
    flashlight.style.height = flashlight.offsetHeight + 'px'
    camera.style.height = camera.offsetHeight + 'px'

    function moveSwipeUnlockScreen(event){

        let coordLineUnlock = lineUnlock.getBoundingClientRect()
        let coordLockedScreen = lockedScreen.getBoundingClientRect()

        let distanceLockedScreenOfLineUnlock = coordLockedScreen.bottom - coordLineUnlock.bottom

        let height = (event.clientY + distanceLockedScreenOfLineUnlock) - coordLockedScreen.top

        if(height > maxHeightLockedScreen) height = maxHeightLockedScreen

        lockedScreen.style.height = height + 'px'
        iconsLockedScreen.style.opacity = (1/maxHeightLockedScreen) * (lockedScreen.offsetHeight/2) + ""
    }

    function upSwipeUnlockScreen(){

        let islandTime = document.querySelector('.island #time')

        if(lockedScreen.offsetHeight > maxHeightLockedScreen/1.4){
            lockedScreen.style.height = ''
            lockedScreen.style.borderBottom = ''
            lineUnlock.style.height = '.5%'
            iconsLockedScreen.style.opacity = '1'
            flashlight.style.height = ''
            camera.style.height = ''
        }

        if(lockedScreen.offsetHeight < maxHeightLockedScreen/1.4){
            lockedScreen.style.display = 'none'
            lockedScreen.style.height = ''
            lockedScreen.style.borderBottom = ''
            lineUnlock.style.height = '.5%'
            iconsLockedScreen.style.opacity = '1'
            flashlight.style.height = ''
            camera.style.height = ''
            islandTime.hidden = false
        }

        document.removeEventListener('pointermove',moveSwipeUnlockScreen)
        document.removeEventListener('pointerup',upSwipeUnlockScreen)
    }

    document.addEventListener('pointermove',moveSwipeUnlockScreen)
    document.addEventListener('pointerup',upSwipeUnlockScreen)

    lineUnlock.ondragstart = function() {
        return false;
    };

    lockedScreen.style.borderBottom = 'solid #ccc'
    return false
}
