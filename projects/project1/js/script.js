/**************************************************
Project 1 - Simulation
Jacob Garneau

Piano Simulator
**************************************************/

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth,windowHeight);

}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(127, 255, 200);

  fill(255);
  for (let i = 0; i < 20; i++) {
    rect(0 + i * width / 20,height - 300,width / 20,300);
  }
}
