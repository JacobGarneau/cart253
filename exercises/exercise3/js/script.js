/**************************************************
Activity 5 - Looking for love
Jacob Garneau

Here is a description of this template p5 project.
**************************************************/

let circle1 = {
  x: 200,
  y: 300,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 5
};

let circle2 = {
  x: 400,
  y: 300,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 5
};

let state = `title`; //  title,love,sadness,simulation

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(600,600);
  circle1.vx = random(-circle1.speed,circle1.speed);
  circle1.vy = random(-circle1.speed,circle1.speed);

  textAlign(CENTER,CENTER);
  textSize(64);
  fill(255);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  if (state === `simulation`) {
    simulation();
  } else if (state === `title`) {
    title();
  } else if (state === `love`) {
    love();
  } else if (state === `sadness`) {
    sadness();
  }
}

function title() {
  text(`LOVE?`,300,300);
}

function simulation() {
  move();

  stayOnScreen();

  if (checkOverlap()) {
    state = `love`;
  }

  display();
}

function love() {
  fill(255);
  text(`LOVE!`,300,300);
}

function sadness() {
  fill(255);
  text(`D:`,300,300);
}

function move() {
  circle1.x += circle1.vx;
  circle1.y += circle1.vy;

  circle2.x += circle2.vx;
  circle2.y += circle2.vy;

  control();
}

function display() {
  fill(255,0,0);
  ellipse(circle1.x,circle1.y,circle1.size);
  fill(0,0,255);
  ellipse(circle2.x,circle2.y,circle2.size);
}

function stayOnScreen() {
  if (circle1.x < 0 || circle1.x > width) {
    circle1.vx = -circle1.vx
  }

  if (circle1.y < 0 || circle1.y > width) {
    circle1.vy = -circle1.vy
  }
}

function checkOverlap() {
  let d = dist(circle1.x,circle1.y,circle2.x,circle2.y);
  if (d < circle1.size/2 + circle2.size/2) {
    return true;
  }
}

function mousePressed() {
  if (state === `title`) {
    state = `simulation`;
  }
}

function control() {
  circle2.vx = 0;
  circle2.vy = 0;

  if (keyIsDown(UP_ARROW)) {
    circle2.vy = -circle2.speed;
  }

  if (keyIsDown(DOWN_ARROW)) {
    circle2.vy = circle2.speed;
  }

  if (keyIsDown(LEFT_ARROW)) {
    circle2.vx = -circle2.speed;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    circle2.vx = circle2.speed;
  }
}
