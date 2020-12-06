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

    this.endTurn = {
      x: width / 2,
      y: menuHeight,
      width: dyn(192),
      height: dyn(50),
    };

    this.shopOpen = 0; //  0 (shop closed), 1 (player1 shop open), 2 (player2 shop open)
  }

  display() {
    textAlign(CENTER, CENTER);

    //  Display main components
    fill(50);
    rect(0, menuHeight, this.side.width, this.side.height);
    rect(width, menuHeight, -this.side.width, this.side.height);

    fill(0);
    rect(0, 0, this.bar.width, this.bar.height);

    fill(255);
    textFont(fontBold);
    textSize(dyn(36));
    text(`VS`, width / 2, menuHeight / 2 - dyn(16));

    push();
    if (currentTurn === 1) {
      fill(colors.blue.r, colors.blue.g, colors.blue.b);
    } else if (currentTurn === 2) {
      fill(colors.red.r, colors.red.g, colors.red.b);
    }
    rectMode(CENTER);
    rect(
      this.endTurn.x,
      this.endTurn.y,
      this.endTurn.width,
      this.endTurn.height
    );

    fill(255);
    textAlign(CENTER, CENTER);
    text(`END TURN`, this.endTurn.x, this.endTurn.y - dyn(4));
    pop();

    //  Display player 1 info
    push();
    fill(colors.blue.r, colors.blue.g, colors.blue.b);
    textFont(fontBold);
    textSize(dyn(32));
    textAlign(LEFT, CENTER);
    text(
      `${players[1].title} ${players[1].firstName}\n${players[1].lastName}`,
      dyn(40),
      menuHeight / 2
    );
    pop();

    fill(255);
    textFont(fontBold);
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
        menuHeight / 2 + dyn(12),
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
        menuHeight / 2 + dyn(12),
        dyn(16)
      );
      pop();
    }

    if (players[1].lords === 0) {
      victor = players[0];
      state = `ending`;
    }

    text(`Currency: ${players[1].currency} $\n\n`, dyn(580), menuHeight / 2);

    //  Display Player 1's BUY button
    push();
    rectMode(CENTER);
    if (currentTurn === 1) {
      fill(colors.blue.r, colors.blue.g, colors.blue.b);
    } else {
      fill(100, 100, 100);
    }
    rect(dyn(580), menuHeight / 2 + dyn(15), dyn(60), dyn(32));
    pop();

    push();
    textFont(fontBold);
    textSize(dyn(24));
    text(`BUY`, dyn(580), menuHeight / 2 + dyn(13));
    pop();

    //  Display player 2 info
    push();
    fill(colors.red.r, colors.red.g, colors.red.b);
    textFont(fontBold);
    textSize(dyn(32));
    textAlign(RIGHT, CENTER);
    text(
      `${players[0].title} ${players[0].firstName}\n${players[0].lastName}`,
      width - dyn(40),
      menuHeight / 2
    );
    pop();

    fill(255);
    textFont(fontBold);
    textSize(dyn(24));
    text(`Lords\n\n`, width - dyn(384), menuHeight / 2);

    //  Display Player 2's Lord icons
    for (let i = 0; i < 3; i++) {
      push();
      ellipseMode(CENTER);
      fill(0);
      stroke(255);
      strokeWeight(dyn(4));
      ellipse(
        width - (dyn(320) + dyn(i * 50) + dyn(14)),
        menuHeight / 2 + dyn(12),
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
        menuHeight / 2 + dyn(12),
        dyn(16)
      );
      pop();
    }

    if (players[0].lords === 0) {
      victor = players[1];
      state = `ending`;
    }

    text(
      `Currency: ${players[0].currency} $\n\n`,
      width - dyn(580),
      menuHeight / 2
    );

    //  Display Player 2's BUY button
    push();
    rectMode(CENTER);
    if (currentTurn === 2) {
      fill(colors.red.r, colors.red.g, colors.red.b);
    } else {
      fill(100, 100, 100);
    }

    rect(width - dyn(580), menuHeight / 2 + dyn(15), dyn(60), dyn(32));
    pop();

    push();
    textFont(fontBold);
    textSize(dyn(24));
    text(`BUY`, width - dyn(580), menuHeight / 2 + dyn(13));
    pop();
  }

  displayShop() {
    if (this.shopOpen === 1) {
      shopX = dyn(580) - dyn(192);
    } else if (this.shopOpen === 2) {
      shopX = width - dyn(580) - dyn(192);
    }

    //  Display the shop menu
    push();
    fill(255);
    triangle(
      shopX + dyn(192),
      menuHeight / 2 + dyn(48),
      shopX + dyn(220),
      menuHeight / 2 + dyn(91),
      shopX + dyn(164),
      menuHeight / 2 + dyn(91)
    );

    rectMode(CORNER);
    rect(
      shopX,
      menuHeight / 2 + dyn(90),
      dyn(384),
      players[this.shopOpen - 1].buyable.length * dyn(96) + dyn(14)
    );

    //  Display the buyable units
    for (let i = 0; i < players[this.shopOpen - 1].buyable.length; i++) {
      if (players[this.shopOpen - 1].buyable[i].hovered) {
        push();
        if (currentTurn === 1) {
          fill(colors.blue.r, colors.blue.g, colors.blue.b);
        } else if (currentTurn === 2) {
          fill(colors.red.r, colors.red.g, colors.red.b);
        }
        noStroke();
        rectMode(CORNER);
        rect(shopX, menuHeight / 2 + dyn(96) * (i + 1), dyn(384), dyn(96));
        pop();
      }

      imageMode(CENTER);
      image(
        players[this.shopOpen - 1].buyable[i].info.iconAlt,
        shopX + dyn(42),
        menuHeight / 2 + dyn(50) + dyn(96) * (i + 1),
        dyn(50),
        dyn(50)
      );

      //  Unit type
      fill(0);
      textAlign(LEFT, CENTER);
      textFont(fontBold);
      if (players[this.shopOpen - 1].buyable[i].info.type === `Dragon Riders`) {
        text(
          `Dragon\nRiders`,
          shopX + dyn(90),
          menuHeight / 2 + dyn(50) + dyn(96) * (i + 1)
        );
      } else {
        text(
          players[this.shopOpen - 1].buyable[i].info.type,
          shopX + dyn(90),
          menuHeight / 2 + dyn(50) + dyn(96) * (i + 1)
        );
      }

      //  Unit cost
      textAlign(CENTER, CENTER);
      text(
        players[this.shopOpen - 1].buyable[i].info.cost + ` $`,
        shopX + dyn(284),
        menuHeight / 2 + dyn(36) + dyn(96) * (i + 1)
      );

      //  Unit attack
      fill(255);
      image(
        icons.offense,
        shopX + dyn(224),
        menuHeight / 2 + dyn(71) + dyn(96) * (i + 1),
        dyn(32),
        dyn(32)
      );
      text(
        players[this.shopOpen - 1].buyable[i].stats.maxAttack,
        shopX + dyn(224),
        menuHeight / 2 + dyn(68) + dyn(96) * (i + 1)
      );

      //  Unit defense
      image(
        icons.defense,
        shopX + dyn(284),
        menuHeight / 2 + dyn(71) + dyn(96) * (i + 1),
        dyn(32),
        dyn(32)
      );
      text(
        players[this.shopOpen - 1].buyable[i].stats.maxDefense,
        shopX + dyn(284),
        menuHeight / 2 + dyn(68) + dyn(96) * (i + 1)
      );

      //  Unit movement
      image(
        icons.movement,
        shopX + dyn(344),
        menuHeight / 2 + dyn(71) + dyn(96) * (i + 1),
        dyn(32),
        dyn(32)
      );
      text(
        players[this.shopOpen - 1].buyable[i].stats.movement,
        shopX + dyn(344),
        menuHeight / 2 + dyn(68) + dyn(96) * (i + 1)
      );
    }
    pop();
  }

  buyUnit(purchasedUnit) {
    console.log("Buy 1 " + purchasedUnit.info.type + " unit");
    this.shopOpen = 0;
    overlayActive = false;
    spawningUnit = purchasedUnit;
    console.log(spawningUnit);

    if (currentTurn === 1 && players[1].currency >= spawningUnit.info.cost) {
      for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].structureTeam === currentTurn) {
          tiles[i].checkSurroundings();
        }
      }
      choosingSpawn = true;
    } else if (
      currentTurn === 2 &&
      players[0].currency >= spawningUnit.info.cost
    ) {
      for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].structureTeam === currentTurn) {
          tiles[i].checkSurroundings();
        }
      }
      choosingSpawn = true;
    } else {
      alert(`Insufficient funds to purchase this unit`);
      spawningUnit = undefined;
    }
  }
}
