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
let movement = 4;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);
  grid.squareSize = windowHeight / grid.height;

  //  Create the units
  for (let i = 0; i < unitAmount; i++) {
    let unit = new Unit(i * 2 + 3, i * 2 + 2, movement, 5, 4, `cavalry`, 1);
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

  //  Draw the units
  for (let i = 0; i < units.length; i++) {
    units[i].move();
    units[i].display();

    //  Assign their tile's type to the units
    for (let j = 0; j < tiles.length; j++) {
      //  Current tile
      let d = dist(units[i].x, units[i].y, tiles[j].x, tiles[j].y);
      if (d <= unitSpeed) {
        units[i].tileType.current = tiles[j].type;
        tiles[j].occupied = units[i].team;
      }

      //  Up tile
      d = dist(
        units[i].x,
        units[i].y - grid.squareSize,
        tiles[j].x,
        tiles[j].y
      );
      if (d <= unitSpeed) {
        units[i].tileType.up = tiles[j].type;
      }

      //  Down tile
      d = dist(
        units[i].x,
        units[i].y + grid.squareSize,
        tiles[j].x,
        tiles[j].y
      );
      if (d <= unitSpeed) {
        units[i].tileType.down = tiles[j].type;
      }

      //  Left tile
      d = dist(
        units[i].x - grid.squareSize,
        units[i].y,
        tiles[j].x,
        tiles[j].y
      );
      if (d <= unitSpeed) {
        units[i].tileType.left = tiles[j].type;
      }

      //  Right tile
      d = dist(
        units[i].x + grid.squareSize,
        units[i].y,
        tiles[j].x,
        tiles[j].y
      );
      if (d <= unitSpeed) {
        units[i].tileType.right = tiles[j].type;
      }
    }
  }
}

function selectSquare(value) {
  let selected = (value - 1) * grid.squareSize;
  return selected;
}

function unitMovement(unit) {
  unit.stats.currentMovement--;
  unit.movable = false;

  if (unit.stats.currentMovement === 0) {
    unit.selected = false;
  }

  let timeoutDelay = (grid.squareSize / unitSpeed / 60) * 1000;
  setTimeout(function () {
    unit.x = unit.destinationX;
    unit.y = unit.destinationY;
    unit.movable = true;
  }, timeoutDelay);
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
        for (let j = 0; j < units.length; j++) {
          units[j].selected = false;
        }
        units[i].selected = true;
        units[i].stats.currentMovement = units[i].stats.movement;
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
        if (keyCode === LEFT_ARROW && units[i].tileType.left !== `water`) {
          if (
            units[i].unitType === `cavalry` &&
            units[i].tileType.left === `mountains`
          ) {
          } else {
            units[i].destinationX = units[i].x - grid.squareSize;
            unitMovement(units[i]);
          }
        } else if (
          keyCode === RIGHT_ARROW &&
          units[i].tileType.right !== `water`
        ) {
          if (
            units[i].unitType === `cavalry` &&
            units[i].tileType.right === `mountains`
          ) {
          } else {
            units[i].destinationX = units[i].x + grid.squareSize;
            unitMovement(units[i]);
          }
        } else if (keyCode === UP_ARROW && units[i].tileType.up !== `water`) {
          if (
            units[i].unitType === `cavalry` &&
            units[i].tileType.up === `mountains`
          ) {
          } else {
            units[i].destinationY = units[i].y - grid.squareSize;
            unitMovement(units[i]);
          }
        } else if (
          keyCode === DOWN_ARROW &&
          units[i].tileType.down !== `water`
        ) {
          if (
            units[i].unitType === `cavalry` &&
            units[i].tileType.down === `mountains`
          ) {
          } else {
            units[i].destinationY = units[i].y + grid.squareSize;
            unitMovement(units[i]);
          }
        }
      }
    }
  }
}
