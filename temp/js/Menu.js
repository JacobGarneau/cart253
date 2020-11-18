class Menu {
  constructor() {
    this.bar = {
      height: menuHeight,
      width: windowWidth,
    };
    this.side = {
      width: marginX,
      height: windowHeight - menuHeight,
    };
  }

  display() {
    textAlign(CENTER, CENTER);

    fill(50);
    rect(0, menuHeight, this.side.width, this.side.height);
    rect(width, menuHeight, -this.side.width, this.side.height);

    fill(0);
    rect(0, 0, this.bar.width, this.bar.height);

    fill(255);
    textStyle(BOLD);
    textSize(dyn(36));
    text(`This is the game's title`, width / 2, menuHeight / 2);

    //  Display player 1 info
    push();
    fill(colors.blue.r, colors.blue.g, colors.blue.b);
    textStyle(BOLD);
    textSize(dyn(32));
    textAlign(LEFT, CENTER);
    text(
      `${players[1].title} ${players[1].firstName}\n${players[1].middleName} ${players[1].lastName}`,
      dyn(40),
      menuHeight / 2
    );
    pop();

    fill(255);
    textStyle(NORMAL);
    textSize(dyn(24));
    text(`Lords\n\n`, dyn(384), menuHeight / 2);

    //  Display Player 1's Lord icons

    for (let i = 0; i < 3; i++) {
      push();
      ellipseMode(CENTER);
      fill(0);
      stroke(255);
      strokeWeight(dyn(4));
      ellipse(
        dyn(320) + dyn(i * 50) + dyn(14),
        menuHeight / 2 + dyn(8),
        dyn(28)
      );
      pop();
    }

    for (let i = 0; i < players[1].lords; i++) {
      push();
      ellipseMode(CENTER);
      fill(colors.blue.r, colors.blue.g, colors.blue.b);
      noStroke();
      ellipse(
        dyn(320) + dyn(i * 50) + dyn(14),
        menuHeight / 2 + dyn(8),
        dyn(16)
      );
      pop();
    }

    text(`Currency: ${players[1].currency} $\n\n`, dyn(580), menuHeight / 2);

    //  Display Player 1's BUY button
    push();
    rectMode(CENTER);
    fill(colors.blue.r, colors.blue.g, colors.blue.b);
    rect(dyn(580), menuHeight / 2 + dyn(12), dyn(60), dyn(32));
    pop();

    push();
    textStyle(BOLD);
    textSize(dyn(24));
    text(`BUY`, dyn(580), menuHeight / 2 + dyn(13));
    pop();

    //  Display player 2 info
    push();
    fill(colors.red.r, colors.red.g, colors.red.b);
    textStyle(BOLD);
    textSize(dyn(32));
    textAlign(RIGHT, CENTER);
    text(
      `${players[0].title} ${players[0].firstName}\n${players[0].middleName} ${players[0].lastName}`,
      width - dyn(40),
      menuHeight / 2
    );
    pop();

    fill(255);
    textStyle(NORMAL);
    textSize(dyn(24));
    text(`Lords\n\n`, width - dyn(384), menuHeight / 2);

    //  Display Player 1's Lord icons
    for (let i = 0; i < 3; i++) {
      push();
      ellipseMode(CENTER);
      fill(0);
      stroke(255);
      strokeWeight(dyn(4));
      ellipse(
        width - (dyn(320) + dyn(i * 50) + dyn(14)),
        menuHeight / 2 + dyn(8),
        dyn(28)
      );
      pop();
    }

    for (let i = 0; i < players[0].lords; i++) {
      push();
      ellipseMode(CENTER);
      fill(colors.red.r, colors.red.g, colors.red.b);
      noStroke();
      ellipse(
        width - (dyn(320) + dyn(i * 50) + dyn(14)),
        menuHeight / 2 + dyn(8),
        dyn(16)
      );
      pop();
    }

    text(
      `Currency: ${players[0].currency} $\n\n`,
      width - dyn(580),
      menuHeight / 2
    );

    //  Display Player 2's BUY button
    push();
    rectMode(CENTER);
    fill(colors.red.r, colors.red.g, colors.red.b);
    rect(width - dyn(580), menuHeight / 2 + dyn(12), dyn(60), dyn(32));
    pop();

    push();
    textStyle(BOLD);
    textSize(dyn(24));
    text(`BUY`, width - dyn(580), menuHeight / 2 + dyn(13));
    pop();
  }
}
