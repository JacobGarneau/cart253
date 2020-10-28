class PaddleKeyboard {
  constructor(w, h) {
    this.width = w;
    this.height = h;
    this.x = 0;
    this.y = height - this.height / 2;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0.25;
    this.ay = 0;
    this.maxSpeed = 12;
  }

  keyboardControl(key, acceleration) {
    if (key === LEFT_ARROW || key === 65) {
      this.vx += this.ax;
    } else if (key === RIGHT_ARROW || key === 68) {
      this.vx -= this.ax;
    }

    this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);
  }

  move() {
    this.vy += this.ay;
    this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed);

    this.x += this.vx;
    this.y += this.vy;
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
