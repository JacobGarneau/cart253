/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let covid19 = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 5,
  fill: {
    r: 255,
    g: 0,
    b: 0
  }
}

let user = {
  x: 0,
  y: 0,
  size: 100,
  fill: 255
}

let staticAmount = 10000;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth,windowHeight);
  covid19.y = random(0,height);
  covid19.vx = covid19.speed;
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  // Draw static background (as in electricity, not unmoving)

  for (let i = 0; i < staticAmount; i++) {
    let x = random(0,width);
    let y = random(0,width);
    stroke(255);
    point(x,y);
  }

  // Define the user

  user.x = mouseX;
  user.y = mouseY;

  // Define COVID-19

  covid19.x += covid19.vx;
  covid19.y += covid19.vy;

  // Draw COVID-19

  fill(covid19.fill.r,covid19.fill.g,covid19.fill.b);
  noStroke();

  if (covid19.x > width) {
    covid19.x = 0;
    covid19.y = random(0,height);
  }

  ellipse(covid19.x,covid19.y,covid19.size);

  // Draw the user

  fill(user.fill);
  ellipse(user.x,user.y,user.size);

  // Detect collision

  let d = dist(covid19.x,covid19.y,user.x,user.y);

  if (d < covid19.size/2 + user.size/2) {
    noLoop();
  }

}
