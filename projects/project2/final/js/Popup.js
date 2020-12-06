class Popup {
  constructor() {
    this.x = windowWidth / 2;
    this.y = windowHeight / 2;
    this.active = undefined;
  }

  close() {
    this.active = undefined;
    overlayActive = false;
  }

  bandits() {
    overlayActive = true;
    push();
    fill(0);
    rectMode(CENTER);
    rect(this.x, this.y, dyn(640), dyn(420));
    imageMode(CENTER);
    image(icons.bandits, this.x, this.y, dyn(300), dyn(300));
    fill(255);
    textAlign(CENTER, CENTER);
    text(
      `You are attacked by bandits!\n\nPay the fee or pay with your life!`,
      this.x,
      this.y - dyn(70)
    );
    image(
      icons.attackable,
      this.x - dyn(120),
      this.y + dyn(40),
      dyn(50),
      dyn(50)
    );
    text(
      `Fight! (-` + banditDamage + ` Defense)\n[F]`,
      this.x - dyn(120),
      this.y + dyn(100)
    );
    image(icons.pay, this.x + dyn(120), this.y + dyn(40), dyn(50), dyn(50));

    if (currentTurn === 1 && players[1].currency < banditFee) {
      fill(colors.red.r, colors.red.g, colors.red.b);
    } else if (currentTurn === 2 && players[0].currency < banditFee) {
      fill(colors.red.r, colors.red.g, colors.red.b);
    }

    text(
      `Pay! (-` + banditFee + ` $)\n[P]`,
      this.x + dyn(120),
      this.y + dyn(100)
    );
    pop();
  }
}
