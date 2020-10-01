/**************************************************
Exercise 2 - Dodge 'em!
Jacob Garneau

A gruesome battle against COVID-19 for the fate of humanity
**************************************************/

// Declare COVID-19

let covid19 = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 10,
  maxSpeed: 50,
  fill: {
    r: 255,
    g: 0,
    b: 0
  },
  img: undefined
}

// Declare the user

let user = {
  x: 400,
  y: 450,
  size: 90,
  fill: {
    r: 0,
    g: 255,
    b: 0
  },
  dragging: false,
  img: undefined,
  health: 4,
  score: 0
}

// Declare single variables (square amount for background and displayed font)

let squareAmount = 5000;
let displayFont;

// preload()
// Loads the required resources for this program
// 2 images and 1 font

function preload() {
  covid19.img = loadImage("assets/images/covid19.png");
  user.img = loadImage("assets/images/person.png");

  displayFont = loadFont("assets/fonts/CourierPrime-Bold.ttf")
}

// setup()
// Creates canvas and sets up necessary variables

function setup() {
  createCanvas(windowWidth,windowHeight);
  covid19.y = random(0,height);
  covid19.vx = covid19.speed;
  covid19.vy = covid19.speed;
}

// draw()
// Draws the background and the animated/interactive elements every frame (60 fps)

function draw() {
  background(80,0,180);

  // Draw randomly animated background

  for (let i = 0; i < squareAmount; i++) {
    let x = random(0,width);
    let y = random(0,height);
    fill(100,0,200);
    noStroke();
    rect(x,y,10,10);
  }

  // Move the user

  if (user.dragging) {
    user.x = mouseX;
    user.x = constrain(user.x, 0 + user.size/2,width - user.size/2);
    user.y = mouseY;
    user.y = constrain(user.y, 0 + user.size/2,height - user.size/2);
  }

  // Move COVID-19

  covid19.x += covid19.vx;

  if (user.y < covid19.y) {
    covid19.y -= covid19.vy;
  } else {
    covid19.y += covid19.vy;
  }

  // Draw COVID-19

  fill(covid19.fill.r,covid19.fill.g,covid19.fill.b);
  noStroke();

  if (covid19.x > width) {
    covid19.x = 0;
    covid19.y = random(0,height);
    covid19.vx += 2;
    if (covid19.vx > covid19.maxSpeed) {
      covid19.vx = covid19.maxSpeed;
    }
    covid19.vy += 1;
    if (covid19.vy > covid19.maxSpeed/1.5) {
      covid19.vy = covid19.maxSpeed/1.5;
    }
    user.score++;
  }

  imageMode(CENTER);
  image(covid19.img,covid19.x,covid19.y,covid19.size,covid19.size);

  // Draw the user

  fill(user.fill.r,user.fill.g,user.fill.b);
  ellipse(user.x,user.y,user.size);
  image(user.img,user.x,user.y,30,72);

  // Detect collision and subtract health

  let d = dist(covid19.x,covid19.y,user.x,user.y);

  if (d < covid19.size/2 + user.size/2) {
    covid19.x = 0;
    covid19.y = random(0,height);
    user.health -= 1;
  }

  // Effects of losing health (color change, game end)

  if (user.health === 3 && user.fill.r <= 255) {
    user.fill.r += 25;
  } else if (user.health === 2 && user.fill.g >= 127) {
    user.fill.g -= 12;
  } else if (user.health === 1 && user.fill.g >= 0) {
    user.fill.g -= 12;
  } else if (user.health === 0) {
    noLoop();
  }

  // Display user health

  textFont(displayFont, 32);
  text("HEALTH: " + user.health, width - 220, 50);

  fill(255);
  text("SCORE: " + user.score, width - 220, 100);
}

// mousePressed() and mouseReleased()
// Allow to drag the user with the mouse

function mousePressed() {
  let d = dist(mouseX,mouseY,user.x,user.y);

  if (d < user.size/2) {
    user.dragging = true;
  }
}

function mouseReleased() {
  user.dragging = false;
}
