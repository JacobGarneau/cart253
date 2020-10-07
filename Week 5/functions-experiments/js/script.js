/**************************************************
Functions experiments
Jacob Garneau

Experiments with functions
**************************************************/

let bg = 0;

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
  background(bg);

  if (keyIsDown(65)) {
    rectMode(CENTER);
    rect(250,250,100,100);
  }
}
