/**************************************************
Project 1 - Simulation
Jacob Garneau

Piano Simulator
**************************************************/

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
  speed: 6,
  played: 0
}

let instrument = {
  piano: []
}

let highlight = {
  x: undefined,
  played: undefined,
  fill: {
    r: 0,
    g: 0,
    b: 0
  }
};

//  Various musical scales and the notes they contain
let scaleNotes = {
  major: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
  minor: [0,1,2,3,4,24,25,7,8,27,10,11,29,30,14,15,32,17,18,34,35],
  chromatic: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35],
  pentatonic: [21,22,23,24,25,26,27,28,29,30,31,32,33,34,35]
};

let menuButtons = {
  instrument: {
    y1: 379,
    y2: 421,
    y3: 463,
    y4: 505,
    size: 20
  },
  scale: {
    y1: 379,
    y2: 421,
    y3: 463,
    y4: 505,
    size: 20
  },
  start: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }
}

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


let numWhiteKeys = 21;
let keyboardHeight = 300;

let rightNotes = [];
let wrongNotes = [];
let rightPercent = 90;

let activeScale = undefined;
let activeInstrument = undefined;
let state = `title`; //  title,simulation,ending
let score = 0;
let time = 60;
let seconds = 30;
let dislayFont;

//  preload()
//  Preloads the necessary files (mainly sound files)
function preload() {
  for (let i = 0; i < numWhiteKeys + numWhiteKeys / 7 * 5; i++) {
    instrument.piano[i] = loadSound(`assets/sounds/piano${i}.wav`);
  }

  displayFont = loadFont("assets/fonts/bahnschrift.ttf");
}

// setup()
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth,windowHeight);
  note.vy = note.speed;

  activeInstrument = `piano`;
  activeScale = scaleNotes.major;

  menuCheckmarks.instrument.x = width / 4 - 28;
  menuCheckmarks.scale.x = width / 4 * 3 - 28;
}

// draw()
// Description of draw() goes here.
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

  drawMenuText();
  drawMenuButtons();
  drawMenuCheckmarks();
}

function drawMenuText() {
  push();
  fill(255);
  textSize(96);
  textAlign(CENTER,CENTER);
  textFont(displayFont);
  text(`Keyboard Hero`,width / 2,100);

  textSize(32);
  textAlign(CENTER,CENTER);
  text(`Press ENTER to start`,width / 2,602);
  textAlign(LEFT,CENTER);
  text(`Instrument`, width / 4 - 50,300);
  text(`Scale`, width / 4 * 3 - 50,300);

  textSize(24);
  text(`Piano`, width / 4,375);
  text(`Instrument2`, width / 4,417);
  text(`Instrument3`, width / 4,459);
  text(`Instrument4`, width / 4,501);

  text(`Natural major`, width / 4 * 3,375);
  text(`Natural minor`, width / 4 * 3,417);
  text(`Pentatonic major`, width / 4 * 3,459);
  text(`Chromatic`, width / 4 * 3,501);
  pop();
}

function drawMenuButtons() {
  push();
  stroke(255);
  strokeWeight(2);
  fill(20);
  ellipse(width / 4 - 28,menuButtons.instrument.y1,menuButtons.instrument.size);
  ellipse(width / 4 - 28,menuButtons.instrument.y2,menuButtons.instrument.size);
  ellipse(width / 4 - 28,menuButtons.instrument.y3,menuButtons.instrument.size);
  ellipse(width / 4 - 28,menuButtons.instrument.y4,menuButtons.instrument.size);

  ellipse(width / 4 * 3 - 28,menuButtons.scale.y1,menuButtons.scale.size);
  ellipse(width / 4 * 3 - 28,menuButtons.scale.y2,menuButtons.scale.size);
  ellipse(width / 4 * 3 - 28,menuButtons.scale.y3,menuButtons.scale.size);
  ellipse(width / 4 * 3 - 28,menuButtons.scale.y4,menuButtons.scale.size);
  pop();
}

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

  note.y += note.vy;

  push();
  fill(note.fill.r,note.fill.g,note.fill.b);
  noStroke();
  ellipse(note.x,note.y,note.size);
  pop();

  keyboard();
  detectNoteHeight();
  displayTopbar();
}

