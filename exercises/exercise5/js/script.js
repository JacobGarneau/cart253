/**************************************************
Exercise 5 - Juggle Garden (Juggle route)
Jacob Garneau

An intense two-handed juggling simulator.
**************************************************/
"use strict";

let paddleMouse;
let paddleKeyboard;
let paddleWidth = 80;
let paddleHeight = 12;
let balls = [];
let numBalls = 5;
let gravityForce = 0.0025;
let ballBounces = 25;
let ballFalls = 10;

let displayFont;
let state = `title`; // title, simulation, goodEnding, badEnding

//  preload()
//  p5: Loads the required assets
function preload() {
  displayFont = loadFont("assets/fonts/bahnschrift.ttf");
}

//  setup()
//  p5: Sets up the necessary parameters
function setup() {
  createCanvas(windowWidth, windowHeight);

  paddleMouse = new PaddleMouse(paddleWidth, paddleHeight);
  paddleKeyboard = new PaddleKeyboard(paddleWidth, paddleHeight);

  for (let i = 0; i < numBalls; i++) {
    let ball = new Ball(random(0, width), random(0, height));
    balls.push(ball);
  }
}

//  draw()
//  p5: Handles the various states
function draw() {
  if (state === `title`) {
    title();
  } else if (state === `simulation`) {
    simulation();
  } else if (state === `goodEnding`) {
    goodEnding();
  } else if (state === `badEnding`) {
    badEnding();
  }
}

//  title()
//  Diisplays the title screen
function title() {
  background(0);

  push();
  fill(255);
  textSize(24);
  textAlign(CENTER, CENTER);
  textFont(displayFont);
  text(
    `Stop the balls from reaching the bottom of the screen!\n\nControl the red paddle with your mouse and the blue paddle with WASD or the arrow keys.\n\nYou win if the balls bounce a total of ${ballBounces} times.\nYou lose is the balls fall a total of ${ballFalls} times.\n\nPress the SPACEBAR to begin`,
    width / 2,
    height / 2
  );
  pop();
}

//  simulation()
//  Handles the simulation
function simulation() {
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
    } else {
      ballFalls--;

      ball.x = random(0, width);
      ball.y = 0 - ball.size;
      ball.active = true;
    }
  }

  score();
  displayScore();
}

//  goodEnding()
//  Displays the good ending
function goodEnding() {
  background(0);

  push();
  fill(255);
  textSize(48);
  textAlign(CENTER, CENTER);
  textFont(displayFont);
  text(`Victory!`, width / 2, height / 2);
  pop();
}

//  badEnding()
//  Displays the bad ending
function badEnding() {
  background(0);

  push();
  fill(255);
  textSize(48);
  textAlign(CENTER, CENTER);
  textFont(displayFont);
  text(`Defeat!`, width / 2, height / 2);
  pop();
}

//  score()
//  Calculates the score
function score() {
  if (ballBounces <= 0) {
    state = `goodEnding`;
  }

  if (ballFalls <= 0) {
    state = `badEnding`;
  }
}

//  displayScore()
//  Displays the current score at the top of the screen
function displayScore() {
  push();
  fill(255, 0, 0);
  textSize(24);
  textAlign(LEFT, CENTER);
  textFont(displayFont);
  text(`Balls dropped: ${10 - ballFalls}/10`, 20, 40);
  pop();

  push();
  fill(0, 255, 0);
  textSize(24);
  textAlign(LEFT, CENTER);
  textFont(displayFont);
  text(`Balls juggled: ${25 - ballBounces}/25`, 320, 40);
  pop();
}

//  keyPressed()
//  p5: Switches the state from title to simulation when pressing the spacebar
function keyPressed() {
  if (state === `title` && keyCode === 32) {
    state = `simulation`;
  }
}
