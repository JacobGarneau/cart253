/**************************************************
Conditionals experiments
Jacob Garneau

Experiments with various things from week 4.
**************************************************/

let clown = {
  x: 250,
  y: 250,
  size: 100,
  image: undefined
};

function preload() {
  clown.image = loadImage("assets/images/clown.png");
}

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(0);

  clown.x = mouseX;
  clown.y = mouseY;

  imageMode(CENTER);
  image(clown.image,clown.x,clown.y,clown.size,clown.size);
}

function mousePressed() {
  clown.size += 50;
}
