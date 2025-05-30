let classifier;
let video;
let label = "Model loading..."
let confidence;
let images = {};
let imagemodeURL = "https://teachablemachine.withgoogle.com/models/sg-rq04hv/";

function preload(){
  ml5.setBackend('webgl');
  images["Hospitals"] = loadImage("hospitals.png");
  images["Casualties"] = loadImage("casualties.png");
  images["BoM"] = loadImage("BoM.png");
  images["Drought"] = loadImage("Drought.png");
  images["Malnutrition"] = loadImage("Malnutrition.png");
  images["Occupied areas"] = loadImage("OccupiedAreas.png");

    classifier = ml5.imageClassifier(imagemodeURL + "model.json", {flipped: true,});
}

function setup(){
    createCanvas(900,700);
    video = createCapture(video, {flipped: true});
    video.size(640,480);
    video.hide()
    classifier.classifyStart(video, gotResult);

    textAlign(CENTER,TOP);
    textSize(20);
  }
function draw(){
    background(255);
    image(video,width/2,height/2,500,500);
    

    if (images[label]){
    imageMode(CENTER);
    image(images[label],width/2,height/2,500,500);
  }
  
    textSize(32);
    fill(255);
    textAlign(CENTER,CENTER);
    text(label,width/2,height-16);
    fill(0);
    noStroke();

}

function gotResult(results){
    label = results[0].label;
    confidence = round(results[0].confidence,2);
}