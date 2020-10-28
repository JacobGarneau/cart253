class PaddleMouse {
  constructor(w, h) {
    this.width = w;
    this.height = h;
    this.x = 0;
    this.y = height - this.height / 2;
  }

  move() {
    this.x = mouseX;
    this.x = constrain(this.x, 0 + this.width / 2, width + this.width / 2);
  }

  display() {
    push();
    noStroke();
    fill(255, 0, 127);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}
