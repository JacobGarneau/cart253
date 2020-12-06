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
let fontReg;
let fontBold;
let menu;
let river;
let road;

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
  purple: {
    r: 253,
    g: 130,
    b: 233,
  },
  move: {
    r: 245,
    g: 220,
    b: 130,
    a: 100,
  },
  attack: {
    r: 255,
    g: 85,
    b: 85,
    a: 150,
  },
  heal: {
    r: 20,
    g: 255,
    b: 155,
    a: 150,
  },
};

let icons = {
  offense: undefined,
  defense: undefined,
  movement: undefined,
  attackable: undefined,
  healable: undefined,
  conquest: undefined,
};

let players = [];

let maleTitles = [`King`, `Prince`, `Duke`, `Lord`];
let femaleTitles = [`Queen`, `Princess`, `Duchess`, `Lady`];

let maleFirstNames = [
  `Edward`,
  `Richard`,
  `William`,
  `Warren`,
  `Gawain`,
  `Godfrey`,
  `Gunter`,
  `Siegfried`,
  `Hubert`,
];
let femaleFirstNames = [
  `Elizabeth`,
  `Hildegarde`,
  `Mary`,
  `Malina`,
  `Isabel`,
  `Caitlyn`,
  `Rose`,
  `Krista`,
  `Sasha`,
];

let lastNames = [
  `of Brightwood`,
  `of Darkfall`,
  `von Arcadia`,
  `von Elderun`,
  `of Ironpact`,
  `von Serelis`,
  `of Midgard`,
  `of Nilfheim`,
  `von Zariel`,
];

let unitAmount = 1;
let units = [];
let unitSpeed = 8;
let unitTypes = [];

let structures = [];
let blueY;
let redY;

let selectionActive = false;
let overlayActive = false;
let shopX;
let spawningUnit;
let choosingSpawn = false;

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
];
let banditChance = 25;
let currentTurn = 2; // 1 (player1), 2 (player2)
let state = `title`; //  title, game, player1, player2, ending

function preload() {
  //  Load the font
  fontReg = loadFont("assets/fonts/Roboto-Regular.ttf");
  fontBold = loadFont("assets/fonts/Roboto-Bold.ttf");

  //  Load generic icons
  icons.offense = loadImage(`assets/images/offense.svg`);
  icons.defense = loadImage(`assets/images/defense.svg`);
  icons.movement = loadImage(`assets/images/movement.svg`);
  icons.attackable = loadImage(`assets/images/attackable.svg`);
  icons.healable = loadImage(`assets/images/healable.svg`);
  icons.conquest = loadImage(`assets/images/conquest.svg`);

  //  Load unit icons
  icons.infantry = loadImage(`assets/images/infantry.svg`);
  icons.cavalry = loadImage(`assets/images/cavalry.svg`);
  icons.archer = loadImage(`assets/images/archer.svg`);
  icons.heavy = loadImage(`assets/images/heavy.svg`);
  icons.mage = loadImage(`assets/images/mage.svg`);
  icons.priest = loadImage(`assets/images/priest.svg`);
  icons.dragon = loadImage(`assets/images/dragon.svg`);
  icons.lord = loadImage(`assets/images/lord.svg`);

  //  Load alternate unit icons
  icons.infantryAlt = loadImage(`assets/images/infantry-alt.svg`);
  icons.cavalryAlt = loadImage(`assets/images/cavalry-alt.svg`);
  icons.archerAlt = loadImage(`assets/images/archer-alt.svg`);
  icons.heavyAlt = loadImage(`assets/images/heavy-alt.svg`);
  icons.mageAlt = loadImage(`assets/images/mage-alt.svg`);
  icons.priestAlt = loadImage(`assets/images/priest-alt.svg`);
  icons.dragonAlt = loadImage(`assets/images/dragon-alt.svg`);

  //  Load terrain icons
  icons.water = loadImage(`assets/images/water.svg`);
  icons.forest = loadImage(`assets/images/forest.svg`);
  icons.mountains = loadImage(`assets/images/mountains.svg`);

  //  Load structure icons
  icons.castle = loadImage(`assets/images/castle.svg`);
  icons.church = loadImage(`assets/images/church.svg`);
  icons.tower = loadImage(`assets/images/tower.svg`);
  icons.lair = loadImage(`assets/images/lair.svg`);
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);
  menuHeight = dyn(120);

  //  Determine all possible unit types
  let infantry = new Infantry(0, 0, 0);
  let cavalry = new Cavalry(0, 0, 0);
  let archer = new Archer(0, 0, 0);
  let heavy = new Heavy(0, 0, 0);
  let mage = new Mage(0, 0, 0);
  let priest = new Priest(0, 0, 0);
  let dragonRider = new DragonRider(0, 0, 0);
  let lord = new Lord(0, 0, 0);

  unitTypes.push(infantry);
  unitTypes.push(cavalry);
  unitTypes.push(archer);
  unitTypes.push(heavy);
  unitTypes.push(mage);
  unitTypes.push(priest);
  unitTypes.push(dragonRider);
  unitTypes.push(lord);

  //  Create the grid and its dimensions
  grid.squareSize = (windowHeight - menuHeight) / grid.height;
  grid.width = Math.floor(windowWidth / grid.squareSize);
  marginX = (windowWidth - grid.width * grid.squareSize) / 2;

  //  Create the players
  for (let i = 0; i < 2; i++) {
    let player = new Player();
    players.push(player);
  }

  // Create the starting units for each player
  // for (let i = 0; i < unitAmount; i++) {
  //   let priest = new Priest(i * 3 + 5, i * 3 + 4, 1);
  //   let cavalry = new Cavalry(i * 3 + 4, i * 3 + 3, 1);
  //   let mage = new Mage(i * 3 + 3, i * 3 + 2, 1);
  //   let infantry = new Infantry(i * 3 + 2, i * 3 + 1, 1);
  //
  //   units.push(priest);
  //   units.push(cavalry);
  //   units.push(mage);
  //   units.push(infantry);
  // }

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

  //  Create the river
  river = new River();

  //  Create the road
  road = new Road();

  //  Create the structures
  castleBlue = new Structure(`castle`, 1);
  castleRed = new Structure(`castle`, 2);
  church = new Structure(`church`, 3);
  tower = new Structure(`tower`, 3);
  lair = new Structure(`lair`, 3);

  structures.push(castleBlue);
  structures.push(castleRed);
  structures.push(church);
  structures.push(tower);
  structures.push(lair);
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

