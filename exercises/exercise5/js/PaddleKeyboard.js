class PaddleKeyboard {
  constructor(w, h) {
    this.width = w;
    this.height = h;
    this.x = 0;
    this.y = height - this.height / 2;
    this.vx = 12;
    this.vy = 0;
  }

  move(leftArrow, leftA, rightArrow, rightD) {
    if (leftArrow || leftA) {
      this.x -= this.vx;
    } else if (rightArrow || rightD) {
      this.x += this.vx;
    }
    this.x = constrain(this.x, 0 + this.width / 2, width - this.width / 2);
  }

  display() {
    push();
    noStroke();
    fill(127, 0, 255);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}
