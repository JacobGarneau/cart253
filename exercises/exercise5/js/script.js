/**************************************************
Exercise 5 - Juggle Garden (Juggle route)
Jacob Garneau

Here is a description of this template p5 project.
**************************************************/
"use strict";

let paddleMouse;
let paddleKeyboard;
let balls = [];
let numBalls = 10;
let gravityForce = 0.0025;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);

  paddleMouse = new PaddleMouse(200, 10);
  paddleKeyboard = new PaddleKeyboard(200, 10);

  for (let i = 0; i < numBalls; i++) {
    let ball = new Ball(random(0, width), random(0, height));
    balls.push(ball);
  }
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  paddleMouse.move();
  paddleKeyboard.move(
    keyIsDown(LEFT_ARROW),
    keyIsDown(65),
    keyIsDown(RIGHT_ARROW),
    keyIsDown(68)
  );
  paddleMouse.display();
  paddleKeyboard.display();

  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];

    if (ball.active) {
      ball.gravity(gravityForce);
      ball.move();
      ball.bounce(paddleMouse);
      ball.bounce(paddleKeyboard);
      ball.display();
    }
  }
}
