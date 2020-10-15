/**************************************************
Project 1 - Simulation
Jacob Garneau
Piano Simulator
**************************************************/

//  Information about the user

let user = {
  x: 0,
  y: 0,
  width: 0,
  height: 10,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  acceleration: 0.25,
  maxSpeed: 10
}

//  Information about the falling note
let note = {
  x: 0,
  y: 0,
  size: 0,
  fill: {
    r: 0,
    g: 127,
    b: 255
  },
  vx: 0,
  vy: 0,
  speed: 3,
  played: 0
}

//  Sound file storing
let instrument = {
  piano: [],
  banjo: [],
  clarinet: [],
  flute: []
}

//  Information about the currently highlighted note
let highlight = {
  x: undefined,
  played: undefined,
  fill: {
    r: 0,
    g: 0,
    b: 0
  }
};

//  Information about various musical scales and the notes they contain, as well as their visual representations
let scaleNotes = {
  major: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
  minor: [0,1,22,3,4,24,25,7,8,27,10,11,29,30,14,15,32,17,18,34,35],
  pentatonicMajor: [21,22,23,24,25,26,27,28,29,30,31,32,33,34,35],
  pentatonicMinor: [21,2,23,24,6,26,9,28,29,13,31,16,33,34,20],
  natMajorImg: undefined,
  natMinorImg: undefined,
  pentaMajorImg: undefined,
  pentaMinorImg: undefined
};

//  Information about the clickable boxes in the menu
let menuButtons = {
  instrument: {
    y: [379,421,463,505],
    size: 20
  },
  scale: {
    y: [379,421,463,505],
    size: 20
  },
  start: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }
}

//  Information about the cyan dots in the menu boxes
let menuCheckmarks = {
  instrument: {
    x: 0,
    y: 379,
    size: 12
  },
  scale: {
    x: 0,
    y: 379,
    size: 12
  }
}

//  Information about the "Press ENTER to start" menu text
let pressStart = {
  fill: {
    r: 255,
    g: 255,
    b: 255,
    a: 255
  }
}

let numWhiteKeys = 21;  //  The number of white keys displayed on the screen
let keyboardHeight = undefined; //  The physical height of the keyboard

let rightNotes = [];  //  Array containing the notes that are part of the scale
let wrongNotes = [];  //  Array containing the notes that not are part of the scale
let rightPercent = 75;  //  Percentage of chances that the new note will be part of the scale

let activeScale = undefined;  //  The currently active muscial scale
let scaleImage = undefined; //  As in the image of the musical scale, not the size of the image
let activeInstrument = undefined; //  The currently active instrument sound
let state = `title`; //  title,simulation,ending
let score = 0;  //  Current score of the user
let time = 60;  //  Used to track seconds
let seconds = 30; //  Seconds remaining to the simulation
let displayFont;  //  Font used to display text

//  preload()
//  Preloads the necessary files (mainly sound files)
function preload() {
  //  Load the sounds
  for (let i = 0; i < numWhiteKeys + numWhiteKeys / 7 * 5; i++) {
    instrument.piano[i] = loadSound(`assets/sounds/piano/piano${i}.mp3`);
  }
  for (let i = 0; i < numWhiteKeys + numWhiteKeys / 7 * 5; i++) {
    instrument.banjo[i] = loadSound(`assets/sounds/banjo/banjo${i}.mp3`);
  }
  for (let i = 0; i < numWhiteKeys + numWhiteKeys / 7 * 5; i++) {
    instrument.clarinet[i] = loadSound(`assets/sounds/clarinet/clarinet${i}.mp3`);
  }
  for (let i = 0; i < numWhiteKeys + numWhiteKeys / 7 * 5; i++) {
    instrument.flute[i] = loadSound(`assets/sounds/flute/flute${i}.mp3`);
  }

  //  Load the images
  scaleNotes.natMajorImg = loadImage(`assets/images/natMajor.png`);
  scaleNotes.natMinorImg = loadImage(`assets/images/natMinor.png`);
  scaleNotes.pentaMajorImg = loadImage(`assets/images/pentaMajor.png`);
  scaleNotes.pentaMinorImg = loadImage(`assets/images/pentaMinor.png`);

  //  Load the font
  displayFont = loadFont("assets/fonts/bahnschrift.ttf");
}

