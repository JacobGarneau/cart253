/**************************************************
Exercise 6 - Make Some Noise
Jacob Garneau

Since the songs are not of the same length, there will be a moment of silence in the "forest" song until the others end.
All music was made by me.
**************************************************/

"use strict";

let user;
let music = {
  desert: undefined,
  cold: undefined,
  forest: undefined,
};

let synth;

let note = {
  neutral: `C4`,
  desert: `E5`,
  cold: `C#6`,
  forest: `C#5`,
};

function preload() {
  music.desert = loadSound(`assets/sounds/desert_music.mp3`);
  music.cold = loadSound(`assets/sounds/cold_music.mp3`);
  music.forest = loadSound(`assets/sounds/forest_music.mp3`);
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);
  user = new User();

  synth = new p5.PolySynth();

  music.desert.setVolume(0, 0);
  music.cold.setVolume(0, 0);
  music.forest.setVolume(0, 0);

  music.desert.play();
  music.cold.play();
  music.forest.play();

  loopMusic();
}

function loopMusic() {
  music.desert.loop(98);
  music.cold.loop(98);
  music.forest.loop(98);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);
  noStroke();

  fill(255, 200, 0);
  rect(0, 0, width / 2, height / 2);
  fill(0, 200, 255);
  rect(0, height / 2, width / 2, height / 2);
  fill(100, 200, 100);
  rect(width / 2, height / 2, width / 2, height / 2);

  fill(255);
  ellipse(mouseX, mouseY, user.size);

  checkEnvironment();
}

function checkEnvironment() {
  let dX = dist(mouseX, 0, width / 2, 0);
  let dY = dist(0, mouseY, 0, height / 2);

  //  Trigger desert music
  if (
    (dX < user.size && mouseY < height / 2) ||
    (dY < user.size && mouseX < width / 2)
  ) {
    music.desert.setVolume(1, 1);
  } else if (mouseX < width / 2 && mouseY < height / 2) {
  } else {
    music.desert.setVolume(0, 0.5);
  }

  //  Trigger cold music
  if (
    (dX < user.size && mouseY > height / 2) ||
    (dY < user.size && mouseX < width / 2)
  ) {
    music.cold.setVolume(1, 1);
  } else if (mouseX < width / 2 && mouseY > height / 2) {
  } else {
    music.cold.setVolume(0, 0.5);
  }

  //  Trigger forest music
  if (
    (dX < user.size && mouseY > height / 2) ||
    (dY < user.size && mouseX > width / 2)
  ) {
    music.forest.setVolume(1, 1);
  } else if (mouseX > width / 2 && mouseY > height / 2) {
  } else {
    music.forest.setVolume(0, 0.5);
  }
}

function mousePressed() {
  userStartAudio();
  playNote();
}

function playNote() {
  if (mouseX < width / 2 && mouseY < height / 2) {
    synth.play(note.desert, 0.4, 0, 1);
  } else if (mouseX < width / 2 && mouseY > height / 2) {
    synth.play(note.cold, 0.4, 0, 1);
  } else if (mouseX > width / 2 && mouseY > height / 2) {
    synth.play(note.forest, 0.4, 0, 1);
  } else {
    synth.play(note.neutral, 0.4, 0, 1);
  }
}
