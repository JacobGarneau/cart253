/**************************************************
Project 2 - Anything
Jacob Garneau

Here is a description of this template p5 project.
**************************************************/

let grid = {
  height: 10,
  width: 20,
  squareSize: 50,
};

let unit;
let unitSpeed = 5;
let tiles = [];
let tileTypes = [
  `plains`,
  `plains`,
  `plains`,
  `plains`,
  `plains`,
  `forest`,
  `forest`,
  `mountains`,
  `water`,
];

//  Unit and movement variables
let xPos = 7;
let yPos = 5;
let movement = 4;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);
  grid.squareSize = windowHeight / grid.height;

  //  Create the unit
  unit = new Unit(xPos, yPos, movement, 5, 4);

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
    if (
      keyCode === LEFT_ARROW ||
      keyCode === RIGHT_ARROW ||
      keyCode === UP_ARROW ||
      keyCode === DOWN_ARROW
    ) {
      if (keyCode === LEFT_ARROW) {
        unit.destinationX = unit.x - grid.squareSize;
      } else if (keyCode === RIGHT_ARROW) {
        unit.destinationX = unit.x + grid.squareSize;
      } else if (keyCode === UP_ARROW) {
        unit.destinationY = unit.y - grid.squareSize;
      } else if (keyCode === DOWN_ARROW) {
        unit.destinationY = unit.y + grid.squareSize;
      }

      unit.currentMovement--;
      if (unit.currentMovement === 0) {
        unit.selected = false;
      }

      let timeoutDelay = (grid.squareSize / unitSpeed / 60) * 1000;
      setTimeout(function () {
        unit.x = unit.destinationX;
        unit.y = unit.destinationY;
      }, timeoutDelay);
    }
  }
}
