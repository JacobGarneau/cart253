/**************************************************
Exercise 4 - The Age of Aquariums
Jacob Garneau

Here is a description of this template p5 project.
**************************************************/

"use strict";

let user = {
  x: 0,
  y: 0,
  size: 50,
};

let school = [];
let schoolSize = 30;

let state = `title`; //  title, simulation, goodEnding, badEnding

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < schoolSize; i++) {
    let fish = createFish(random(0, windowWidth), random(0, windowHeight));
    school.push(fish);
  }
}

function createFish(x, y) {
  let fish = {
    x: x,
    y: y,
    size: random(25, 75),
    vx: 0,
    vy: 0,
    speed: random(1, 4),
    fill: {
      r: random(0, 255),
      g: random(0, 255),
      b: random(0, 255),
    },
  };
  return fish;
}

// draw()
//
// Description of draw() goes here.
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

function title() {}

function simulation() {
  background(0);

  moveUser();
  displayUser();

  for (let i = 0; i < school.length; i++) {
    moveFish(school[i]);
    displayFish(school[i]);
  }

  if (frameCount > 600) {
    state = `goodEnding`;
  }
}

function moveUser() {
  user.x = mouseX;
  user.y = mouseY;
}

function displayUser() {
  push();
  fill(255, 255, 0);
  strokeWeight(6);
  stroke(255, 0, 255);
  ellipse(user.x, user.y, user.size);
  pop();
}

function moveFish(fish) {
  let change = random(0, 1);
  if (change < 0.05) {
    fish.vx = random(-fish.speed, fish.speed);
    fish.vy = random(-fish.speed, fish.speed);
  }

  fish.x += fish.vx;
  fish.y += fish.vy;

  fish.x = constrain(fish.x, 0, width);
  fish.y = constrain(fish.y, 0, height);
}

function displayFish(fish) {
  if (!fish.eaten) {
    push();
    fill(fish.fill.r, fish.fill.g, fish.fill.b);
    noStroke();
    ellipse(fish.x, fish.y, fish.size);
    pop();
  }
}

function goodEnding() {}

function badEnding() {}

function mousePressed() {
  if (state === `title`) {
    state = `simulation`;
  }
}
