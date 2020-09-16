/**************************************************
Drawing experiments
Jacob Garneau

Experimenting with p5's drawing and color functions.

Currently draws a face
**************************************************/

// setup()
//
// Draws a face on the canvas
function setup() {
  createCanvas(500,500);

  //  Set the background to mint
  background(191,255,199);

  //  Draw a flesh-colored head
  fill(250,200,200);
  ellipse(250,250,200,200);

  //  Draw the eyes (black as the void of space)
  fill(0,0,255);
  ellipse(200,250,30,30);
  ellipse(300,250,30,30);

  //  Draw the mouth
  strokeWeight(10);
  line(200,300,300,300);
}

// draw()
//
// Does nothing
function draw() {

}
