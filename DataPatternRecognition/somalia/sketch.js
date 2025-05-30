
let classifier;
let video;
let label = "model loading...";
let images = {};
let confidence;
let imagemodeURL = "https://teachablemachine.withgoogle.com/models/sg-rq04hv/";

function preload(){
  ml5.setBackend('webgl')

  images["Hospitals"] = loadImage("hospitals.png");
  images["Casualties"] = loadImage("casualties.png");
  images["BoM"] = loadImage("BoM.png");
  images["Drought"] = loadImage("Drought.png");
  images["Malnutrition"] = loadImage("Malnutrition.png");
  images["Occupied areas"] = loadImage("OccupiedAreas.png");
}


function setup() {
  createCanvas(800, 600);
  video = createCapture(VIDEO);
  video.size(640,480);
  video.hide()
  classifier = ml5.imageClassifier(imagemodeURL + "model.json", video, modelReady);

  textAlign(CENTER, TOP);
  textSize(20);
}

function modelReady(){
  console.log("model loaded!");
  classifyVideo();
}

function classifyVideo() {
  classifier.classify(video,gotResult);
}

function gotResult(error,results){
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label.trim();
  
  classifyVideo();
}


function draw() {
  background(255);

  push();
  translate(width, 0);
  scale(-1, 1);
  image(video,(width - video.width)/2, (height - video.height)/2);
  pop();


  if (images[label]){
    imageMode(CENTER);
    image(images[label],width/2,height/2,300,300);
  }else {
  fill("red");
  text("No image found for label: " + label, width / 2, height / 2);
}



  fill(0);
  noStroke();
  text("No home for an enemy on land that my father stole", width / 2,20);


}


