var status_object="";
var objects=[];
var alarm="";
function preload() {
    alarm=loadSound("alarm.mp3");
}
function setup() {
    canvas=createCanvas(640,420);
    canvas.position(320,150);
    video=createCapture(VIDEO);
    video.hide();
    object_detector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function draw() {
    image(video,0,0,640,420);
    if (status_object != "") {
        object_detector.detect(video,gotResults);
        for (i=0;i<objects.length;i++) {
            document.getElementById("status").innerHTML="Status: Object(s) Detected";
            fill("black");
            percentage=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percentage+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("#308254");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if (objects[i].label=="person") {
                document.getElementById("status").innerHTML="Status: Baby / Person Found";
                alarm.stop();
            }
            else {
                document.getElementById("status").innerHTML="Status: Baby / Person Not Found";
                alarm.play();
            }
        }
        if (objects.length==0) {
            document.getElementById("status").innerHTML="Status: Baby / Person Not Found";
            alarm.play();
        }
    }
}
function modelLoaded() {
    console.log("Model Loaded");
    status_object=true;
}
function gotResults(error,results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects=results;
    }
}