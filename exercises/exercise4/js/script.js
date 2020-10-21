/**************************************************
Exercise 4 - The Age of Aquariums
Jacob Garneau

The fishpocalypse just happened and the world is in chaos! This new era is dubbed the "Age of Aquariums". Fish are everywhere: they have overtaken towns, countries, and even entire continents, eliminating any humans in their path. As the sole survivor of the human race, you must survive for at least 10 seconds, since the fish can't survive much longer out of the water.
**************************************************/

"use strict";

//  Defines the user
let user = {
  x: 0,
  y: 0,
  size: 50,
};

//  Defines the school of fish and the amount of fish in it
let school = [];
let schoolSize = 30;

let state = `title`; //  title, simulation, goodEnding, badEnding

//  setup()
//  Sets up the canvas and creates the initial fish
function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < schoolSize; i++) {
    let fish = createFish(random(0, windowWidth), random(0, windowHeight));
    school.push(fish);
  }
}

//  createFish()
//  Creates fish
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

//  draw()
//  Handles the various states
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
//  Displays the title screen
function title() {
  background(0);

  push();
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(
    `Oh no! The fishpocalypse happened and now\nthere are fish everywhere!\n\nTry to survive for at leat 10 seconds without\nbeing touched.\n\nClick to start the fight!`,
    windowWidth / 2,
    windowHeight / 2
  );
  pop();
}

//  simulation()
//  Displays the simulation state
function simulation() {
  background(0);

  moveUser();
  displayUser();

  for (let i = 0; i < school.length; i++) {
    moveFish(school[i]);
    displayFish(school[i]);
    detectCollision(school[i]);
  }

  if (frameCount > 600) {
    state = `goodEnding`;
  }
}

//  moveUser()
//  Moves the user
function moveUser() {
  user.x = mouseX;
  user.y = mouseY;
}

//  displayUser()
//  Displays the user
function displayUser() {
  push();
  fill(255, 255, 0);
  strokeWeight(6);
  stroke(255, 0, 255);
  ellipse(user.x, user.y, user.size);
  pop();
}

//  moveFish()
//  Moves the fish
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

//  displayFish()
//  Displays the fish
function displayFish(fish) {
  if (!fish.eaten) {
    push();
    fill(fish.fill.r, fish.fill.g, fish.fill.b);
    noStroke();
    ellipse(fish.x, fish.y, fish.size);
    pop();
  }
}

//  detectCollision()
//  Detects collisions between the user and the fish
function detectCollision(fish) {
  let d = dist(user.x, user.y, fish.x, fish.y);
  if (d < user.size / 2 + fish.size / 2) {
    state = `badEnding`;
  }
}

//  goodEnding()
//  Displays the good ending
function goodEnding() {
  background(0);

  push();
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(
    `Hurray, you survived the fishpocalypse!`,
    windowWidth / 2,
    windowHeight / 2
  );
  pop();
}

//  badEnding()
//  Displays the bad ending
function badEnding() {
  background(0);

  push();
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(`Oh no, the fish got you!`, windowWidth / 2, windowHeight / 2);
  pop();
}

//  mousePressed()
//  p5: Changes the state from title to simulation on a click of the mouse
function mousePressed() {
  if (state === `title`) {
    state = `simulation`;
  }
}
