import * as fp from "fingerpose";
const handpose = require('@tensorflow-models/handpose');
require('@tensorflow/tfjs-backend-webgl');
import "./styles.css";

import {turnLeftGesture} from "./TurnLeft";
import {turnRightGesture} from "./TurnRight";

const predic = {
  newPredic: '',
  oldPredic: ''
}


const config = {
  video: { width: 640, height: 480, fps: 30 }
};

const landmarkColors = {
  thumb: 'red',
  indexFinger: 'blue',
  middleFinger: 'yellow',
  ringFinger: 'green',
  pinky: 'pink',
  palmBase: 'white'
};

const gestureStrings = {
  'thumbs_up': '👍',
  'victory': '✌🏻',
  'turn_left': 'left',
  'turn_right': 'right'

  // 'slide_left': '👈',
  // 'slide_right': '👉'
};

async function main() {

  const video = document.querySelector("#video");
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");

  const resultLayer = document.querySelector("#pose-result");

  // configure gesture estimator
  // add "✌🏻" and "👍" as sample gestures
  const knownGestures = [
    fp.Gestures.VictoryGesture,
    fp.Gestures.ThumbsUpGesture,
    turnLeftGesture,
    turnRightGesture
  ];
  const GE = new fp.GestureEstimator(knownGestures);

  // load handpose model
  const model = await handpose.load();
  console.log("Handpose model loaded");

  // main estimation loop
  const estimateHands = async () => {

    // clear canvas overlay
    ctx.clearRect(0, 0, config.video.width, config.video.height);
    resultLayer.innerText = '';

    // get hand landmarks from video
    // Note: Handpose currently only detects one hand at a time
    // Therefore the maximum number of predictions is 1
    const predictions = await model.estimateHands(video, true);

    for(let i = 0; i < predictions.length; i++) {

      // draw colored dots at each predicted joint position
      for(let part in predictions[i].annotations) {
        for(let point of predictions[i].annotations[part]) {
          drawPoint(ctx, point[0], point[1], 3, landmarkColors[part]);
        }
      }

      // now estimate gestures based on landmarks
      // using a minimum confidence of 7.5 (out of 10)
      const est = GE.estimate(predictions[i].landmarks, 7.5);

      if(est.gestures.length > 0) {

        // find gesture with highest confidence
        let result = est.gestures.reduce((p, c) => {
          return (p.confidence > c.confidence) ? p : c;
        });



        resultLayer.innerText = gestureStrings[result.name];

        predic.oldPredic = predic.newPredic;
        predic.newPredic = result.name;
        if(predic.oldPredic === 'turn_right' && predic.newPredic === 'turn_left' ){
          console.log('swipe left');
        }
        if(predic.oldPredic === 'turn_left' && predic.newPredic === 'turn_right' ){
          console.log('swipe right');
        }
        console.log(result.name);
      }
    }

    // ...and so on
    setTimeout(() => { estimateHands(); }, 1000 / config.video.fps);
  };

  estimateHands();
  console.log("Starting predictions");
}

async function initCamera(width, height, fps) {

  const constraints = {
    audio: false,
    video: {
      facingMode: "user",
      width: width,
      height: height,
      frameRate: { max: fps }
    }
  };

  const video = document.querySelector("#video");
  video.width = width;
  video.height = height;

  // get video stream
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  video.srcObject = stream;

  // console.log(video.videoHeight + 'px');
  // console.log(video.videoWidth);
  // video.style.setProperty('--element-height', video.videoHeight + 'px');
  // video.style.height = video.height.videoHeight + 'px';
  // console.log(video.height.videoHeight + 'px');
  // video.height.videoHeight;
  const canvas = document.querySelector("#canvas");
  let i = window.devicePixelRatio;
  canvas.style.setProperty('--element-ratio', String(i));
  console.log(i);

  return new Promise(resolve => {
    video.onloadedmetadata = () => { resolve(video) };
  });
}

function drawPoint(ctx, x, y, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

window.addEventListener("DOMContentLoaded", () => {

  initCamera(
    config.video.width, config.video.height, config.video.fps
  ).then(video => {
    video.play();
    video.addEventListener("loadeddata", event => {
      console.log("Camera is ready");
      main();
    });
  });

  const canvas = document.querySelector("#canvas");
  canvas.width = config.video.width;
  canvas.height = config.video.height;
  console.log("Canvas initialized");
});
