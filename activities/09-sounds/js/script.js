/**************************************************
Exercise 6 - Make Some Noise
Jacob Garneau

A
**************************************************/

"use strict";

let balls = [];
let notes = [`F3`, `G3`, `Ab4`, `Bb4`, `C4`, `Db4`, `Eb4`, `F4`];

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  for (let i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].bounce();
    balls[i].display();
  }
}

function createBall(x, y, notes) {
  let ball = new Ball(x, y, notes);
  balls.push(ball);
}

function mousePressed() {
  createBall(mouseX, mouseY, random(notes));
  userStartAudio();
}
