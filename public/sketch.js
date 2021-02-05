// ml5.js: Pose Classification
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/Courses/ml5-beginners-guide/7.2-pose-classification.html
// https://youtu.be/FYgYyq-xqAw

// All code: https://editor.p5js.org/codingtrain/sketches/JoZl-QRPK

// Separated into three sketches
// 1: Data Collection: https://editor.p5js.org/codingtrain/sketches/kTM0Gm-1q
// 2: Model Training: https://editor.p5js.org/codingtrain/sketches/-Ywq20rM9
// 3: Model Deployment: https://editor.p5js.org/codingtrain/sketches/c5sDNr8eM

let video;
let pose;
let skeleton;
let hand;

let brain;
let poseLabel = "Y";

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();

 handpose = ml5.handpose(video, modelLoaded);
   let options = {
    inputs: 21,
    outputs: 3,
    task: 'classification',
    debug: true
  }
  brain = ml5.neuralNetwork(options);
  const modelInfo = {
    model: 'hand/model13.json',
    metadata: 'hand/model_meta13.json',
    weights: 'hand/model.weights13.bin',
  };
  brain.load(modelInfo, brainLoaded);
}

function brainLoaded() {
  console.log('pose classification ready!');
  classifyPose();
}

function classifyPose(hand) {
  if (hand) {
    let inputs = [];
    let landmarks = hand.landmarks
    for (let i = 0; i < landmarks.length; i++) {
      let [x,y,z] = landmarks[i];
      inputs.push(x);
      inputs.push(y);
      inputs.push(z);
    }
    brain.classify(inputs, gotResult);
  } else {
    setTimeout(classifyPose, 100);
  }
}

function gotResult(error, results) {
  
  if (results[0].confidence > 0.20) {
    poseLabel = results[0].label.toUpperCase();
  }
  console.log(results[0].label)
  console.log(results[0].confidence, "confidence");
  classifyPose();
}


function gotPose(results) {
  
   if (results.length > 0) {
     hands = results;
     hand = hands[0];
     console.log(hand)
      let inputs = [];
    let landmarks = hand.landmarks
    for (let i = 0; i < landmarks.length; i++) {
      let [x,y,z] = landmarks[i];
      inputs.push(x);
      inputs.push(y);
      inputs.push(z);
    }
    console.log(brain.classify(inputs, gotResult), "brain")
//      console.log(inputs, "inputs")
  

    // skeleton = poses[0].skeleton;
  }
}


function modelLoaded() {
  console.log('poseNet ready');
  handpose.on('predict', gotPose);
}

function draw() {
  push();
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0, video.width, video.height);

  if (pose) {
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(0);

      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0);
      stroke(255);
      ellipse(x, y, 16, 16);
    }
  }
  pop();

  fill(255, 0, 255);
  noStroke();
  textSize(512);
  textAlign(CENTER, CENTER);
  text(poseLabel, width / 2, height / 2);
}