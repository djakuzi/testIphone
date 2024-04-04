
let onOff = document.querySelector('.on-off')
let soundUp = document.querySelector('.sound-up')
let soundDawn = document.querySelector('.sound-dawn')
let silentMode = document.querySelector('.silent-mode')

let startTime 
let endTime 

let conditionIphoneOnOff = true  //true == on, false == off --- iphone
let conditionScreenOnOff = false //true == on, false == off --- screen

let testForScreenOff = true //true == screeOff on, false == screenOff off
let intervalOn // for setTimeout, because need up opacity

onOff.onpointerdown = function(event){

    startTime = new Date().getTime()
    return false // off standart window

}

onOff.onpointerup = function(){

    let platform = document.querySelector('.platform')
    let hidden = platform.hidden
    let islandTime = document.querySelector('.island #time')
    let lockedScreen = document.querySelector('.locked-screen')

    endTime = new Date().getTime()

    if(conditionScreenOnOff && !hidden && endTime - startTime < 2000 && testForScreenOff && conditionIphoneOnOff){
         
         conditionScreenOnOff = false

         let i = 1
         platform.style.transition = 'opacity .1s'
         
         intervalOnOff = setTimeout(function go(){
            platform.style.opacity = `${i}`
            i -= 0.1
            if (i < 0)  {
                platform.style.opacity = '0'
                platform.hidden = true
                
                clearTimeout(intervalOnOff)
            } else {
                intervalOnOff = setTimeout(go, 20)
            }
         }, 20);

    } // if i want off screen

    if(conditionScreenOnOff && !hidden && endTime - startTime > 2000 && conditionIphoneOnOff){

        if(testForScreenOff){

            testForScreenOff = false

            let screenOff = document.createElement('div')
            screenOff.className = "screenOff";

            screenOff.style.cssText = ` 
            position: absolute;
            top: 0%;
            width: 100%;
            height: 100%;
            opacity: .0;
            transition: opacity .4s;
            border-radius: 5vh;
            backdrop-filter: blur(12px);
            z-index: 100;
            `; //css-style for screenOff

            screenOff.innerHTML = '<div id="stripOff"> <h1> Выключите </h1> </div> <div id="offScreenOff"></div> <h1 id="textScreenOff">Отменить</h1>'
            //create elements: stripOff, offScreenOff for screenOff div
            platform.append(screenOff)

            setTimeout(()=> screenOff.style.opacity = '1', 100) // smooth appearance screenOff
            
            stripOff.style.cssText = `
            position: absolute;
            display: flex;
            top: 12%;
            right: 20%;
            width: 60%;
            height: 8%;
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 5vh;
            align-items: center;
            gap: 10%
            `

            let circleOff = document.createElement('div')

            circleOff.style.cssText = `
            position: absolute;
            left: 1.5%;
            width: 26%;
            height: 92%;
            border-radius: 5vh;
            background: white;
            display: flex;
            align-items: center;
            z-index: 10;
            `

            stripOff.prepend(circleOff)

            let imgStripOff = document.createElement('img')
            imgStripOff.src = './img/StripOff.jpg'
            imgStripOff.style.cssText = `
            display: block;
            width: 50%;
            height: 50%;
            margin: 0 auto`;

            circleOff.append(imgStripOff)

            circleOff.setAttribute('id','circleOff')

            let h1StripOff = stripOff.querySelector('h1')

            h1StripOff.style.cssText = `
            margin-left: 40%;
            font-size: 2vh;
            animation-name: h1StripOff;
            animation-duration: 1.6s;
            animation-iteration-count: infinite;
            animation-direction: alternate-reverse;
            animation-fill-mode: forwards;
            animation-timing-function: ease-in-out;
            `

            offScreenOff.style.cssText = `
            position: absolute;
            border-radius: 90%;
            width: 22%;
            height: 10%;
            top: 78%;
            left: 40%;
            background-color: rgba(255, 255, 255, 1);
            `

            offScreenOff.append(document.createElement('div'))

            textScreenOff.style.cssText = `
            display: block;
            position: absolute;
            color: white;
            top: 89%;
            left: 41.5%;
            font-size: 2vh;
            `
            
            offScreenOff.onclick = function(){

                testForScreenOff = true
                screenOff.style.opacity = '0'
                setTimeout(()=> screenOff.remove(), 200)
                screenOff.onclick = null

                lockedScreen.style.display = 'block'
                islandTime.hidden = true
            } // but exit screenOff

            // left-right stripOff
            circleOff.onpointerdown = function(event){
                
                let shiftX = event.clientX - circleOff.getBoundingClientRect().left
                let coordPointerX = event.clientX

                let widthStripStart = stripOff.offsetWidth // width StripOff start 
                let minWidthStrip = circleOff.offsetWidth + (circleOff.getBoundingClientRect().left - stripOff.getBoundingClientRect().left)
            
                let rightStrip = stripOff.getBoundingClientRect().right
                let distanseCursorCircle = circleOff.getBoundingClientRect().right - event.clientX
            
                //remmeber size circle PX
                circleOff.style.width = circleOff.offsetWidth + 'px'
                stripOff.style.width = widthStripStart + 'px';

                let widthOpacityPercent = 1 / widthStripStart
            
                //create element Night for opacity screen
                let nightElement = document.createElement('div')
                nightElement.style.cssText = `
                position: absolute;
                top: 0%;
                width: 100%;
                height: 100%;
                opacity: 0.0;
                background-color: rgba(0, 0, 0, 1);
                `
                screenOff.append(nightElement)
            
                function goCircle(event){
            
                    let stripWidth = stripOff.offsetWidth
                    let stripWidthEnd
                    h1StripOff.hidden = true

                    stripWidthEnd = rightStrip - (event.clientX + distanseCursorCircle) + minWidthStrip

                    if (stripWidthEnd > widthStripStart) stripWidthEnd = widthStripStart
                    if (stripWidthEnd < minWidthStrip) stripWidthEnd = minWidthStrip

                    nightElement.style.opacity = (1 / widthStripStart) * (widthStripStart-stripWidth + circleOff.offsetWidth/2) + ''
                    stripOff.style.width = stripWidthEnd + 'px'
                    
                }
            
                document.addEventListener('pointermove', goCircle)
            
                document.onpointerup = function(){
            
                    let stripWidth = parseInt(getComputedStyle(stripOff).width)
            
                    if(stripWidth > widthStripStart/2) {
                        stripOff.style.width = '60%'
                        h1StripOff.hidden = false
                    }
            
                    if(stripWidth < widthStripStart/2) {
                        stripOff.style.width = circleOff.offsetWidth + 'px'
                        platform.hidden = true
                        conditionIphoneOnOff = false
                        testForScreenOff = true
                        screenOff.remove()
                    }
            
                    nightElement.remove()
                    document.removeEventListener('pointermove',goCircle)
                    document.onpointerup = null
                }
            
                return false
            }
            
            circleOff.ondragstart = function() {
                return false;
            };

        }

    } // if i want off iphone

    if (!conditionIphoneOnOff && endTime - startTime > 2000){

       if(testForScreenOff){

        let logoIphone = document.createElement('img')
        logoIphone.src = './img/logoIphone.svg'
        let iphone = document.querySelector('.iphone')
        logoIphone.classList.add('logo-Iphone')
        testForScreenOff = false
        logoIphone.style.cssText = `
            display: block;
            z-index: 10;
            width: 16%;
            height: 10%;
            margin: 80% auto`;
        iphone.append(logoIphone)

        setTimeout( function(){
            logoIphone.remove()
            platform.hidden = false
            islandTime.hidden = true
            let lockedScreen = document.querySelector('.locked-screen')
                lockedScreen.style.display = 'block'

            platform.style.opacity = '0'
            testForScreenOff = true
            conditionIphoneOnOff = true 
            conditionScreenOnOff = true
            setTimeout(()=> platform.style.opacity = '1', 200)
        },3000)

       }
        
    }

    if(!conditionScreenOnOff && hidden && conditionIphoneOnOff){

        platform.hidden = false
        conditionScreenOnOff = true

        islandTime.hidden = true
        lockedScreen.style.display = 'block'

        let i = 0
        platform.style.opacity = `0`
        platform.style.transition = 'opacity .5s'
        setTimeout( () => platform.style.opacity = `1`, 100);

    }// if i want on screen

    return false
}