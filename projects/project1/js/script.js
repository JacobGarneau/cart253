/**************************************************
Project 1 - Simulation
Jacob Garneau

Piano Simulator
**************************************************/

let note = {
  x: 0,
  y: 500,
  size: 0,
  fill: {
    r: 0,
    g: 127,
    b: 255
  },
  vx: 0,
  vy: 0,
  speed: 2
}

let numWhiteKeys = 21;
let keyboardHeight = 300;

let notePosition = [];

let scaleNotes = {
  major: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
  minor: [0,1,2,3,4,24,25,7,8,27,10,11,29,30,14,15,32,17,18,34,35],
  chromatic: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35],
  pentatonic: [21,22,23,24,25,26,27,28,29,30,31,32,33,34,35]
};

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth,windowHeight);

  createScale(scaleNotes.pentatonic);

  note.size = width / numWhiteKeys;
  note.x = random(notePosition) * width / numWhiteKeys + note.size / 2;
  note.vy = note.speed;
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(127, 255, 200);

  keyboard();

  note.y += note.vy;

  push();
  fill(0,127,255);
  noStroke();
  ellipse(note.x,note.y,note.size);
  pop();
}

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

    } else {
      rect(0 + i * width / numWhiteKeys + width / numWhiteKeys / 1.5,
          height - keyboardHeight,
          width / numWhiteKeys - width / numWhiteKeys / 3,
          keyboardHeight / 2);
    }
  }
}

function createScale(scale) {
  for (let i = 0; i < numWhiteKeys + numWhiteKeys / 7 * 5; i++) {

    if (scale.includes(i)) {
      //  If the note is not part of the scale, make it blue
      note.fill.r = 255;
      note.fill.g = 127;
      note.fill.b = 0;

      createNotePosition(i);

    } else {
      //  If the note is not in the scale, make it red
      note.fill.r = 255;
      note.fill.g = 127;
      note.fill.b = 0;

    }
  }
}

function createNotePosition(position) {
  if (position <= 20) {

    notePosition.push(position);
  } else {
    
    if (position < 23) {
      notePosition.push(position - 21 + 0.5);
    } else if (position > 22 && position < 26) {
      notePosition.push(position - 21 + 1.5);
    } else if (position > 25 && position < 28) {
      notePosition.push(position - 21 + 2.5);
    } else if (position > 27 && position < 31) {
      notePosition.push(position - 21 + 3.5);
    } else if (position > 30 && position < 33) {
      notePosition.push(position - 21 + 4.5);
    } else if (position > 32) {
      notePosition.push(position - 21 + 5.5);
    }
  }
}
