/**************************************************
Exercise 3 - Love, Actually
Jacob Garneau

A lonely circle looking for the love of his life, but only for 7 seconds because he doesn't have much free time and would rather be doing something else anyway
**************************************************/

let circle1 = {
  x: 200,
  y: 300,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 5
};

let circle2 = {
  x: 400,
  y: 300,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 5
};

let state = `title`;  //  title,love,sadness,simulation,bored
let frames = 0;
let seconds = 7;

//  setup()
//  Draws the canvas and sets initial speed and text parameters
function setup() {
  createCanvas(600,600);

  circle1.vx = random(-circle1.speed,circle1.speed);
  circle1.vy = random(-circle1.speed,circle1.speed);

  textAlign(CENTER,CENTER);
  textSize(64);
  fill(255);
}

//  draw()
//  Draws the background and takes care of the states
function draw() {
  background(40,0,40);
  noStroke();

  //  Triggers the various states depending on the value inside the state variable
  if (state === `simulation`) {
    simulation();
  } else if (state === `title`) {
    title();
  } else if (state === `love`) {
    love();
  } else if (state === `sadness`) {
    sadness();
  } else if (state === `bored`) {
    bored();
  }
}

//  title()
//  Displays the title
function title() {
  text(`Guess I'll give this\n"love" thing a try.`,300,300);
}

//  simulation()
//  Runs the simulation
function simulation() {
  move();

  checkOffscreen();
  stayOnScreen();

  //  Change state to "love" if both circles overlap
  if (checkOverlap()) {
    state = `love`;
  }

  countdown();
  display();
}

//  love()
//  Displays the screen for the good ending (found love)
function love() {
  fill(255);
  text(`LOVE!\n<3`,300,300);
}

//  sadness()
//  Displays the screen for the bad ending (time ran out)
function sadness() {
  fill(255);
  text(`Life is full of\ndisappointments.`,300,300);
}

//  bored()
//  Displays the screen for the alternate ending (went off screen)
function bored() {
  fill(255);
  text(`Love is boring.\nLet's go do\nsomething else.`,300,300);
}

//  move()
//  Moves both circles and checks for user controls
function move() {
  circle1.x += circle1.vx;
  circle1.y += circle1.vy;

  circle2.x += circle2.vx;
  circle2.y += circle2.vy;

  control();
}

//  display()
//  Displays both circles and the countdown text
function display() {
  fill(255,0,127);
  ellipse(circle1.x,circle1.y,circle1.size);
  fill(0,127,255);
  ellipse(circle2.x,circle2.y,circle2.size);

  push();
  textAlign(LEFT);
  textSize(32);
  fill(255);
  text(`Time remaining: ${seconds}`,20,40);
  pop();
}

//  checkOffscreen()
//  Checks if the blue circle is offscreen to trigger the alternate ending
function checkOffscreen() {
  if (circle2.x < 0 || circle2.x > width || circle2.y < 0 || circle2.y > height) {
    state = `bored`;
  }
}

//  stayOnScreen()
//  Makes it so the pink circle never leaves the screen
function stayOnScreen() {
  if (circle1.x < 0 || circle1.x > width) {
    circle1.vx = -circle1.vx
  }

  if (circle1.y < 0 || circle1.y > width) {
    circle1.vy = -circle1.vy
  }
}

//  control()
//  Can control the blue circle with the arrow keys or WASD
function control() {
  circle2.vx = 0;
  circle2.vy = 0;

  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    circle2.vy = -circle2.speed;
  }

  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    circle2.vy = circle2.speed;
  }

  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    circle2.vx = -circle2.speed;
  }

  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    circle2.vx = circle2.speed;
  }
}

//  chekOverlap()
//  Checks if the two circles overlap
function checkOverlap() {
  let d = dist(circle1.x,circle1.y,circle2.x,circle2.y);
  if (d < circle1.size/2 + circle2.size/2) {
    return true;
  }
}

//  countdown()
//  Counts down until time is up and you lose
function countdown() {
  frames++;

  if (frames === 60) {
    seconds--;
    frames = 0;

    //  Gives a new direction and speed to the pink circle every second
    circle1.vx = random(-circle1.speed,circle1.speed);
    circle1.vy = random(-circle1.speed,circle1.speed);
  }

  if (seconds === 0) {
    state = `sadness`;
  }
}

//  mousePressed()
//  Can change the state from "title" to "simulation"
function mousePressed() {
  if (state === `title`) {
    state = `simulation`;
  }
}
