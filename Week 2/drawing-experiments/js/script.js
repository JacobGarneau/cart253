/**************************************************
Activity 2 - draw an alien
Jacob Garneau

Drawing an alien using the p5 library

Currently draws an alien
**************************************************/

// setup()
//
// Draws an alien
function setup() {
  createCanvas(640,480);

  //  Set the background to pink
  background(255,192,203);

  //  Draw the body
  noStroke();
  fill(150,150,150);
  ellipse(320,480,420,300);

  //  Draw the head
  fill(120,120,120);
  ellipse(320,240,260,360);

  //  Draw the eyes
  fill(0);
  ellipse(260,200,100,160);
  ellipse(380,200,100,160);

  //  Draw the nostrils
}

// draw()
//
// Does nothing
function draw() {

}
