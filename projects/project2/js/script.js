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
let tiles = [];
let tileTypes = [`mountains`, `forest`, `plains`, `water`];

//  Unit and movement variables
let xPos = 1;
let yPos = 1;
let unitMovement = 2;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);

  //  Create the unit
  unit = new Unit(xPos, yPos);

  //  Create the grid
  for (let i = 0; i < grid.width; i++) {
    for (let j = 0; j < grid.height; j++) {
      let tileType = random(tileTypes);
      let tile = new Tile(i, j, tileType);
      tiles.push(tile);
    }
  }
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);
  stroke(0, 0, 0, 100);

  //  Draw the grid
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].display();
  }

  unit.move();
  unit.display();
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
      unit.currentMovement = unit.movement;
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

    unit.x = constrain(unit.x, 0, width);
    unit.y = constrain(unit.y, 0, height);
    unit.currentMovement--;
    if (unit.currentMovement === 0) {
      unit.selected = false;
    }
  }
}