function ending() {
  background(20);

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

  note.x = adjustNotePosition(note.played) * width / numWhiteKeys + note.size / 2;
  note.size = width / numWhiteKeys;
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
    placeNote();
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
    rect(notePosition - (width / numWhiteKeys - width / numWhiteKeys / 3) / 2,
        height - keyboardHeight,
        width / numWhiteKeys - width / numWhiteKeys / 3,
        keyboardHeight / 2);
    pop();
  }
}

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

  checkTime();
}

//  checkTime()
//  Decreases the remaining time and checks if time is up
function checkTime() {
  time--;
  if (time <= 0) {
    seconds--;
    time = 60;
  }

  if (seconds <= 0) {
    state = `ending`;
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    createScale(activeScale);
    placeNote();
    state = `simulation`;
  }
}

function mousePressed() {
  if (dist(mouseX,mouseY,width / 4 - 28,menuButtons.instrument.y1) < menuButtons.instrument.size / 2) {
    menuCheckmarks.instrument.x = width / 4 - 28;
    menuCheckmarks.instrument.y = menuButtons.instrument.y1;
    activeInstrument = `piano`;
  } else if (dist(mouseX,mouseY,width / 4 - 28,menuButtons.instrument.y2) < menuButtons.instrument.size / 2) {
    menuCheckmarks.instrument.x = width / 4 - 28;
    menuCheckmarks.instrument.y = menuButtons.instrument.y2;
    activeInstrument = `piano`;
  } else if (dist(mouseX,mouseY,width / 4 - 28,menuButtons.instrument.y3) < menuButtons.instrument.size / 2) {
    menuCheckmarks.instrument.x = width / 4 - 28;
    menuCheckmarks.instrument.y = menuButtons.instrument.y3;
    activeInstrument = `piano`;
  } else if (dist(mouseX,mouseY,width / 4 - 28,menuButtons.instrument.y4) < menuButtons.instrument.size / 2) {
    menuCheckmarks.instrument.x = width / 4 - 28;
    menuCheckmarks.instrument.y = menuButtons.instrument.y4;
    activeInstrument = `piano`;
  } else if (dist(mouseX,mouseY,width / 4 * 3 - 28,menuButtons.scale.y1) < menuButtons.scale.size / 2) {
    menuCheckmarks.scale.x = width / 4 * 3 - 28;
    menuCheckmarks.scale.y = menuButtons.scale.y1;
    activeScale = scaleNotes.major;
    console.log(activeScale);
  } else if (dist(mouseX,mouseY,width / 4 * 3 - 28,menuButtons.scale.y2) < menuButtons.scale.size / 2) {
    menuCheckmarks.scale.x = width / 4 * 3 - 28;
    menuCheckmarks.scale.y = menuButtons.scale.y2;
    activeScale = scaleNotes.minor;
    console.log(activeScale);
  } else if (dist(mouseX,mouseY,width / 4 * 3 - 28,menuButtons.scale.y3) < menuButtons.scale.size / 2) {
    menuCheckmarks.scale.x = width / 4 * 3 - 28;
    menuCheckmarks.scale.y = menuButtons.scale.y3;
    activeScale = scaleNotes.pentatonic;
    console.log(activeScale);
  } else if (dist(mouseX,mouseY,width / 4 * 3 - 28,menuButtons.scale.y4) < menuButtons.scale.size / 2) {
    menuCheckmarks.scale.x = width / 4 * 3 - 28;
    menuCheckmarks.scale.y = menuButtons.scale.y4;
    activeScale = scaleNotes.chromatic;
    console.log(activeScale);
  }
}
