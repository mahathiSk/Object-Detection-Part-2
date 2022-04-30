Status ="";
fan_image ="";
Objects =[];

function preload() {
    fan_image =loadImage("Fan.Jpg")
}

function setup() {
    canvas =createCanvas(640,350)
    canvas.position(315,200)
    object_detector =ml5.objectDetector('cocossd', ModelLoaded);
    document.getElementById("status").innerHTML ="Status :Detecting Objects";
}

function ModelLoaded() {
    console.log("Model is Loaded");
    Status =true;
    object_detector.detect(fan_image, gotResults)
}

function gotResults(error,results) {
    if(error) {
        console.error(error);
    }
    console.log(results);
    Objects =results;
}

function draw() {
    image(fan_image,0,0,640,350)
    if(Status != "") {
        for(i =0; i < Objects.length; i++) {
            document.getElementById("Status").innerHTML ="Status :Objects Detected";

            fill("#fc0303")
            percent =floor(Objects[i].confidence * 100);
            text(Objects[i].label + "  " +percent + "%",Objects[i].x -800, Objects[i].y -175 )
            noFill()
            rect(Objects[i].x -800, Objects[i].y -175, Objects[i].width- 910, Objects[i].height -2640)
            stroke("#fc0303")
        }
    }
}