/**************************************************
Conditionals experiments
Jacob Garneau

Experiments with the conditionals.
**************************************************/

let = clownImage;

function preload() {
  clownImage = loadImage("assets/images/clown.png");
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

  imageMode(CENTER);
  image(clownImage,mouseX,mouseY);
}
