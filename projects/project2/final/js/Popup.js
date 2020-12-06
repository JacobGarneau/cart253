class Popup {
  constructor() {
    this.x = windowWidth / 2;
    this.y = windowHeight / 2;
    this.active = undefined;
  }

  bandits() {
    push();
    fill(255);
    rect(this.x, this.y, dyn(720), dyn(540));
    fill(0);
    textAlign(CENTER, CENTER);
    text(
      `You are attacked by bandits!\nPay the fee or pay with your life!`,
      this.x,
      this.y
    );
    pop();
  }
}
