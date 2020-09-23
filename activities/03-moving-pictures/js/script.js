/**************************************************
Activity 3: Moving Pictures
Jacob Garneau

Draws two moving and growing circles on a background that goes from black to red
**************************************************/

//  Declare the background
let bg = {
  r: 0,
  g: 0,
  b: 0
};

//  Declare Circle 1 (left)
let circle1 = {
  x: 0,
  y: 250,
  size: 150,
  speed: 1,
  fill: 255,
  alpha: 150,
  speed: 1,
  growth: 0.5
};

//  Declare Circle 2 (right)
let circle2 = {
  x: 500,
  y: 250,
  size: 105,
  speed: 1,
  fill: 255,
  alpha: 220,
  speed: -1,
  relativeSize: 0.7
};

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
  //  Make the background's color relative to Circle 1's size
  bg.r = map(circle1.size,150,width,0,255);


  //  CIRCLE 1 (LEFT)
  //  Move Circle 1 to the right until it reaches the middle of the canvas
  circle1.x += circle1.speed;
  circle1.x = constrain(circle1.x,0,width / 2);

  // Increase Circle 1's size until it touches the canvas' borders
  circle1.size += circle1.growth;
  circle1.size = constrain(circle1.size,0,width);

  //  Draw Circle 1
  fill(circle1.fill,circle1.alpha);
  ellipse(circle1.x,circle1.y,circle1.size);

  //  CIRCLE 2 (RIGHT)
  //  Move Circle 2 to the left until it reaches the middle of the canvas
  circle2.x += circle2.speed;
  circle2.x = constrain(circle2.x,width / 2,width);

  // Make Circle 2's size relative to Circle 1's
  circle2.size = circle1.size * circle2.relativeSize;

  //  Draw Circle 2
  fill(circle2.fill,circle2.alpha);
  ellipse(circle2.x,circle2.y,circle2.size);
}
