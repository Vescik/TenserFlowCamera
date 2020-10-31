const camera = document.querySelector('.js-video');
const button = document.querySelector('.button');
const displaySize = {width:camera.width,height:camera.height};


const emotions = {
	'neutral': 'Neutralny 😐',
	'surprised': 'Zaskoczony 😮',
	'disgusted': 'Zniesmaczony',
	'fearful': 'Wystraszony 😨',
	'sad': 'Smutny 🙁',
	'angry': 'Zły 😠',
	'happy': 'Wesoły 😃',
}


function startVideo(){
    navigator.getUserMedia({video: true},
        (stream) => {
            camera.srcObject = stream
        },
        (err) => console.error(err)
        
        )
}

startVideo();
``
Promise.all([
	faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
	faceapi.nets.faceExpressionNet.loadFromUri('/models'),
]).then(startVideo)

camera.addEventListener('play',detectFace)

async function detectFace(){
    const options = new faceapi.TinyFaceDetectorOptions();

    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(camera,options).withFaceExpressions();

        if(detections[0]){
            console.log(detections[0])
        }
    },100)
}
