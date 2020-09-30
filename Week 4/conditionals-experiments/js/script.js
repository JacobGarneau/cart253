/**************************************************
Conditionals experiments
Jacob Garneau

Experiments with the conditionals.
**************************************************/

let bg = {
  r: 0,
  g: 0,
  b: 0
}

let circle = {
  x: 250,
  y: 250,
  size: 100
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
  background(bg.r,bg.g,bg.b);

  ellipse(circle.x,circle.y,circle.size);
}

function mousePressed() {
  bg.r = random(0,255);
  bg.g = random(0,255);
  bg.b = random(0,255);
}
