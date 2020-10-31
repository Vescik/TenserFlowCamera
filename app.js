const camera = document.querySelector('.js-video');
const button = document.querySelector('.button');
const displaySize = {width:camera.width,height:camera.height};


function startVideo(){
    navigator.getUserMedia({video: true},
        (stream) => {
            camera.srcObject = stream
        },
        (err) => console.error(err)
        
        )
}

button.addEventListener('click', startVideo)
