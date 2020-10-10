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
  speed: 2,
  played: 0
}

let instrument = {
  piano: [],
  active: undefined
}

let numWhiteKeys = 21;
let keyboardHeight = 300;

let rightNotes = [];
let wrongNotes = [];
let rightPercent = 90;

let scaleNotes = {
  major: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
  minor: [0,1,2,3,4,24,25,7,8,27,10,11,29,30,14,15,32,17,18,34,35],
  chromatic: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35],
  pentatonic: [21,22,23,24,25,26,27,28,29,30,31,32,33,34,35]
};

let state = `simulation`;

function preload() {
  for (let i = 0; i < 35; i++) {
    instrument.piano[i] = loadSound(`assets/sounds/piano${i}.wav`);
  }
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth,windowHeight);

  createScale(scaleNotes.pentatonic);

  placeNote();

  note.vy = note.speed;

  console.log(rightNotes);
  console.log(wrongNotes);

  instrument.active = `piano`;
}

// draw()
//
// Description of draw() goes here.
function draw() {
  simulation();
}

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
}

//  keyboard()
//  Draws the black and white keys of the keyboard
function keyboard() {
  //  Draw the white keys
  fill(255);
  for (let i = 0; i < numWhiteKeys; i++) {
    rect(0 + i * width / numWhiteKeys,height - keyboardHeight,width / numWhiteKeys,keyboardHeight);
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
}

//  createScale()
//  Splits note positions between right and wrong notes depending on the musical scale
function createScale(scale) {
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

  // note.x = note.played * width / numWhiteKeys;

  //  Make notes on black keys smaller than those on white keys
  // if (note.x > 20 / width * numWhiteKeys) {
  //   note.size = width / numWhiteKeys - width / numWhiteKeys / 3;
  // } else {
  //   note.size = width / numWhiteKeys;
  // }

  note.size = width / numWhiteKeys;
}

function playNote(noteIndex) {
  if (instrument.active === `piano`) {
    instrument.piano[noteIndex].play();
    console.log(instrument.piano[noteIndex]);
  }
}

//  detectNoteHeight()
//  Detects if notes have reached the keyboard
function detectNoteHeight() {
  if (note.y >= height - keyboardHeight + note.size / 2) {

    console.log(`Note played: note${note.played}\nNote X: ${note.x}`);
    playNote(note.played);
    placeNote();
  }
}