function start() {
  // Create the lords
  for (let i = 0; i < 6; i++) {
    let lordUnit;
    let blueLordY;
    let redLordY;

    if (width > 680) {
      blueLordY = Math.floor(blueY / grid.squareSize);
      redLordY = Math.floor(redY / grid.squareSize);
    } else if (width <= 680) {
      blueLordY = Math.floor(blueY / grid.squareSize) + 1;
      redLordY = Math.floor(redY / grid.squareSize) + 1;
    }

    if (i === 0) {
      lordUnit = new Lord(selectSquare(3), selectSquare(blueLordY), 1);
    } else if (i === 1) {
      lordUnit = new Lord(selectSquare(2), selectSquare(blueLordY + 1), 1);
    } else if (i === 2) {
      lordUnit = new Lord(selectSquare(2), selectSquare(blueLordY - 1), 1);
    } else if (i === 3) {
      lordUnit = new Lord(
        selectSquare(grid.width - 2),
        selectSquare(redLordY),
        2
      );
    } else if (i === 4) {
      lordUnit = new Lord(
        selectSquare(grid.width - 1),
        selectSquare(redLordY + 1),
        2
      );
    } else if (i === 5) {
      lordUnit = new Lord(
        selectSquare(grid.width - 1),
        selectSquare(redLordY - 1),
        2
      );
    }
    units.push(lordUnit);
  }

  changeTurns(1);
}

function game() {
  background(0);
  stroke(0, 0, 0, 100);

  for (let i = 0; i < tiles.length; i++) {
    // console.log(tiles[i].structureTeam);
  }

  //  Draw the grid
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].display();

    if (tiles[i].spawnpoint) {
      tiles[i].displaySpawnpoints();
    }
  }

  //  Draw the structures
  for (let i = 0; i < structures.length; i++) {
    structures[i].display();
  }

  //  Draw the units
  for (let i = 0; i < units.length; i++) {
    units[i].checkAttack();
    units[i].checkMovement();
    units[i].move();
    units[i].display();
    units[i].assignTileType();
    units[i].checkDefeated();

    if (units[i] instanceof Priest) {
      units[i].checkHealing();
    }

    if (units[i] instanceof Lord) {
      units[i].checkConquest();
    }
  }

  for (let i = 0; i < units.length; i++) {
    units[i].displayAttack();

    if (units[i] instanceof Priest) {
      units[i].displayHealing();
    }

    if (units[i] instanceof Lord) {
      units[i].displayConquest();
    }
  }

  if (overlayActive) {
    push();
    fill(0, 0, 0, 127);
    rect(0, 0, width, height);
    pop();
  }
  menu.display();
  if (menu.shopOpen !== 0) {
    menu.displayShop();
  }
}

function selectSquare(value) {
  let selected = (value - 1) * grid.squareSize;
  return selected;
}

function changeTurns(player) {
  for (let i = 0; i < units.length; i++) {
    if (units[i].team === currentTurn) {
      units[i].endTurn();
    } else if (units[i].team !== currentTurn) {
      units[i].tapped = false;
      units[i].stats.currentMovement = units[i].stats.movement;
    }
  }

  currentTurn = player;
}

