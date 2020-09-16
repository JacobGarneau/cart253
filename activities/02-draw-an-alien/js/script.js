/**************************************************
Activity 2 - draw an alien
Jacob Garneau

Drawing an alien using the p5 library

Currently draws an amazing alien
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
  ellipse(320,480,320,180);

  //  Draw the head
  fill(120,120,120);
  ellipse(320,240,260,360);

  //  Draw the eyes
  fill(0);
  ellipse(260,200,100,160);
  ellipse(380,200,100,160);

  //  Draw the nostrils
  ellipse(300,300,20,30);
  ellipse(340,300,20,30);

  //  Draw the mouth
  stroke(255,0,0);
  strokeWeight(4);
  rectMode(CENTER);
  rect(320,360,100,20);
}

// draw()
//
// Does nothing
function draw() {

}
