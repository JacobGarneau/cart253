/**************************************************
Exercise 1 - I like to move it move it
Jacob Garneau
Draws a scenery that alternates between night and day according to the user's mouse height
**************************************************/

//  Declare the background
let bg = {
  r: 127,
  g: 210,
  b: 255
};

//  Declare Mountains
let mountain1 = {
  x: 0,
  y: 250,
  width: 350,
  height: 400,
  displacement: 50,
  fill: 150
};

let mountain2 = {
  x: 0,
  y: 250,
  width: 350,
  height: 250,
  displacement: 200,
  fill: 160
};

let mountain3 = {
  x: 0,
  y: 250,
  width: 350,
  height: 300,
  displacement: -80,
  fill: 170
};

//  Declare Stars
let stars = {
  size: 5,
  fill: 255,
  alpha: 255,
  amount: 100
}

//  Declare Sun
let sun = {
  x: 450,
  y: 50,
  size: 200,
  fill: {
    r: 255,
    g: 200,
    b: 127
  }
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
  bg.r = map(mouseY,0,height,127,80);
  bg.g = map(mouseY,0,height,210,70);
  bg.b = map(mouseY,0,height,255,180);

  //  Draw Stars
  fill(stars.fill, stars.alpha);
  for(let i = 0; i < stars.amount; i++) {
    ellipse(random(0,width),random(0,height),stars.size,stars.size);
  };

  //  Draw Sun
  sun.fill.g = map(mouseY,0,250,255,220);
  sun.y = map (mouseY,250,0,50,600);
  sun.y = constrain(mouseY,50,height+100);

  fill(sun.fill.r,sun.fill.g,sun.fill.b);
  ellipse(sun.x,sun.y,sun.size);
  console.log(sun.y + ", " + mouseY);

  //  Draw Mountain 1
  fill(mountain1.fill);
  triangle(mountain1.x + mountain1.displacement,height,mountain1.x + mountain1.displacement + mountain1.width,height,mountain1.x + mountain1.displacement + mountain1.width / 2, height - mountain1.height);

  //  Draw Mountain 2
  fill(mountain2.fill);
  triangle(mountain2.x + mountain2.displacement,height,mountain2.x + mountain2.displacement + mountain2.width,height,mountain2.x + mountain2.displacement + mountain2.width / 2, height - mountain2.height);

  //  Draw Mountain 3
  fill(mountain3.fill);
  triangle(mountain3.x + mountain3.displacement,height,mountain3.x + mountain3.displacement + mountain3.width,height,mountain3.x + mountain3.displacement + mountain3.width / 2, height - mountain3.height);
}
