let carousel = document.querySelector('.carousel'),
desktop = document.querySelector(".desktop"),
coordDesktop = desktop.getBoundingClientRect() // coord desktop

carousel.addEventListener('pointerenter',function(){

    carousel.addEventListener('pointerdown', function(event){

        let startTime = new Date().getTime()

        goMoveDes(event)

        carousel.addEventListener('pointerup',function(){
            
            let endtime = new Date().getTime()
            if(endtime - startTime < 1000){
                alert('')
            }
        })
        
    })

    carousel.ondragstart = function() {
        return false;
    };
   
})


carousel.addEventListener('onclick',function(event){

    if(event.target.closest('.icon')) alert()
 
})



function goMoveDes(event){
    event.preventDefault()

    let qIcons = document.querySelectorAll('.carousel .icons').length
    let translate = parseInt(getComputedStyle(carousel).translate)
    let width = document.querySelector('.carousel .icons').offsetWidth // width icons

    let sideSwipe //left or right
    let startX = event.clientX - coordDesktop.left
    let checkedX = startX // for checked side swipe 
    let lastChekedX = startX

    let sumXForSwipe 

    if(qIcons > 1){
        
        function moveSwipe(event){

            event.preventDefault()

            let moveX = event.clientX - coordDesktop.left
            let resTranslate = Math.min((translate - (startX - moveX)),0)

            check.innerHTML = sumXForSwipe +  ' '+ width/4

            carousel.style.translate = resTranslate + 'px'

            if(checkedX > moveX){
                checkedX = moveX

                if(sideSwipe == 'right') {
                    lastChekedX = moveX
                }

                sideSwipe = 'left'
                sumXForSwipe = lastChekedX - moveX
            }

            if(checkedX < moveX){
                checkedX = moveX

                if(sideSwipe == 'left') {
                    lastChekedX = moveX
                }

                sideSwipe = 'right'
                sumXForSwipe = (lastChekedX - moveX) * -1
            }

            //сделать left or right и по ним определять в какую сторону хуярить max or min use NO REMEMBER
        }

        function resultSwipe(){

            if(sumXForSwipe <= width/2){
                carousel.style.translate = translate + 'px'
            }

            if(sideSwipe == 'left' && sumXForSwipe >= width/4){
                carousel.style.translate = Math.max(-(width * (qIcons - 1)), translate - width)  + 'px'
            }

            if(sideSwipe == 'right' && sumXForSwipe >= width/4){
                carousel.style.translate = Math.min(0, translate + width) + 'px'
            }

            document.removeEventListener('pointermove',moveSwipe)
            document.removeEventListener('pointerup',resultSwipe)
            carousel.removeEventListener('pointerleave',resultSwipe)
            
        } // test for pointerUp or pointerleave

        document.addEventListener('pointermove', moveSwipe)
        document.addEventListener('pointerup', resultSwipe)
        carousel.addEventListener('pointerleave', resultSwipe)
    }

} //for swipe screen


