/**************************************************
Exercise 1 - I like to move it move it
Jacob Garneau

Draws a scenery with mountains, a cloud, and the sun or the moon depending on the user's mouse position
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
  x: 650,
  y: 50,
  size: 200,
  growth: 0.5,
  fill: {
    r: 255,
    g: 200,
    b: 127
  }
}

//  Declare Moon
let moon = {
  x: 520,
  y: 50,
  size: 150,
  growth: 0.15,
  hole: 0.7,
  fill: {
    r: 220,
    g: 255,
    b: 255
  }
}

//  Declare Cloud
let cloud = {
  x: 200,
  y: 200,
  fill: 255,
  circle1: {
    x: -70,
    y: 0,
    size: 150
  },
  circle2: {
    x: 120,
    y: 0,
    size: 150
  },
  circle3: {
    x: -20,
    y: -80,
    size: 200
  },
  rectangle: {
    x: 0,
    y: 0,
    width: 200,
    height: 150
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
  //  Make the background's color relative to mouse height
  bg.r = map(mouseY,0,height,127,80);
  bg.g = map(mouseY,0,height,210,70);
  bg.b = map(mouseY,0,height,255,180);

  //  Draw Stars
  fill(stars.fill, stars.alpha);
  for(let i = 0; i < stars.amount; i++) {
    ellipse(random(0,width),random(0,height),stars.size,stars.size);
  };

  //  Map star opacity to mouse height
  stars.alpha = map(mouseY,0,height,0,255);

  //  Draw Sun
  sun.fill.g = map(mouseY,0,250,255,180);
  sun.y = map(mouseY,height / 2,0,600,50);

  if(sun.size <= 200) {
    sun.growth = 0.5;
  } else if(sun.size >= 250) {
    sun.growth = -0.5;
  }
  sun.size += sun.growth;

  sun.x--;
  sun.x = constrain(sun.x,450,650);

  ellipseMode(CENTER);
  fill(sun.fill.r,sun.fill.g,sun.fill.b);
  ellipse(sun.x,sun.y,sun.size);

  //  Draw Moon
  moon.y = map(mouseY,height,height / 2,120,-100);

  if(moon.size <= 150) {
    moon.growth = 0.15;
  } else if(moon.size >= 175) {
    moon.growth = -0.15;
  }
  moon.size += moon.growth;

  moon.x--;
  moon.x = constrain(moon.x,320,520);

  ellipseMode(CORNER);
  fill(moon.fill.r,moon.fill.g,moon.fill.b);
  ellipse(moon.x,moon.y,moon.size);
  fill(bg.r,bg.g,bg.b);
  ellipse (moon.x,moon.y,moon.size * moon.hole);

  //  Draw Mountain 1
  mountain1.fill = map(mouseY,0,500,150,110);

  fill(mountain1.fill);
  triangle(mountain1.x + mountain1.displacement,height,mountain1.x + mountain1.displacement + mountain1.width,height,mountain1.x + mountain1.displacement + mountain1.width / 2, height - mountain1.height);

  //  Draw Mountain 2
  mountain2.fill = map(mouseY,0,500,160,120);

  fill(mountain2.fill);
  triangle(mountain2.x + mountain2.displacement,height,mountain2.x + mountain2.displacement + mountain2.width,height,mountain2.x + mountain2.displacement + mountain2.width / 2, height - mountain2.height);

  //  Draw Cloud
  cloud.x = map(mouseX,0,250,0,50);
  cloud.fill = map(mouseY,0,300,255,200);

  fill(cloud.fill);
  rect(cloud.x + cloud.rectangle.x,cloud.y + cloud.rectangle.y,cloud.rectangle.width,cloud.rectangle.height);
  ellipse(cloud.x + cloud.circle1.x,cloud.y + cloud.circle1.y,cloud.circle1.size);
  ellipse(cloud.x + cloud.circle2.x,cloud.y + cloud.circle2.y,cloud.circle2.size);
  ellipse(cloud.x + cloud.circle3.x,cloud.y + cloud.circle3.y,cloud.circle3.size);

  //  Draw Mountain 3
  mountain3.fill = map(mouseY,0,500,170,130);

  fill(mountain3.fill);
  triangle(mountain3.x + mountain3.displacement,height,mountain3.x + mountain3.displacement + mountain3.width,height,mountain3.x + mountain3.displacement + mountain3.width / 2, height - mountain3.height);
}
