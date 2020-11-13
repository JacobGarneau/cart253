/**************************************************
Exercise 6 - Make Some Noise
Jacob Garneau

All music was made by me.
**************************************************/

"use strict";

let user;
let music = {
  desert: undefined,
  cold: undefined,
  forest: undefined,
};

function preload() {
  music.desert = loadSound(`assets/sounds/desert_music.mp3`);
  music.cold = loadSound(`assets/sounds/desert_music.mp3`);
  music.forest = loadSound(`assets/sounds/desert_music.mp3`);
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);
  user = new User();
  music.desert.play();
  music.cold.play();
  music.forest.play();
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  rect(0, 0, width / 2, height / 2);
  rect(width / 2, height / 2, width / 2, height / 2);

  for (let i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].bounce();
    balls[i].display();
  }
}

function mousePressed() {
  if (randomNumber < 33) {
    let scale = notes.major;
  } else if ((randomNumber >= 33) & (randomNumber < 66)) {
    let scale = notes.minor;
  } else if (randomNumber >= 66) {
    let scale = notes.pentatonic;
  }

  createBall(mouseX, mouseY, random(scale));
  userStartAudio();
}
