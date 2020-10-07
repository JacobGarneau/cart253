/**************************************************
Functions experiments
Jacob Garneau

Experiments with functions
**************************************************/

let circle = {
  x: 250,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 2
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(500,500);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  let dx = circle.x - mouseX;
  let dy = circle.y - mouseY;

  if (dx < 0) {
    circle.vx = -circle.speed;
  } else if (dx > 0) {
    circle.vx = circle.speed;
  }

  if (dy < 0) {
    circle.vy = -circle.speed;
  } else if (dy > 0) {
    circle.vy = circle.speed;
  }

  circle.x += circle.vx;
  circle.y += circle.vy;

  ellipse(circle.x,circle.y,circle.size);
}
