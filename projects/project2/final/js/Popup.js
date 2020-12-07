class Popup {
  constructor() {
    this.x = windowWidth / 2;
    this.y = windowHeight / 2;
    this.active = undefined;
    this.unitID = undefined;
  }

  //  close()
  //  Closes the currently active popup
  close() {
    this.active = undefined;
    overlayActive = false;
  }

  //  bandits()
  //  Opens the popup for a bandit ambush
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
      this.y - dyn(80)
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

  //  insufficientFunds()
  //  Opens the popup indicating that the player has insufficient funds to purchase the selected unit
  insufficientFunds() {
    overlayActive = true;
    push();
    fill(0);
    rectMode(CENTER);
    rect(this.x, this.y, dyn(680), dyn(240));
    fill(255);
    textAlign(CENTER, CENTER);
    text(
      `You do not have enough currency to purchase this unit\n\n\nClose\n[X]`,
      this.x,
      this.y
    );
    pop();
  }

  //  unitInfo()
  //  Opens the popup displaying information about the hovered unit
  unitInfo() {
    if (this.unitID.hovered) {
      if (currentTurn === 1) {
        push();
        fill(0);
        rectMode(CORNER);
        rect(width - dyn(760), height - dyn(360), dyn(720), dyn(320));
        image(
          icons.info,
          width - dyn(760) + dyn(360),
          height - dyn(360) + dyn(160),
          dyn(240),
          dyn(240)
        );
        fill(255);
        textAlign(LEFT, TOP);
        text(this.unitID.info.type, width - dyn(720), height - dyn(320));
        textFont(fontReg);
        text(this.unitID.info.description, width - dyn(720), height - dyn(260));
        pop();
      } else if (currentTurn === 2) {
        push();
        fill(0);
        rectMode(CORNER);
        rect(dyn(40), height - dyn(360), dyn(720), dyn(320));
        image(
          icons.info,
          dyn(400),
          height - dyn(360) + dyn(160),
          dyn(240),
          dyn(240)
        );
        fill(255);
        textAlign(LEFT, TOP);
        text(this.unitID.info.type, dyn(80), height - dyn(320));
        textFont(fontReg);
        text(this.unitID.info.description, dyn(80), height - dyn(260));
        pop();
      }
    }
  }
}
