/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
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

function createBall(x, y) {
  let ball = new Ball(x, y);
  balls.push(ball);
}

function mousePressed() {
  createBall(mouseX, mouseY, random(notes));
  userStartAudio();
}
