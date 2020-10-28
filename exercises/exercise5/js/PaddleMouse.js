class PaddleMouse {
  constructor(w, h) {
    this.width = w;
    this.height = h;
    this.x = 0;
    this.y = height - this.height / 2;
  }

  move() {
    this.x = mouseX;
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