function mouseMoved() {
  //  Detect "buy" menu item hover
  if (menu.shopOpen !== 0) {
    for (let i = 0; i < players[currentTurn - 1].buyable.length; i++) {
      let dX = dist(mouseX, 0, shopX, 0);
      let dY = dist(0, mouseY, 0, menuHeight / 2 + dyn(50) + dyn(96) * (i + 1));

      if (
        dX < dyn(384) + 1 &&
        mouseX > shopX &&
        dY < dyn(50) + 1 &&
        mouseY > menuHeight / 2 + dyn(96) * (i + 1)
      ) {
        for (let j = 0; j < players[currentTurn - 1].buyable.length; j++) {
          players[currentTurn - 1].buyable[j].hovered = false;
        }
        players[currentTurn - 1].buyable[i].hovered = true;
      }
    }
  }
}

function mouseClicked() {
  //  Detect "buy" menu clicks
  if (menu.shopOpen !== 0) {
    for (let i = 0; i < players[currentTurn - 1].buyable.length; i++) {
      let dX = dist(mouseX, 0, shopX, 0);
      let dY = dist(0, mouseY, 0, menuHeight / 2 + dyn(50) + dyn(96) * (i + 1));

      if (
        dX < dyn(384) + 1 &&
        mouseX > shopX &&
        dY < dyn(50) + 1 &&
        mouseY > menuHeight / 2 + dyn(96) * (i + 1) &&
        players[currentTurn - 1].buyable[i]
      ) {
        menu.buyUnit(players[currentTurn - 1].buyable[i]);
      }
    }
  }

  //  Open "buy" menu
  let dBuyX1 = dist(mouseX, 0, dyn(580), 0);
  let dBuyX2 = dist(mouseX, 0, width - dyn(580), 0);
  let dBuyY = dist(0, mouseY, 0, menuHeight / 2 + dyn(15));

  if (
    dBuyX1 < dyn(30) &&
    dBuyY < dyn(16) &&
    menu.shopOpen === 0 &&
    currentTurn === 1
  ) {
    menu.shopOpen = 1;
    overlayActive = true;
  } else if (
    dBuyX2 < dyn(30) &&
    dBuyY < dyn(16) &&
    menu.shopOpen === 0 &&
    currentTurn === 2
  ) {
    menu.shopOpen = 2;
    overlayActive = true;
  } else if (
    (dBuyX1 < dyn(30) && dBuyY < dyn(16) && menu.shopOpen === 1) ||
    (dBuyX2 < dyn(30) && dBuyY < dyn(16) && menu.shopOpen === 2)
  ) {
    menu.shopOpen = 0;
    overlayActive = false;
  }

  //  End turn
  let dEndTurnX = dist(mouseX, 0, menu.endTurn.x, 0);
  let dEndTurnY = dist(0, mouseY, 0, menu.endTurn.y);

  if (
    dEndTurnX < menu.endTurn.width / 2 &&
    dEndTurnY < menu.endTurn.height / 2
  ) {
    for (let i = 0; i < units.length; i++) {
      units[i].endTurn();
    }
    if (currentTurn === 1) {
      changeTurns(2);
    } else if (currentTurn === 2) {
      changeTurns(1);
    }
    menu.shopOpen = 0;
    overlayActive = false;
  }

  //  Detect unit spawn clicks
  for (let i = 0; i < tiles.length; i++) {
    if (choosingSpawn) {
      tiles[i].spawn();
    }
  }

  //  Detect unit interaction clicks
  for (let i = 0; i < units.length; i++) {
    units[i].attack();

    if (units[i] instanceof Priest) {
      units[i].heal();
    }

    if (units[i] instanceof Lord) {
      units[i].conquer();
    }

    let d = dist(
      units[i].x + grid.squareSize / 2,
      units[i].y + grid.squareSize / 2,
      mouseX,
      mouseY
    );
    if (d <= grid.squareSize / 2) {
      if (units[i].selected) {
        if (units[i].stats.currentMovement === 0) {
          units[i].endTurn();
        }
        units[i].selected = false;
        selectionActive = false;
      } else if (
        currentTurn === units[i].team &&
        units[i].tapped === false &&
        !selectionActive
      ) {
        for (let j = 0; j < units.length; j++) {
          units[j].selected = false;
        }
        units[i].selected = true;
        selectionActive = true;
      }
    }
  }
}

function keyPressed() {
  if (state === `title` && keyCode === ENTER) {
    start();
    state = `game`;
  }

  for (let i = 0; i < units.length; i++) {
    if (
      units[i].selected &&
      units[i].controllable &&
      units[i].stats.currentMovement > 0
    ) {
      units[i].handleInput(keyCode);
    }
  }
}
