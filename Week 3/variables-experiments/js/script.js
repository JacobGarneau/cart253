/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let backgroundShade = 0;

let circle = {
  x: 250,
  y:250,
  size: 100,
  speed: 2,
  fill: 0
};

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
  background(backgroundShade);

  circle.speed = random(-5,5);
  circle.x += circle.speed;
  circle.size = random(10,100);

  circle.fill = random(0,255);
  fill(circle.fill);
  ellipse(circle.x,circle.y,circle.size);
}
