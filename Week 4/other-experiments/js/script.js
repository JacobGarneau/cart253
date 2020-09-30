/**************************************************
Conditionals experiments
Jacob Garneau

Experiments with various things from week 4.
**************************************************/

let circle = {
  x: 250,
  y: 250,
  size: 100
};

function setup() {
  createCanvas(500,500);
}

function draw() {
  background(0);

  let mouseIsLeft = undefined;

  if (mouseX >= width/2) {
    console.log("Mouse is to the right");
    mouseIsLeft = false;
  } else {
    console.log ("Mouse is to the left");
    mouseIsLeft = true;
  }

  ellipse(circle.x,circle.y,circle.size);
}