// setup()
// Creates the canvas and sets up the necessary variables
function setup() {
  createCanvas(windowWidth,windowHeight);
  note.vy = note.speed;

  keyboardHeight = height / 3;
  activeInstrument = `piano`;
  activeScale = scaleNotes.major;
  scaleImage = scaleNotes.natMajorImg;

  menuCheckmarks.instrument.x = width / 4 - 28;
  menuCheckmarks.scale.x = width / 4 * 3 - 28;

  user.x = width / 2;
  user.y = (height - keyboardHeight + 80) / 2;
  user.width = width / 3;

  setInterval(function () {
    if (pressStart.fill.r === 255) {
      pressStart.fill.r = pressStart.fill.g = pressStart.fill.b = pressStart.fill.a = 0
    } else {
      pressStart.fill.r = pressStart.fill.g = pressStart.fill.b = pressStart.fill.a = 255
    }
  },500);
}

// draw()
// Handles the three states and refers to their respective functions
function draw() {
  if (state === `title`) {
    title();
  } else if (state === `simulation`) {
    simulation();
  } else if (state === `ending`) {
    ending();
  }
}

//  title()
//  Displays the title screen and the options
function title() {
  background(20);

  drawMenuContent();
  drawMenuButtons();
  drawMenuCheckmarks();
}

//  drawMenuContent()
//  Draws the non-interactive menu content
function drawMenuContent() {
  //  Draw the menu text
  push();
  fill(255);
  textSize(96);
  textAlign(CENTER,CENTER);
  textFont(displayFont);
  text(`Piano Simulator`,width / 2,100);

  fill(pressStart.fill.r,pressStart.fill.g,pressStart.fill.b,pressStart.fill.a);
  textSize(32);
  textAlign(CENTER,CENTER);
  text(`Press ENTER to start`,width / 2,702);

  fill(255);
  textSize(20);
  textAlign(CENTER,CENTER);
  text(`Avoid the blue notes and catch the red notes before they hit the keyboard!\nTurn up your volume to hear the notes being played.\nMove with WASD or the arrow keys.`,width / 2,602);

  textSize(32);
  textAlign(LEFT,CENTER);
  text(`Instrument`, width / 4 - 50,300);
  text(`Scale`, width / 4 * 3 - 50,300);

  textSize(24);
  text(`Piano`, width / 4,375);
  text(`Banjo`, width / 4,417);
  text(`Clarinet`, width / 4,459);
  text(`Flute`, width / 4,501);

  text(`Natural major (C)`, width / 4 * 3,375);
  text(`Natural minor (C)`, width / 4 * 3,417);
  text(`Pentatonic major (C#)`, width / 4 * 3,459);
  text(`Pentatonic minor (C#)`, width / 4 * 3,501);
  pop();

  //  Draw the menu images
  imageMode(CENTER);
  image(scaleImage,width / 2, height / 2 + 80,width / 4,height / 4 - 40);
}

//  drawMenuButtons()
//  Draws the clickable buttons in the title menu
function drawMenuButtons() {
  push();
  stroke(255);
  strokeWeight(2);
  fill(20);

  for (let i = 0; i < 4; i++) {
    ellipse(width / 4 - 28,menuButtons.instrument.y[i],menuButtons.instrument.size);
  }

  for (let i = 0; i < 4; i++) {
    ellipse(width / 4 * 3 - 28,menuButtons.scale.y[i],menuButtons.scale.size);
  }
  pop();
}

//  drawMenuCheckmarks()
//  Draws the cyan circles in the menu boxes to indicate the currently selected options
function drawMenuCheckmarks() {
  push();
  fill(0,255,255);
  noStroke();
  ellipse(menuCheckmarks.instrument.x,menuCheckmarks.instrument.y,menuCheckmarks.instrument.size);
  ellipse(menuCheckmarks.scale.x,menuCheckmarks.scale.y,menuCheckmarks.scale.size);
  pop();
}

