/**************************************************
Exercise 1 - I like to move it move it
Jacob Garneau

Draws a scenery that alternates between night and day according to the user's mouse height
**************************************************/

//  Declare the background
let bg = {
  r: 200,
  g: 200,
  b: 255
};

//  Declare Mountains
let mountain1 = {
  x: 0,
  y: 250,
  width: 150,
  height: 150,
  fill: 180
};

let mountain2 = {
  x: 0,
  y: 250,
  width: 150,
  height: 150,
  fill: 180
};

let mountain3 = {
  x: 0,
  y: 250,
  width: 150,
  height: 150,
  fill: 180
};

//  Declare Stars
let stars = {
  size: 5,
  fill: 255,
  alpha: 255,
  amount: 100
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(500,500);
  noStroke();
}

// draw()
//
// Description of draw() goes here.
function draw() {
  //  BACKGROUND
  //  Draw the background
  background(bg.r,bg.g,bg.b);
  //  Make the background's color relative to height of mouse
  bg.r = map(mouseY,0,height,0,255);

  //  Draw Stars
  fill(stars.fill, stars.alpha);
  for(let i = 0; i < stars.amount; i++) {
    ellipse(random(0,width),random(0,height),stars.size,stars.size);
  }

  //  Draw Mountain 1
  fill(mountain1.fill);
  triangle(mountain1.x,height,mountain1.x + mountain1.width,height,mountain1.x + mountain1.height / 2, height - mountain1.height);
}
