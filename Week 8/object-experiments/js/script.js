/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

"use strict";

let garden = {
  flowers: [],
  numFlowers: 20,
  grassColor: {
    r: 120,
    g: 180,
    b: 120,
  },
};

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(600, 600);

  for (let i = 0; i < garden.numFlowers; i++) {
    let flower = createFlower();

    garden.flowers.push(flower);
  }
}

function createFlower() {
  let flower = {
    x: random(0, width),
    y: random(0, height),
    size: 50,
    stemLength: 75,
    stemThickness: 10,
    petalThickness: 10,
    stemColor: {
      r: 50,
      g: 150,
      b: 50,
    },
    petalColor: {
      r: 200,
      g: 50,
      b: 50,
    },
    centreColor: {
      r: 50,
      g: 0,
      b: 0,
    },
  };
  return flower;
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(garden.grassColor.r, garden.grassColor.g, garden.grassColor.b);

  for (let i = 0; i < garden.flowers.length; i++) {
    let flower = garden.flowers[i];
    displayFlower(flower);
  }
}

function displayFlower(flower) {
  push();

  strokeWeight(flower.stemThickness);
  stroke(flower.stemColor.r, flower.stemColor.g, flower.stemColor.b);
  line(flower.x, flower.y, flower.x, flower.y + flower.stemLength);

  strokeWeight(flower.petalThickness);
  fill(flower.centreColor.r, flower.centreColor.g, flower.centreColor.b);
  stroke(flower.petalColor.r, flower.petalColor.g, flower.petalColor.b);
  ellipse(flower.x, flower.y, flower.size);

  pop();
}
