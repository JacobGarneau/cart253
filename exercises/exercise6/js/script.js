/**************************************************
Exercise 6 - Make Some Noise
Jacob Garneau

An attempt at dynamically-changing environment music. Move the cursor between the colored areas to transition between the three tracks.
Clicking in any of the areas will produce a note that fits in with the scale of the song that is being played.
Since the songs are not of the same length, there will be a moment of silence in the "desert" and "forest" song until "cold" ends.
All music was made by me.
**************************************************/

"use strict";

let user;
let music = {
  desert: undefined,
  cold: undefined,
  forest: undefined,
};

let musicIsPlaying = false;
let synth;

let note = {
  neutral: `C4`,
  desert: `E5`,
  cold: `C#6`,
  forest: `C#5`,
};

//  preload()
//  p5: Loads the sound files
function preload() {
  music.desert = loadSound(`assets/sounds/desert_music.mp3`);
  music.cold = loadSound(`assets/sounds/cold_music.mp3`);
  music.forest = loadSound(`assets/sounds/forest_music.mp3`);
}

//  setup()
//  p5: Sets up the necessary variables
function setup() {
  createCanvas(windowWidth, windowHeight);
  user = new User();

  music.desert.setVolume(0, 0);
  music.cold.setVolume(0, 0);
  music.forest.setVolume(0, 0);

  synth = new p5.PolySynth();
}

//  draw()
//  p5: Draws the stage components and the user cursor
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
  loopMusic();
}

//  checkEnvironment()
//  Plays the appropriate track depending on the location of the cursor
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

//  loopMusic()
//  Loops all the music once the longest track has ended
function loopMusic() {
  if (music.cold.isPlaying()) {
  } else {
    music.desert.stop();
    music.cold.stop();
    music.forest.stop();

    music.desert.play();
    music.cold.play();
    music.forest.play();
  }
}

//  mousePressed()
//  p5: Starts audio (once) and plays notes
function mousePressed() {
  userStartAudio();
  playNote();

  if (musicIsPlaying) {
  } else {
    music.desert.play();
    music.cold.play();
    music.forest.play();

    musicIsPlaying = true;
  }
}

//  playNote()
//  Plays the appropriate note depending on the area in which the cursor is located
function playNote() {
  if (mouseX < width / 2 && mouseY < height / 2) {
    synth.play(note.desert, 0.2, 0, 1);
  } else if (mouseX < width / 2 && mouseY > height / 2) {
    synth.play(note.cold, 0.2, 0, 1);
  } else if (mouseX > width / 2 && mouseY > height / 2) {
    synth.play(note.forest, 0.2, 0, 1);
  } else {
    synth.play(note.neutral, 0.2, 0, 1);
  }
}