//  simulation()
//  Runs the piano simulation
function simulation() {
  background(127, 255, 200);

  moveUser();
  moveNotes();
  keyboard();
  detectNoteHeight();
  displayTopbar();
}

//  ending()
//  Displays the ending screen
function ending() {
  background(20);
  displayEndingText();
}

//  displayEndingText()
//  Displays the text on the ending screen
function displayEndingText() {
  push();
  fill(255);
  textSize(96);
  textAlign(CENTER,CENTER);
  textFont(displayFont);
  text(`Time is up!`,width / 2,height / 2 - 120);
  textSize(64);
  text(`Final score: ${score}`,width / 2, height / 2 + 80);

  fill(pressStart.fill.r,pressStart.fill.g,pressStart.fill.b,pressStart.fill.a);
  textSize(32);
  textAlign(CENTER,CENTER);
  text(`Press ENTER to return to the main menu`,width / 2,602);
  pop();
}

//  moveUser()
//  Displays and moves the user depending on keyboard inputs
function moveUser() {
  user.x += user.vx;
  user.x = constrain(user.x,0 + user.width / 2,width - user.width / 2);
  user.y += user. vy;
  user.y = constrain(user.y,80 + user.height / 2,height - keyboardHeight - user.height / 2);

  push();
  fill(0);
  noStroke();
  rectMode(CENTER);
  rect(user.x,user.y,user.width,user.height);
  pop();

  //  User Controls
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    user.ax = -user.acceleration;
    user.vx += user.ax;
    user.vx = constrain(user.vx,-user.maxSpeed,user.maxSpeed);
  } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    user.ax = user.acceleration;
    user.vx += user.ax;
    user.vx = constrain(user.vx,-user.maxSpeed,user.maxSpeed);
  } else {
    if (user.vx < 0) {
      user.vx += user.acceleration;
    } else if (user.vx > 0) {
      user.vx -= user.acceleration;
    }
  }

  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    user.ay = -user.acceleration;
    user.vy += user.ay;
    user.vy = constrain(user.vy,-user.maxSpeed,user.maxSpeed);
  } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    user.ay = user.acceleration;
    user.vy += user.ay;
    user.vy = constrain(user.vy,-user.maxSpeed,user.maxSpeed);
  } else {
    if (user.vy < 0) {
      user.vy += user.acceleration;
    } else if (user.vy > 0) {
      user.vy -= user.acceleration;
    }
  }

  detectUserCollision();
}

//  moveNotes()
//  Draws notes that fall towards the keyboard
function moveNotes() {
  note.y += note.vy;

  push();
  fill(note.fill.r,note.fill.g,note.fill.b);
  noStroke();
  ellipse(note.x,note.y,note.size);
  pop();
}

//  keyboard()
//  Draws the black and white keys of the keyboard
function keyboard() {
  //  Draw the white keys
  fill(255);
  for (let i = 0; i < numWhiteKeys; i++) {
    rect(0 + i * width / numWhiteKeys,height - keyboardHeight,width / numWhiteKeys,keyboardHeight);
  }

  //  Draw the highlighted white keys
  if (highlight.played < 21) {
    highlightNote(highlight.played,highlight.x);
  }

  //  Draw the black keys
  fill(0);
  for (let i = 0; i < numWhiteKeys; i++) {
    if (i === 2 || i === 6 || i === 9 || i === 13 || i === 16 || i === 20) {
      //  These spaces do not have black keys
    } else {
      //  These spaces have black keys
      rect(0 + i * width / numWhiteKeys + width / numWhiteKeys / 1.5,
          height - keyboardHeight,
          width / numWhiteKeys - width / numWhiteKeys / 3,
          keyboardHeight / 2);
    }
  }

  //  Draw the highlighted black keys
  if (highlight.played > 20) {
    highlightNote(highlight.played,highlight.x);
  }
}

