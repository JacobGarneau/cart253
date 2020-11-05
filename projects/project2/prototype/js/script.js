/**************************************************
Project 2 - Anything
Jacob Garneau

A strategy game about medieval warfare.

This prototype focuses on showcasing the movement of the units on the grid.
All units cannot cross water (blue) tiles, and cavalry units cannot cross mountain (grey) tiles.

Icons were taken from FontAwesome (fontawesome.com) under Creative Commons license.
**************************************************/

let grid = {
  height: 10,
  width: undefined,
  squareSize: undefined,
};
let menuHeight = 120;
let marginX;

let menu;

let icons = {
  offense: undefined,
  defense: undefined,
  movement: undefined,
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
let banditChance = 25;
let state = `title`; //  title, game, player1, player2, ending

function preload() {
  //  Load the images
  icons.offense = loadImage(`assets/images/offense.svg`);
  icons.defense = loadImage(`assets/images/defense.svg`);
  icons.movement = loadImage(`assets/images/movement.svg`);
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);

  grid.squareSize = (windowHeight - menuHeight) / grid.height;
  grid.width = Math.floor(windowWidth / grid.squareSize);
  marginX = (windowWidth - grid.width * grid.squareSize) / 2;

  //  Create the units
  for (let i = 0; i < unitAmount; i++) {
    let cavalry = new Cavalry(i * 3 + 3, i * 3 + 2, 1);
    let dragonRider = new DragonRider(i * 3 + 2, i * 3 + 1, 1);
    let infantry = new Infantry(i * 3 + 1, i * 3, 1);
    units.push(cavalry);
    units.push(dragonRider);
    units.push(infantry);
  }

  //  Create the grid
  for (let i = 0; i < grid.width; i++) {
    for (let j = 0; j < grid.height; j++) {
      let tileType = random(tileTypes);
      let tile = new Tile(i, j, tileType);
      tiles.push(tile);
    }
  }

  //  Create the menu
  menu = new Menu();
}

// draw()
//
// Description of draw() goes here.
function draw() {
  if (state === `title`) {
    title();
  } else if (state === `game`) {
    game();
  }
}

function title() {
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(64);
  text(`This is the project's title`, width / 2, height / 2 - 100);
  textSize(32);
  text(
    `Click on your units to select them and move them with WASD or the arrow keys.`,
    width / 2,
    height / 2 + 60
  );
  text(`Press ENTER to play`, width / 2, height / 2 + 120);
}

function game() {
  background(0);
  stroke(0, 0, 0, 100);

  //  Draw the grid
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].display();
  }

  //  Draw the units
  for (let i = 0; i < units.length; i++) {
    units[i].checkMovement();
    units[i].move();
    units[i].display();
    units[i].assignTileType();
  }

  menu.display();
}

function selectSquare(value) {
  let selected = (value - 1) * grid.squareSize;
  return selected;
}

function unitMovement(unit) {
  unit.stats.currentMovement--;
  unit.controllable = false;

  if (unit.stats.currentMovement === 0) {
    unit.selected = false;
  }

  let timeoutDelay = (grid.squareSize / unitSpeed / 60) * 1000;
  setTimeout(function () {
    unit.x = unit.destinationX;
    unit.y = unit.destinationY;
    unit.controllable = true;
    let rng = random(0, 100);
    if (
      rng <= banditChance &&
      unit.tileType.current === `forest` &&
      unit.banditEncounters
    ) {
      alert(`Bandits!`);
    }
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
  if (state === `title` && keyCode === ENTER) {
    state = `game`;
  }

  for (let i = 0; i < units.length; i++) {
    if (units[i].selected && units[i].controllable) {
      if (
        keyCode === LEFT_ARROW ||
        keyCode === RIGHT_ARROW ||
        keyCode === UP_ARROW ||
        keyCode === DOWN_ARROW ||
        keyCode === 65 ||
        keyCode === 68 ||
        keyCode === 87 ||
        keyCode === 83
      ) {
        if (
          (keyCode === LEFT_ARROW || keyCode === 65) &&
          units[i].movable.left &&
          units[i].x >= marginX + unitSpeed
        ) {
          units[i].destinationX = units[i].x - grid.squareSize;
          unitMovement(units[i]);
        } else if (
          (keyCode === RIGHT_ARROW || keyCode === 68) &&
          units[i].movable.right &&
          units[i].x <= (grid.width - 1) * grid.squareSize - unitSpeed
        ) {
          units[i].destinationX = units[i].x + grid.squareSize;
          unitMovement(units[i]);
        } else if (
          (keyCode === UP_ARROW || keyCode === 87) &&
          units[i].movable.up &&
          units[i].y >= menuHeight + unitSpeed
        ) {
          units[i].destinationY = units[i].y - grid.squareSize;
          unitMovement(units[i]);
        } else if (
          (keyCode === DOWN_ARROW || keyCode === 83) &&
          units[i].movable.down &&
          units[i].y <= (grid.height + 1) * grid.squareSize - unitSpeed
        ) {
          units[i].destinationY = units[i].y + grid.squareSize;
          unitMovement(units[i]);
        }
      }
    }
  }
}
