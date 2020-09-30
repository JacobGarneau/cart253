/**************************************************
Exercise 2 - Dodge 'em!
Jacob Garneau

A gruesome battle against COVID-19 for the fate of humanity
**************************************************/

let covid19 = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 10,
  fill: {
    r: 255,
    g: 0,
    b: 0
  },
  img: undefined
}

let user = {
  x: 250,
  y: 250,
  size: 90,
  fill: {
    r: 0,
    g: 255,
    b: 0
  },
  dragging: false,
  img: undefined,
  health: 3
}

let staticAmount = 10000;

function preload() {
  covid19.img = loadImage("assets/images/covid19.png");
  user.img = loadImage("assets/images/person.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  covid19.y = random(0,height);
  covid19.vx = covid19.speed;
}

function draw() {
  background(0);

  // Draw static background (as in electricity, not unmoving)

  for (let i = 0; i < staticAmount; i++) {
    let x = random(0,width);
    let y = random(0,height);
    stroke(255);
    point(x,y);
  }

  // Move the user

  if (user.dragging) {
    user.x = mouseX;
    user.y = mouseY;
  }

  // Move COVID-19

  covid19.x += covid19.vx;
  covid19.y += covid19.vy;

  // Draw COVID-19

  fill(covid19.fill.r,covid19.fill.g,covid19.fill.b);
  noStroke();

  if (covid19.x > width) {
    covid19.x = 0;
    covid19.y = random(0,height);
    covid19.speed += covid19.speed/3;
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

  if (user.health === 2 && user.fill.r <= 255) {
    user.fill.r += 25;
  } else if (user.health === 1) {
    user.fill.g -= 25;
  } else if (user.health === 0) {
    noLoop();
  }
}

function mousePressed() {
  let d = dist(mouseX,mouseY,user.x,user.y);

  if (d < user.size/2) {
    user.dragging = true;
  }
}

function mouseReleased() {
  user.dragging = false;
}
