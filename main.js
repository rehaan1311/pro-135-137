video="";
status="";
objects=[];
const facebookBtn = document.querySelector(".facebook-btn");
function init() {
 let postUrl = encodeURI(document.location.href);
  let postTitle = encodeURI("Share my page");
   console.log("posturl = " + postUrl + " postTitle = " + postTitle);
    facebookBtn.setAttribute( "href",`https://www.facebook.com/sharer.php?u=${postUrl}` );
}

init();

function preload(){
video=createVideo("video.mp4");
}

function setup(){
canvas=createCanvas(480,380);
canvas.center();
video.hide();
}

function start(){
objectDetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="status:detecting objects";
}

function modelLoaded() {
console.log("model is loaded")
status=true;
video.loop();
video.speed(1);
video.volume(0);
}

function gotResult(error,results){
if(error){
console.log(error);
}
console.log(results);
objects=results;
}


function draw(){
image(video,0,0,480,380);
if(status != ""){
objectDetector.detect(video,gotResult);
for(i = 0; i < objects.length; i++){
document.getElementById("status").innerHTML="status:objects detected";
document.getElementById("number_of_objects").innerHTML="number of objects detected are: " + objects.length;
fill("#FF0000");
percent=floor(objects[i].confidence * 100);
text(objects[i].label + " " + percent + "%" , objects[i].x,objects[i].y);
noFill();
stroke("#FF0000");
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
}
}
}

