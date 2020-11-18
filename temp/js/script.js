/**************************************************
Project 2 - Anything
Jacob Garneau

A strategy game about medieval warfare.

This prototype focuses on showcasing the movement of the units on the grid.
All units cannot cross water (blue) tiles, and cavalry units cannot cross mountain (grey) tiles.

Icons in the proposal document were taken from FontAwesome (fontawesome.com) under Creative Commons license.
**************************************************/

let grid = {
  height: 10,
  width: undefined,
  squareSize: undefined,
};

let menuHeight = 120;
let marginX;

let menu;

let colors = {
  blue: {
    r: 85,
    g: 194,
    b: 255,
  },
  red: {
    r: 255,
    g: 85,
    b: 85,
  },
};

let icons = {
  offense: undefined,
  defense: undefined,
  movement: undefined,
  attackable: undefined,
};

let players = [];

let maleTitles = [`King`, `Prince`, `Duke`, `Lord`];
let femaleTitles = [`Queen`, `Princess`, `Duchess`, `Lady`];

let maleFirstNames = [`Edward`, `Richard`, `William`];
let femaleFirstNames = [`Elizabeth`, `Hildegarde`, `Mary`];

let middleNames = [`von`, `of`];
let lastNames = [`Brightwood`, `Darkfall`, `Arcadia`];

let unitAmount = 1;
let units = [];
let unitSpeed = 8;
let activeUnits = [unitAmount * 3, unitAmount * 3];

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
let currentTurn = 1; // 1 (player1), 2 (player2)
let state = `game`; //  title, game, player1, player2, ending

function preload() {
  //  Load the images
  icons.offense = loadImage(`assets/images/offense.svg`);
  icons.defense = loadImage(`assets/images/defense.svg`);
  icons.movement = loadImage(`assets/images/movement.svg`);
  icons.attackable = loadImage(`assets/images/attackable.svg`);
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);

  grid.squareSize = (windowHeight - menuHeight) / grid.height;
  grid.width = Math.floor(windowWidth / grid.squareSize);
  marginX = (windowWidth - grid.width * grid.squareSize) / 2;

  //  Create the players
  for (let i = 0; i < 2; i++) {
    let player = new Player();
    players.push(player);
  }

  //  Create the units
  for (let i = 0; i < unitAmount; i++) {
    let cavalry = new Cavalry(i * 3 + 4, i * 3 + 3, 1);
    let dragonRider = new DragonRider(i * 3 + 3, i * 3 + 2, 1);
    let infantry = new Infantry(i * 3 + 2, i * 3 + 1, 1);
    units.push(cavalry);
    units.push(dragonRider);
    units.push(infantry);
  }

  for (let i = 0; i < unitAmount; i++) {
    let cavalry = new Cavalry(i * 3 + 4, i * 3 + 6, 2);
    let dragonRider = new DragonRider(i * 3 + 3, i * 3 + 5, 2);
    let infantry = new Infantry(i * 3 + 2, i * 3 + 4, 2);
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

//  Convert inputted numbers into a value that fits the size of the screen
function dyn(num) {
  let result = width / (1920 / num);
  return result;
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
    units[i].checkAttack();
    units[i].checkMovement();
    units[i].move();
    units[i].display();
    units[i].assignTileType();
  }

  for (let i = 0; i < units.length; i++) {
    units[i].displayAttack();
  }

  handleTurns();
  menu.display();
}

function selectSquare(value) {
  let selected = (value - 1) * grid.squareSize;
  return selected;
}

function handleTurns() {
  console.log(
    `Player 1 units: ${activeUnits[0]}, Player 2 units: ${activeUnits[1]}`
  );

  for (let i = 0; i < units.length; i++) {
    if (units[i].team !== currentTurn) {
      units[i].tapped = true;
    }
  }

  if (activeUnits[currentTurn - 1] === 0 && currentTurn === 1) {
    activeUnits[1] = unitAmount * 3;
    for (let i = 0; i < units.length; i++) {
      if (units[i].team === 2) {
        units[i].tapped = false;
      }
    }
    currentTurn = 2;
  } else if (activeUnits[currentTurn - 1] === 0 && currentTurn === 2) {
    activeUnits[0] = unitAmount * 3;
    for (let i = 0; i < units.length; i++) {
      if (units[i].team === 1) {
        units[i].tapped = false;
      }
    }
    currentTurn = 1;
  }
}

function mouseClicked() {
  for (let i = 0; i < units.length; i++) {
    units[i].attack();

    let d = dist(
      units[i].x + grid.squareSize / 2,
      units[i].y + grid.squareSize / 2,
      mouseX,
      mouseY
    );
    if (d <= grid.squareSize / 2) {
      if (units[i].selected) {
        units[i].selected = false;
      } else if (currentTurn === units[i].team && units[i].tapped === false) {
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
      units[i].handleInput(keyCode);
    }
  }
}
