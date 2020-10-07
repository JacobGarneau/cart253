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

  circle2.vx = random(-circle2.speed,circle2.speed);
  circle2.vy = random(-circle2.speed,circle2.speed);

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

  if (checkOffscreen(circle1) || checkOffscreen(circle2)) {
    state = `sadness`;
  }

  if (checkOverlap()) {
    state = `love`;
  }

  display();
}

function love() {
  text(`LOVE!`,300,300);
}

function sadness() {
  text(`D:`,300,300);
}

function move() {
  circle1.x += circle1.vx;
  circle1.y += circle1.vy;

  circle2.x += circle2.vx;
  circle2.y += circle2.vy;
}

function display() {
  ellipse(circle1.x,circle1.y,circle1.size);
  ellipse(circle2.x,circle2.y,circle2.size);
}

function checkOffscreen(circle) {
  if (circle.x < 0 || circle.x > width || circle.y < 0 || circle.y > height) {
    return true;
  } else {
    return false;
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
