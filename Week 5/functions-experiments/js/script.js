/**************************************************
Functions experiments
Jacob Garneau

Experiments with functions
**************************************************/

let hello = {
  string: `Hello, world!`,
  x: 250,
  y: 250,
  vx: 5,
  vy: 1,
  size: 64
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

  hello.x += hello.vx;
  hello.y += hello.vy;

  hello.size++;

  textAlign(CENTER,CENTER);
  textSize(hello.size);
  textStyle(BOLD);

  fill(200,50,200);
  stroke(0,255,0);
  strokeWeight(3);

  text(hello.string,hello.x,hello.y);
}