//  createScale()
//  Splits note positions between right and wrong notes depending on the musical scale
function createScale(scale) {
  rightNotes = [];
  wrongNotes = [];
  for (let i = 0; i < numWhiteKeys + numWhiteKeys / 7 * 5; i++) {

    if (scale.includes(i)) {
      //  If the note is part of the scale, add it to the right notes array
      rightNotes.push(i);
    } else {
      //  If the note is not part of the scale, add it to the wrong notes array
      wrongNotes.push(i);
    }
  }
}

//  placeNote()
//  Places notes on the screen and gives them the appropriate color
function placeNote() {
  note.y = -note.size;
  note.vy += 0.2;

  //  Change the note color to blue or red depending on if it is right or wrong
  if (random(1,100) <= rightPercent) {
    note.fill.r = 0;
    note.fill.g = 127;
    note.fill.b = 255;
    note.played = random(rightNotes);
  } else {
    note.fill.r = 255;
    note.fill.g = 20;
    note.fill.b = 0;
    note.played = random(wrongNotes);
  }

  if (note.played < 21) {
    note.size = width / numWhiteKeys;
    note.x = adjustNotePosition(note.played) * width / numWhiteKeys + note.size / 2;
  } else {
    note.size = width / numWhiteKeys - (width / numWhiteKeys / 3);
    note.x = adjustNotePosition(note.played) * width / numWhiteKeys + (width / numWhiteKeys / 6) + note.size / 2;
  }
}

//  adjustNotePosition()
//  Adjust the note position so that they are always aligned with a key (especially the black ones, which are not regular)
function adjustNotePosition(note) {
  if (note <= 20) {
    //  If the note position is on a white key, leave it as is
    return note;
  } else {
    //  If the note position is on a black key, adjust it so it is properly aligned
    if (note < 23) {
      return note - 21 + 0.5;
    } else if (note > 22 && note < 26) {
      return note - 21 + 1.5;
    } else if (note > 25 && note < 28) {
      return note - 21 + 2.5;
    } else if (note > 27 && note < 31) {
      return note - 21 + 3.5;
    } else if (note > 30 && note < 33) {
      return note - 21 + 4.5;
    } else if (note > 32) {
      return note - 21 + 5.5;
    }
  }
}

//  detectNoteHeight()
//  Detects if notes have reached the keyboard
function detectNoteHeight() {
  if (note.y >= height - keyboardHeight + note.size / 2) {

    highlight.x = note.x;
    highlight.played = note.played;
    highlight.fill.r = note.fill.r;
    highlight.fill.g = note.fill.g;
    highlight.fill.b = note.fill.b;

    setTimeout(function() {
      highlight.played = undefined;
      highlight.x = undefined;
    },500);

    adjustScore();
    playNote(note.played);

    if (seconds <= 0) {
      state = `ending`;
    } else {
      placeNote();
    }
  }
}

//  adjustScore()
//  Adjusts the score depending on the note that just hit the keyboard
function adjustScore() {
  if (activeScale.includes(note.played)) {
    score++;
  } else {
    score -= 5;

    if (score < 0) {
      score = 0;
    }
  }
}

//  playNote()
//  Plays the sound for the note that just hit the keyboard
function playNote(noteIndex) {
  if (activeInstrument === `piano`) {
    instrument.piano[noteIndex].play(0,1);
  } else if (activeInstrument === `banjo`) {
    instrument.banjo[noteIndex].play(0,1);
  } else if (activeInstrument === `clarinet`) {
    instrument.clarinet[noteIndex].play(0,1);
  } else if (activeInstrument === `flute`) {
    instrument.flute[noteIndex].play(0,1);
  }
}

//  highlightNote()
//  Highlights the keys when a note hits them
function highlightNote(noteIndex,notePosition) {
  //  Highlight the note that played
  if (noteIndex < 21) {
    push();
    fill(highlight.fill.r,highlight.fill.g,highlight.fill.b);
    rect(notePosition - (width / numWhiteKeys) / 2,height - keyboardHeight,width / numWhiteKeys,keyboardHeight);
    pop();
  } else {
    push();
    fill(highlight.fill.r,highlight.fill.g,highlight.fill.b);
    rect(notePosition - (width / numWhiteKeys - width / numWhiteKeys / 3) / 2,height - keyboardHeight,width / numWhiteKeys - width / numWhiteKeys / 3,keyboardHeight / 2);
    pop();
  }
}

