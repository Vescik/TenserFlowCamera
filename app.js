const camera = document.querySelector('.js-video');
const button = document.querySelector('.button');
const canvas = document.querySelector('.js-overlay');
const resultion = document.querySelector('.js-emotion')
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

function showExpression({expressions}){
    const arr = Object.entries(expressions)
    const max  = arr.reduce((acc, current) => {
        return acc[1] > current[1] ? acc : current;
    },[])
    resultion.textContent = emotions[max[0]];
}


async function detectFace(){
    const options = new faceapi.TinyFaceDetectorOptions();

    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(camera,options).withFaceExpressions();

        if(detections[0]){ 
            showExpression(detections[0])
        }
    },100)
}
