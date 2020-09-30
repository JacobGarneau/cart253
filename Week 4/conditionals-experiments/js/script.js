/**************************************************
Conditionals experiments
Jacob Garneau

Experiments with the conditionals.
**************************************************/

let caterpillar = {
  x: 100,
  y: 250,
  segmentSize: 50
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(500,500);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);
  noStroke();
  fill(100,200,100);

  //  WHILE METHOD

  // let x = caterpillar.x;
  // let numSegments = 10;
  // let segmentsDrawn = 0;
  //
  // while(segmentsDrawn < numSegments) {
  //   ellipse(x,caterpillar.y,caterpillar.segmentSize);
  //   x += 40;
  //   segmentsDrawn++;

  //  FOR METHOD

  let x = caterpillar.x;
  let numSegments = 10;

  for (let i = 0; i < numSegments; i++) {
    ellipse(x,caterpillar.y,caterpillar.segmentSize);
    x += 40;
  }
}
