/**************************************************
Exercise 4 - The Age of Aquariums
Jacob Garneau

Here is a description of this template p5 project.
**************************************************/

"use strict";

let user = {
  x: 0,
  y: 0,
  size: 100,
};

let school = [];
let schoolSize = 10;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < schoolSize; i++) {
    let fish = createFish(random(0, width / 2), random(0, height));
    school.push(fish);
  }
}

function createFish(x, y) {
  let fish = {
    x: x,
    y: y,
    size: 50,
    vx: 0,
    vy: 0,
    speed: 2,
  };
  return fish;
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  moveUser();
  displayUser();

  for (let i = 0; i < school.length; i++) {
    moveFish(school[i]);
    displayFish(school[i]);
  }
}

function moveUser() {
  user.x = mouseX;
  user.y = mouseY;
}

function displayUser() {
  push();
  fill(255);
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
    fill(200, 100, 100);
    noStroke();
    ellipse(fish.x, fish.y, fish.size);
    pop();
  }
}

function mousePressed() {
  let fish = createFish(mouseX, mouseY);
  school.push(fish);
}
