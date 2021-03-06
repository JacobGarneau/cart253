class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.acceleration = 0;
    this.maxSpeed = 10;
    this.size = 50;
    this.active = true;
  }

  gravity(force) {
    this.ay += force;
  }

  move() {
    this.vx += this.ax;
    this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);
    this.vy += this.ay;
    this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed);

    this.x += this.vx;
    this.y += this.vy;

    if (this.y > height + this.size / 2) {
      this.active = false;
    }
  }

  bounce(paddle) {
    let dx = dist(this.x, 0, paddle.x, 0);
    if (
      this.y + this.size / 2 >= height - paddle.height &&
      dx <= this.size / 2 + paddle.width / 2
    ) {
      this.vy = -this.vy;
      this.ay = 0;
    }
  }

  display() {
    push();
    noStroke();
    fill(127, 255, 127);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
