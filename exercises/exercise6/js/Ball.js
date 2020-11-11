class Ball {
  constructor(x, y, note) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.fill = {
      r: 0,
      g: 255,
      b: 127,
    };
    this.speed = 3;
    this.vx = random(this.speed, -this.speed);
    this.vy = random(this.speed, -this.speed);

    this.oscillator = new p5.Oscillator(440, `sine`);
    this.nearFreq = 220;
    this.farFreq = 440;

    this.oscillator.amp(0.1);
    this.oscillator.start();

    this.note = note;
    this.synth = new p5.PolySynth();
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    let d = dist(this.x, this.y, width / 2, height / 2);
    let maxDist = dist(0, 0, width / 2, height / 2);
    let newFreq = map(d, 0, maxDist, this.nearFreq, this.farFreq);
    this.oscillator.freq(newFreq);
  }

  bounce() {
    if (this.x <= 0 || this.x >= width) {
      this.vx *= -1;
      this.playNote();
    }

    if (this.y <= 0 || this.y >= height) {
      this.vy *= -1;
      this.playNote();
    }
  }

  display() {
    push();
    fill(this.r, this.g, this.b);
    noStroke();
    ellipse(this.x, this.y, this.size);
    pop();
  }

  playNote() {
    this.synth.play(this.note, 0.2, 0, 0.1);
  }
}
