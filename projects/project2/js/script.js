/**************************************************
Project 2 - Anything
Jacob Garneau

Here is a description of this template p5 project.
**************************************************/

let grid = {
  height: 10,
  width: 10,
  squareSize: 50,
};

let unit;

//  Unit and movement variables
let xPos = 4;
let yPos = 5;
let unitMovement = 2;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);

  //  Create the unit
  unit = new Unit(xPos, yPos);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);
  stroke(0);
  fill(255);

  //  Draw the grid
  for (let i = 0; i < grid.width; i++) {
    for (let j = 0; j < grid.height; j++) {
      rect(
        selectSquare(i + 1),
        selectSquare(j + 1),
        grid.squareSize,
        grid.squareSize
      );
    }
  }

  unit.movement();
  unit.draw();
}

function selectSquare(value) {
  let selected = (value - 1) * grid.squareSize;
  return selected;
}

function mouseClicked() {
  let d = dist(
    unit.x + grid.squareSize / 2,
    unit.y + grid.squareSize / 2,
    mouseX,
    mouseY
  );
  if (d <= grid.squareSize / 2) {
    if (unit.selected) {
      unit.selected = false;
    } else {
      unit.selected = true;
    }
  }
}

function keyPressed() {
  if (unit.selected) {
    if (keyCode === LEFT_ARROW) {
      unit.x -= grid.squareSize;
    } else if (keyCode === RIGHT_ARROW) {
      unit.x += grid.squareSize;
    } else if (keyCode === UP_ARROW) {
      unit.y -= grid.squareSize;
    } else if (keyCode === DOWN_ARROW) {
      unit.y += grid.squareSize;
    }

    unit.selected = false;
  }
}