//  displayTopbar()
//  Displays the top bar with the score and the remaining time
function displayTopbar() {
  push();
  fill(20);
  noStroke();
  rect(0,0,width,80);
  pop();

  fill(255);
  textFont(displayFont);
  textSize(32);
  textAlign(LEFT,CENTER);
  text(`Score: ${score}`,40,36);
  text(`Time: ${seconds}`,400,36);

  countdownTime();
}

//  countdownTime()
//  Decreases the remaining time in seconds
function countdownTime() {
  time--;
  if (time <= 0) {
    time = 60;

    if (seconds > 0) {
      seconds--;
    }
  }
}

//  detectUserCollision()
//  Detects if anything collides with the user and reacts accordingly
function detectUserCollision() {
  //  Reset velocity if the user collides with one of the borders (allows for a bouncing effect)
  if (user.x === 0 + user.width / 2 && user.vx < 0) {
    user.vx = 0;
  } else if (user.x === width - user.width / 2 && user.vx > 0) {
    user.vx = 0;
  }

  if (user.y === 80 + user.height / 2 && user.vy < 0) {
    user.vy = 0;
  } else if (user.y === height - keyboardHeight - user.height / 2 && user.vy > 0) {
    user.vy = 0;
  }

  //  Delete note and place it again if user collides with it
  if(dist(user.x,0,note.x,0) <= user.width / 2 + note.size / 2 && dist(0,user.y,0,note.y) <= user.height / 2 + note.size / 2) {
    placeNote();
  }
}

//  keyPressed()
//  p5: Starts the simulation if the user presses ENTER on the title screen
function keyPressed() {
  if (keyCode === ENTER && state === `title`) {
    createScale(activeScale);
    placeNote();
    state = `simulation`;
  } else if (keyCode === ENTER && state === `ending`) {
    time = 60;
    seconds = 30;
    score = 0;

    user.x = width / 2;
    user.y = (height - keyboardHeight + 80) / 2;
    user.vx = 0;
    user.vy = 0;

    note.vy = note.speed;

    state = `title`;
  }
}

//  mousePressed()
//  p5: Toggles the options in the menu when the user checks specific boxes
function mousePressed() {
  for (let i = 0; i < 4; i++) {
    if (dist(mouseX,mouseY,width / 4 - 28,menuButtons.instrument.y[i]) < menuButtons.instrument.size / 2) {
      menuCheckmarks.instrument.x = width / 4 - 28;
      menuCheckmarks.instrument.y = menuButtons.instrument.y[i];
      activeInstrument = i;

      if (i === 0) {
        activeInstrument = `piano`;
      } else if (i === 1) {
        activeInstrument = `banjo`;
      } else if (i === 2) {
        activeInstrument = `clarinet`;
      } else if (i === 3) {
        activeInstrument = `flute`;
      }
    }
  }

  for (let i = 0; i < 4; i++) {
    if (dist(mouseX,mouseY,width / 4 * 3 - 28,menuButtons.scale.y[i]) < menuButtons.scale.size / 2) {
      menuCheckmarks.scale.x = width / 4 * 3 - 28;
      menuCheckmarks.scale.y = menuButtons.scale.y[i];
      if (i === 0) {
        activeScale = scaleNotes.major;
        scaleImage = scaleNotes.natMajorImg;
      } else if (i === 1) {
        activeScale = scaleNotes.minor;
        scaleImage = scaleNotes.natMinorImg;
      } else if (i === 2) {
        activeScale = scaleNotes.pentatonicMajor;
        scaleImage = scaleNotes.pentaMajorImg;
      } else if (i === 3) {
        activeScale = scaleNotes.pentatonicMinor;
        scaleImage = scaleNotes.pentaMinorImg;
      }
    }
  }
}
