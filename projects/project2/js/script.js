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

let unitAmount = 3;
let units = [];
let unitSpeed = 8;
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

  //  Create the units
  for (let i = 0; i < unitAmount; i++) {
    let unit = new Unit(i * 2 + 3, i * 2 + 2, movement, 5, 4);
    units.push(unit);
  }

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

  for (let i = 0; i < units.length; i++) {
    units[i].move();
    units[i].display();
  }
}

function selectSquare(value) {
  let selected = (value - 1) * grid.squareSize;
  return selected;
}

function mouseClicked() {
  for (let i = 0; i < units.length; i++) {
    let d = dist(
      units[i].x + grid.squareSize / 2,
      units[i].y + grid.squareSize / 2,
      mouseX,
      mouseY
    );
    if (d <= grid.squareSize / 2) {
      if (units[i].selected) {
        units[i].selected = false;
      } else {
        units[i].selected = true;
        units[i].currentMovement = units[i].movement;
      }
    }
  }
}

function keyPressed() {
  for (let i = 0; i < units.length; i++) {
    if (units[i].selected && units[i].movable) {
      if (
        keyCode === LEFT_ARROW ||
        keyCode === RIGHT_ARROW ||
        keyCode === UP_ARROW ||
        keyCode === DOWN_ARROW
      ) {
        if (keyCode === LEFT_ARROW) {
          units[i].destinationX = units[i].x - grid.squareSize;
        } else if (keyCode === RIGHT_ARROW) {
          units[i].destinationX = units[i].x + grid.squareSize;
        } else if (keyCode === UP_ARROW) {
          units[i].destinationY = units[i].y - grid.squareSize;
        } else if (keyCode === DOWN_ARROW) {
          units[i].destinationY = units[i].y + grid.squareSize;
        }

        units[i].currentMovement--;
        units[i].movable = false;

        if (units[i].currentMovement === 0) {
          units[i].selected = false;
        }

        let timeoutDelay = (grid.squareSize / unitSpeed / 60) * 1000;
        setTimeout(function () {
          units[i].x = units[i].destinationX;
          units[i].y = units[i].destinationY;
          units[i].movable = true;
        }, timeoutDelay);
      }
    }
  }
}
