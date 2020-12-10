/**************************************************
Project 2 - Anything
Jacob Garneau

A strategy game about medieval warfare.

All icons except for the offense, defense and movement icons (made by me) were taken from FontAwesome (fontawesome.com) under Creative Commons license.
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
let popup;
let river;
let road;

//  Define the color palette
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

let sounds = {
  attack: undefined,
  magicAttack: undefined,
  heal: undefined,
  conquest: undefined,
  lordDefeat: undefined,
  selectUnit: undefined,
  bandits: undefined,
  pay: undefined,
};

let music = {
  track1: undefined,
  track2: undefined,
  track3: undefined,
  selected: `tranquility`,
};

let players = [];

//  List the possible titles
let maleTitles = [`King`, `Prince`, `Duke`, `Lord`];
let femaleTitles = [`Queen`, `Princess`, `Duchess`, `Lady`];

//  List the possible names
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
  `Lizbeth`,
  `Hilda`,
  `Mary`,
  `Marina`,
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
let moneyPerTurn = 150;
let conquestReward = 0;

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
let banditChance = 20;
let banditFee = 150;
let banditDamage = 3;
let banditTarget = undefined;
let currentTurn = 2; // 1 (player1), 2 (player2)
let state = `title`; //  title, game, player1, player2, ending
let page = `main`; // main, tutorials
let victor;

//  preload()
//  p5: Loads the required assets (fonts, icons and sounds)
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
  icons.bandits = loadImage(`assets/images/bandits.svg`);
  icons.pay = loadImage(`assets/images/pay.svg`);
  icons.victory = loadImage(`assets/images/victory.png`);
  icons.info = loadImage(`assets/images/info.svg`);

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

  //  Load sound effects
  soundFormats("wav");
  sounds.attack = loadSound("assets/sounds/attack");
  sounds.magicAttack = loadSound("assets/sounds/attack_magic");
  sounds.heal = loadSound("assets/sounds/heal");
  sounds.conquest = loadSound("assets/sounds/conquest");
  sounds.lordDefeat = loadSound("assets/sounds/lord_defeat");
  sounds.selectUnit = loadSound("assets/sounds/select");
  sounds.bandits = loadSound("assets/sounds/bandits");
  sounds.pay = loadSound("assets/sounds/pay");

  //  Set volume of the sound effects
  sounds.attack.setVolume(0.05);
  sounds.magicAttack.setVolume(0.5);
  sounds.heal.setVolume(1);
  sounds.conquest.setVolume(0.1);
  sounds.lordDefeat.setVolume(0.5);
  sounds.selectUnit.setVolume(0.1);
  sounds.bandits.setVolume(0.05);
  sounds.pay.setVolume(1);

  //  Load music tracks
  soundFormats("mp3");
  music.track1 = loadSound("assets/sounds/cold_music");
  music.track2 = loadSound("assets/sounds/forest_music");
  music.track3 = loadSound("assets/sounds/desert_music");

  //  Set volume of themusic tracks
  music.track1.setVolume(0.1);
  music.track2.setVolume(0.1);
  music.track3.setVolume(0.1);
}

//  setup()
//  Sets up the units types, the grid, the structures, the players and the UI components
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

  //  Create the grid
  for (let i = 0; i < grid.width; i++) {
    for (let j = 0; j < grid.height; j++) {
      let tileType = random(tileTypes);
      let tile = new Tile(i, j, tileType);
      tiles.push(tile);
    }
  }

  //  Create the popups
  popup = new Popup();

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

//  dyn(num)
//  Converts inputted numbers into a value that fits the size of the screen
function dyn(num) {
  let result = width / (1920 / num);
  return result;
}

//  draw()
//  p5: Handles the various states
function draw() {
  if (state === `title`) {
    title();
  } else if (state === `game`) {
    game();
  } else if (state === `ending`) {
    ending();
  }
}

//  title()
//  Handles the various pages of the title screen
function title() {
  if (page === `main`) {
    drawMain();
  }
}

//  drawMain()
//  Displays the main page of the title screen
function drawMain() {
  background(0);
  let p1Y;
  let p2Y;
  let musicY;

  //  Draw the menu text
  push();
  fill(255);
  textSize(96);
  textAlign(CENTER, CENTER);
  textFont(fontBold);
  text(`Flames of Conquest`, width / 2, dyn(180));

  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(`Press ENTER to start`, width / 2, height - dyn(80));

  //  Music options
  text(`Music`, width / 2, 300);
  textSize(24);
  textAlign(LEFT, CENTER);
  fill(255);
  text(`Tranquility`, width / 2 - dyn(40), 377);
  text(`Brightwood`, width / 2 - dyn(40), 419);
  text(`Vestige`, width / 2 - dyn(40), 462);

  push();
  stroke(255);
  strokeWeight(3);
  fill(0);
  ellipse(width / 2 - dyn(100), 377, 24);
  ellipse(width / 2 - dyn(100), 419, 24);
  ellipse(width / 2 - dyn(100), 462, 24);
  pop();

  if (music.selected === `tranquility`) {
    musicY = 377;
  } else if (music.selected === `brightwood`) {
    musicY = 419;
  } else if (music.selected === `vestige`) {
    musicY = 462;
  }

  push();
  noStroke();
  fill(colors.purple.r, colors.purple.g, colors.purple.b);
  ellipse(width / 2 - dyn(100), musicY, 16);
  pop();

  //  Player options
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(colors.blue.r, colors.blue.g, colors.blue.b);
  text(`Player 1`, width / 2 - dyn(360), 300);
  fill(colors.red.r, colors.red.g, colors.red.b);
  text(`Player 2`, width / 2 + dyn(360), 300);

  textSize(24);
  textAlign(LEFT, CENTER);
  fill(255);
  text(`Male`, width / 2 - dyn(360), 375);
  push();
  stroke(255);
  strokeWeight(3);
  fill(0);
  ellipse(width / 2 - dyn(420), 377, 24);
  pop();

  text(`Female`, width / 2 - dyn(360), 417);
  push();
  stroke(255);
  strokeWeight(3);
  fill(0);
  ellipse(width / 2 - dyn(420), 419, 24);
  pop();

  if (players[1].gender === `male`) {
    p1Y = 377;
  } else if (players[1].gender === `female`) {
    p1Y = 419;
  }

  push();
  noStroke();
  fill(colors.blue.r, colors.blue.g, colors.blue.b);
  ellipse(width / 2 - dyn(420), p1Y, 16);
  pop();

  text(`Male`, width / 2 + dyn(360), 375);
  push();
  stroke(255);
  strokeWeight(3);
  fill(0);
  ellipse(width / 2 + dyn(300), 377, 24);
  pop();
  text(`Female`, width / 2 + dyn(360), 417);
  push();
  stroke(255);
  strokeWeight(3);
  fill(0);
  ellipse(width / 2 + dyn(300), 419, 24);
  pop();

  if (players[0].gender === `male`) {
    p2Y = 377;
  } else if (players[0].gender === `female`) {
    p2Y = 419;
  }

  push();
  noStroke();
  fill(colors.red.r, colors.red.g, colors.red.b);
  ellipse(width / 2 + dyn(300), p2Y, 16);
  pop();

  pop();
}

//  start()
//  Starts the game
function start() {
  //  Create the player names
  for (let i = 0; i < 2; i++) {
    players[i].createName();
  }

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

  //  Set turn to player 1
  changeTurns(1);

  //  Start the music
  if (music.selected === `tranquility`) {
    music.track1.loop();
    music.track1.play();
  } else if (music.selected === `brightwood`) {
    music.track2.loop();
    music.track2.play();
  } else if (music.selected === `vestige`) {
    music.track3.loop();
    music.track3.play();
  }
}

//  game()
//  Handles the displaying of the game elements and the actions taken by units or menus
function game() {
  background(0);
  stroke(0, 0, 0, 100);

  //  Draw the grid
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].display();
  }

  //  Draw the available spawnpoints
  for (let i = 0; i < tiles.length; i++) {
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

  //  Display the available unit actions
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

  //  Display the menu
  menu.display();
  if (menu.shopOpen !== 0) {
    menu.displayShop();
  }

  //  Display the popups
  if (popup.active === `bandits`) {
    popup.bandits();
  } else if (popup.active === `insufficientFunds`) {
    popup.insufficientFunds();
  } else if (popup.active === `unitInfo`) {
    popup.unitInfo();
  }
}

//  selectSquare(value)
//  Selects a tile from its x and y coordinates on the grid
function selectSquare(value) {
  let selected = (value - 1) * grid.squareSize;
  return selected;
}

//  changeTurns(player)
//  Changes the active turn from one player to the other
function changeTurns(player) {
  for (let i = 0; i < units.length; i++) {
    if (units[i].team === currentTurn) {
      units[i].endTurn();
    } else if (units[i].team !== currentTurn) {
      units[i].tapped = false;
      units[i].stats.currentMovement = units[i].stats.movement;
    }
  }

  //  Distribute money per turn
  if (currentTurn === 1) {
    players[0].currency += moneyPerTurn;
  } else {
    if (currentTurn === 2) {
      players[1].currency += moneyPerTurn;
    }
  }

  for (let i = 0; i < tiles.length; i++) {
    tiles[i].spawnpoint = false;
  }

  choosingSpawn = false;
  currentTurn = player;
}

//  ending()
//  Displays the ending screen
function ending() {
  background(0);

  imageMode(CENTER);
  image(icons.victory, width / 2, height / 2);

  if (victor === players[1]) {
    fill(colors.blue.r, colors.blue.g, colors.blue.b);
  } else if (victor === players[0]) {
    fill(colors.red.r, colors.red.g, colors.red.b);
  }
  textAlign(CENTER, CENTER);
  textSize(64);
  text(`Victory!`, width / 2, height / 2 - 100);
  fill(255);
  textSize(32);
  text(`These lands are now the property of`, width / 2, height / 2 + 60);
  if (victor === players[1]) {
    fill(colors.blue.r, colors.blue.g, colors.blue.b);
  } else if (victor === players[0]) {
    fill(colors.red.r, colors.red.g, colors.red.b);
  }
  text(
    `${victor.title} ${victor.firstName} ${victor.lastName}`,
    width / 2,
    height / 2 + 120
  );
}

//  mouseMoved()
//  p5: Handles the hover animations
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
        popup.active = `unitInfo`;
        popup.unitID = players[currentTurn - 1].buyable[i];
      }
    }
  }
}

//  mouseClicked()
//  p5: Handles the click interactions with units, menu elements, and the like
function mouseClicked() {
  //  Detect title menu clicks
  if (state === `title`) {
    if (page === `main`) {
      let dM1 = dist(mouseX, mouseY, width / 2 - dyn(420), 377);
      let dF1 = dist(mouseX, mouseY, width / 2 - dyn(420), 419);
      let dM2 = dist(mouseX, mouseY, width / 2 + dyn(300), 377);
      let dF2 = dist(mouseX, mouseY, width / 2 + dyn(300), 419);
      let dMusic1 = dist(mouseX, mouseY, width / 2 - dyn(100), 377);
      let dMusic2 = dist(mouseX, mouseY, width / 2 - dyn(100), 419);
      let dMusic3 = dist(mouseX, mouseY, width / 2 - dyn(100), 462);

      if (dM1 <= 24) {
        players[1].gender = `male`;
      } else if (dF1 <= 24) {
        players[1].gender = `female`;
      } else if (dM2 <= 24) {
        players[0].gender = `male`;
      } else if (dF2 <= 24) {
        players[0].gender = `female`;
      } else if (dMusic1 <= 24) {
        music.selected = `tranquility`;
      } else if (dMusic2 <= 24) {
        music.selected = `brightwood`;
      } else if (dMusic3 <= 24) {
        music.selected = `vestige`;
      }
    }
  }

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
        setTimeout(() => {
          menu.buyUnit(players[currentTurn - 1].buyable[i]);
        }, 50);
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
    currentTurn === 1 &&
    popup.active !== `bandits`
  ) {
    menu.shopOpen = 1;
    overlayActive = true;
    popup.active = `buy`;
  } else if (
    dBuyX2 < dyn(30) &&
    dBuyY < dyn(16) &&
    menu.shopOpen === 0 &&
    currentTurn === 2 &&
    popup.active !== `bandits`
  ) {
    menu.shopOpen = 2;
    overlayActive = true;
    popup.active = `buy`;
  } else if (
    (dBuyX1 < dyn(30) && dBuyY < dyn(16) && menu.shopOpen === 1) ||
    (dBuyX2 < dyn(30) && dBuyY < dyn(16) && menu.shopOpen === 2)
  ) {
    menu.shopOpen = 0;
    overlayActive = false;
    popup.active = undefined;
  }

  //  End turn
  let dEndTurnX = dist(mouseX, 0, menu.endTurn.x, 0);
  let dEndTurnY = dist(0, mouseY, 0, menu.endTurn.y);

  if (
    dEndTurnX < menu.endTurn.width / 2 &&
    dEndTurnY < menu.endTurn.height / 2 &&
    popup.active !== `bandits`
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
    popup.active = undefined;
  }

  //  Detect unit spawn clicks
  for (let i = 0; i < tiles.length; i++) {
    if (choosingSpawn) {
      if (
        tiles[i].type === `castle` ||
        tiles[i].type === `church` ||
        tiles[i].type === `tower` ||
        tiles[i].type === `lair`
      ) {
        tiles[i].spawn(
          tiles[i].tiles.up,
          tiles[i].tiles.down,
          tiles[i].tiles.left,
          tiles[i].tiles.right
        );
      }
    }
  }

  //  Detect unit interaction clicks
  for (let i = 0; i < units.length; i++) {
    if (popup.active === undefined) {
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
          sounds.selectUnit.play();
        }
      }
    }
  }
}

//  keyPressed()
//  p5: Handles the key events for units, menus, and popups
function keyPressed() {
  //  Start the game
  if (state === `title` && keyCode === ENTER) {
    start();
    state = `game`;
  }

  //  Move the units
  for (let i = 0; i < units.length; i++) {
    if (
      popup.active === undefined &&
      units[i].selected &&
      units[i].controllable &&
      units[i].stats.currentMovement > 0
    ) {
      units[i].handleInput(keyCode);
    }
  }

  //  Handle bandits
  if (popup.active === `bandits` && keyCode === 70) {
    banditTarget.takeDamage(banditDamage, false);
    banditTarget = undefined;
    sounds.attack.play();
    popup.close();
  } else if (popup.active === `bandits` && keyCode === 80) {
    if (currentTurn === 1 && players[1].currency >= banditFee) {
      players[1].currency -= banditFee;
      sounds.pay.play();
      popup.close();
    } else if (currentTurn === 2 && players[0].currency >= banditFee) {
      players[0].currency -= banditFee;
      sounds.pay.play();
      popup.close();
    }
  } else if (popup.active === `insufficientFunds` && keyCode === 88) {
    popup.close();
  }
}
