class Unit {
  constructor(xPos, yPos, team) {
    this.x = xPos + marginX;
    this.y = yPos + menuHeight;
    this.destinationX = this.x;
    this.destinationY = this.y;
    this.selected = false;
    this.controllable = true;
    this.team = team;
    this.banditEncounters = true;
    this.tapped = false;

    this.movable = {
      up: true,
      down: true,
      left: true,
      right: true,
    };

    this.attackable = {
      up: false,
      down: false,
      left: false,
      right: false,
    };

    this.tiles = {
      current: {
        occupied: undefined,
        type: undefined,
      },
      up: {
        occupied: undefined,
        type: undefined,
      },
      down: {
        occupied: undefined,
        type: undefined,
      },
      left: {
        occupied: undefined,
        type: undefined,
      },
      right: {
        occupied: undefined,
        type: undefined,
      },
    };

    this.tileMovement = {
      current: undefined,
      up: 0,
      down: 3,
      left: 0,
      right: 3,
    };
  }

  display() {
    //  Draw the unit
    noStroke();
    push();
    if (this.team === 1 && this.tapped === false) {
      fill(colors.blue.r, colors.blue.g, colors.blue.b);
      stroke(255);
    } else if (this.team === 1 && this.tapped === true) {
      fill(colors.blue.r - 50, colors.blue.g - 50, colors.blue.b - 100);
      stroke(100);
    } else if (this.team === 2 && this.tapped === false) {
      fill(colors.red.r, colors.red.g, colors.red.b);
      stroke(255);
    } else if (this.team === 2 && this.tapped === true) {
      fill(colors.red.r - 100, colors.red.g - 50, colors.red.b - 50);
      stroke(100);
    }

    strokeWeight(4);
    ellipseMode(CORNER);
    ellipse(this.x, this.y, grid.squareSize);

    imageMode(CENTER);
    image(
      this.info.icon,
      this.x + grid.squareSize / 2,
      this.y + grid.squareSize / 2,
      grid.squareSize / 1.75,
      grid.squareSize / 1.75
    );
    pop();

    //  Attack icon
    imageMode(CENTER);
    image(
      icons.offense,
      this.x + grid.squareSize / 2 + grid.squareSize / 3,
      this.y + grid.squareSize / 2 + grid.squareSize / 3,
      grid.squareSize / 3,
      grid.squareSize / 3
    );

    //  Defense icon
    image(
      icons.defense,
      this.x + grid.squareSize / 2 - grid.squareSize / 3,
      this.y + grid.squareSize / 2 + grid.squareSize / 3,
      grid.squareSize / 3,
      grid.squareSize / 3
    );

    //  Movement icon
    image(
      icons.movement,
      this.x + grid.squareSize / 2 - grid.squareSize / 3,
      this.y + grid.squareSize / 2 - grid.squareSize / 3,
      grid.squareSize / 3,
      grid.squareSize / 3
    );

    //  Attack text
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(grid.squareSize / 4.8);
    text(
      this.stats.attack,
      this.x + grid.squareSize / 2 + grid.squareSize / 3,
      this.y + grid.squareSize / 2 + grid.squareSize / 3
    );

    //  Defense text
    push();
    if (this.stats.defense === this.stats.maxDefense) {
      fill(255);
    } else {
      fill(colors.red.r, colors.red.g, colors.red.b);
    }
    text(
      this.stats.defense,
      this.x + grid.squareSize / 2 - grid.squareSize / 3,
      this.y + grid.squareSize / 2 + grid.squareSize / 3
    );
    pop();

    //  Movement text
    text(
      this.stats.currentMovement,
      this.x + grid.squareSize / 2 - grid.squareSize / 3,
      this.y + grid.squareSize / 2 - grid.squareSize / 3
    );
  }

  checkAttack() {
    if (
      this.selected &&
      this.tiles.up.occupied !== this.team &&
      this.tiles.up.occupied !== 0
    ) {
      this.attackable.up = true;
    } else {
      this.attackable.up = false;
    }

    if (
      this.selected &&
      this.tiles.down.occupied !== this.team &&
      this.tiles.down.occupied !== 0
    ) {
      this.attackable.down = true;
    } else {
      this.attackable.down = false;
    }

    if (
      this.selected &&
      this.tiles.left.occupied !== this.team &&
      this.tiles.left.occupied !== 0
    ) {
      this.attackable.left = true;
    } else {
      this.attackable.left = false;
    }

    if (
      this.selected &&
      this.tiles.right.occupied !== this.team &&
      this.tiles.right.occupied !== 0
    ) {
      this.attackable.right = true;
    } else {
      this.attackable.right = false;
    }
  }

  checkMovement() {
    if (
      this.tiles.up.type === `castle` ||
      this.tiles.up.type === `church` ||
      this.tiles.up.type === `tower` ||
      this.tiles.up.type === `lair` ||
      this.tiles.up.type === `water` ||
      this.tiles.up.occupied !== 0
    ) {
      this.movable.up = false;
    } else {
      this.movable.up = true;
    }

    if (
      this.tiles.down.type === `castle` ||
      this.tiles.down.type === `church` ||
      this.tiles.down.type === `tower` ||
      this.tiles.down.type === `lair` ||
      this.tiles.down.type === `water` ||
      this.tiles.down.occupied !== 0
    ) {
      this.movable.down = false;
    } else {
      this.movable.down = true;
    }

    if (
      this.tiles.left.type === `castle` ||
      this.tiles.left.type === `church` ||
      this.tiles.left.type === `tower` ||
      this.tiles.left.type === `lair` ||
      this.tiles.left.type === `water` ||
      this.tiles.left.occupied !== 0
    ) {
      this.movable.left = false;
    } else {
      this.movable.left = true;
    }

    if (
      this.tiles.right.type === `castle` ||
      this.tiles.right.type === `church` ||
      this.tiles.right.type === `tower` ||
      this.tiles.right.type === `lair` ||
      this.tiles.right.type === `water` ||
      this.tiles.right.occupied !== 0
    ) {
      this.movable.right = false;
    } else {
      this.movable.right = true;
    }
  }

  handleInput(keyCode) {
    if (
      keyCode === LEFT_ARROW ||
      keyCode === RIGHT_ARROW ||
      keyCode === UP_ARROW ||
      keyCode === DOWN_ARROW ||
      keyCode === 65 ||
      keyCode === 68 ||
      keyCode === 87 ||
      keyCode === 83
    ) {
      if (
        (keyCode === LEFT_ARROW || keyCode === 65) &&
        this.movable.left &&
        this.x >= marginX + unitSpeed
      ) {
        this.destinationX = this.x - grid.squareSize;
        this.animateMovement();
      } else if (
        (keyCode === RIGHT_ARROW || keyCode === 68) &&
        this.movable.right &&
        this.x <= (grid.width - 1) * grid.squareSize - unitSpeed
      ) {
        this.destinationX = this.x + grid.squareSize;
        this.animateMovement();
      } else if (
        (keyCode === UP_ARROW || keyCode === 87) &&
        this.movable.up &&
        this.y >= menuHeight + unitSpeed
      ) {
        this.destinationY = this.y - grid.squareSize;
        this.animateMovement();
      } else if (
        (keyCode === DOWN_ARROW || keyCode === 83) &&
        this.movable.down &&
        this.y <= (grid.height + 1) * grid.squareSize - unitSpeed
      ) {
        this.destinationY = this.y + grid.squareSize;
        this.animateMovement();
      }
    }
  }

  animateMovement() {
    this.stats.currentMovement--;
    this.controllable = false;

    let timeoutDelay = (grid.squareSize / unitSpeed / 60) * 1000;
    setTimeout(() => {
      this.x = this.destinationX;
      this.y = this.destinationY;
      this.controllable = true;
      let banditRoll = random(0, 100);
      if (
        banditRoll <= banditChance &&
        this.tiles.current.type === `forest` &&
        this.banditEncounters
      ) {
        popup.active = `bandits`;
        banditTarget = this;
      }

      if (this.stats.currentMovement === 0) {
        if (
          !this.attackable.up &&
          !this.attackable.down &&
          !this.attackable.left &&
          !this.attackable.right
        ) {
          this.endTurn();
        }
      }
    }, timeoutDelay);
  }

  displayAttack() {
    if (this.attackable.up && this.controllable) {
      push();
      rectMode(CENTER);
      fill(colors.attack.r, colors.attack.g, colors.attack.b, colors.attack.a);
      rect(
        this.x + grid.squareSize / 2,
        this.y + grid.squareSize / 2 - grid.squareSize,
        grid.squareSize,
        grid.squareSize
      );
      imageMode(CENTER);
      image(
        icons.attackable,
        this.x + grid.squareSize / 2,
        this.y + grid.squareSize / 2 - grid.squareSize,
        grid.squareSize / 1.5,
        grid.squareSize / 1.5
      );
      pop();
    }

    if (this.attackable.down && this.controllable) {
      push();
      rectMode(CENTER);
      fill(colors.attack.r, colors.attack.g, colors.attack.b, colors.attack.a);
      rect(
        this.x + grid.squareSize / 2,
        this.y + grid.squareSize / 2 + grid.squareSize,
        grid.squareSize,
        grid.squareSize
      );
      imageMode(CENTER);
      image(
        icons.attackable,
        this.x + grid.squareSize / 2,
        this.y + grid.squareSize / 2 + grid.squareSize,
        grid.squareSize / 1.5,
        grid.squareSize / 1.5
      );
      pop();
    }

    if (this.attackable.left && this.controllable) {
      push();
      rectMode(CENTER);
      fill(colors.attack.r, colors.attack.g, colors.attack.b, colors.attack.a);
      rect(
        this.x + grid.squareSize / 2 - grid.squareSize,
        this.y + grid.squareSize / 2,
        grid.squareSize,
        grid.squareSize
      );
      imageMode(CENTER);
      image(
        icons.attackable,
        this.x + grid.squareSize / 2 - grid.squareSize,
        this.y + grid.squareSize / 2,
        grid.squareSize / 1.5,
        grid.squareSize / 1.5
      );
      pop();
    }

    if (this.attackable.right && this.controllable) {
      push();
      rectMode(CENTER);
      fill(colors.attack.r, colors.attack.g, colors.attack.b, colors.attack.a);
      rect(
        this.x + grid.squareSize / 2 + grid.squareSize,
        this.y + grid.squareSize / 2,
        grid.squareSize,
        grid.squareSize
      );
      imageMode(CENTER);
      image(
        icons.attackable,
        this.x + grid.squareSize / 2 + grid.squareSize,
        this.y + grid.squareSize / 2,
        grid.squareSize / 1.5,
        grid.squareSize / 1.5
      );
      pop();
    }
  }

  attack() {
    let dX = dist(mouseX, 0, this.x + grid.squareSize / 2, 0);
    let dY = dist(0, mouseY, 0, this.y + grid.squareSize / 2);

    if (
      dY < grid.squareSize * 1.5 &&
      dY > grid.squareSize * 0.5 &&
      dX < grid.squareSize * 0.5 &&
      mouseY < this.y &&
      mouseX > this.x &&
      this.attackable.up
    ) {
      for (let i = 0; i < units.length; i++) {
        let d = dist(units[i].x, units[i].y, this.x, this.y);
        if (
          d <= grid.squareSize * 1.5 + 1 &&
          units[i].y < this.y &&
          units[i].x <= this.x + 1 &&
          units[i].x >= this.x - 1 &&
          units[i].team !== this.team
        ) {
          this.damage(units[i]);
        }
      }
    }

    if (
      dY < grid.squareSize * 1.5 &&
      dY > grid.squareSize * 0.5 &&
      dX < grid.squareSize * 0.5 &&
      mouseY > this.y &&
      mouseX > this.x &&
      this.attackable.down
    ) {
      for (let i = 0; i < units.length; i++) {
        let d = dist(units[i].x, units[i].y, this.x, this.y);
        if (
          d <= grid.squareSize * 1.5 + 1 &&
          units[i].y > this.y &&
          units[i].x <= this.x + 1 &&
          units[i].x >= this.x - 1 &&
          units[i].team !== this.team
        ) {
          this.damage(units[i]);
        }
      }
    }

    if (
      dX < grid.squareSize * 1.5 &&
      dX > grid.squareSize * 0.5 &&
      dY < grid.squareSize * 0.5 &&
      mouseX < this.x &&
      mouseY > this.y &&
      this.attackable.left
    ) {
      for (let i = 0; i < units.length; i++) {
        let d = dist(units[i].x, units[i].y, this.x, this.y);
        if (
          d <= grid.squareSize * 1.5 + 1 &&
          units[i].x < this.x &&
          units[i].y <= this.y + 1 &&
          units[i].y >= this.y - 1 &&
          units[i].team !== this.team
        ) {
          this.damage(units[i]);
        }
      }
    }

    if (
      dX < grid.squareSize * 1.5 &&
      dX > grid.squareSize * 0.5 &&
      dY < grid.squareSize * 0.5 &&
      mouseX > this.x &&
      mouseY > this.y &&
      this.attackable.right
    ) {
      for (let i = 0; i < units.length; i++) {
        let d = dist(units[i].x, units[i].y, this.x, this.y);
        if (
          d <= grid.squareSize * 1.5 + 1 &&
          units[i].x > this.x &&
          units[i].y <= this.y + 1 &&
          units[i].y >= this.y - 1 &&
          units[i].team !== this.team
        ) {
          this.damage(units[i]);
        }
      }
    }
  }

  damage(target) {
    target.takeDamage(this.stats.attack, this.stats.magical);
    this.endTurn();
  }

  takeDamage(amount, magic) {
    this.stats.defense -= amount;
  }

  move() {
    //  Draw the movement options
    if (
      this.selected &&
      this.stats.currentMovement > 0 &&
      this.x === this.destinationX &&
      this.y === this.destinationY
    ) {
      fill(colors.move.r, colors.move.g, colors.move.b, colors.move.a);
      noStroke();

      if (this.movable.up) {
        this.tileMovement.up = 0;
      } else {
        this.tileMovement.up = 1;
      }

      if (this.movable.down) {
        this.tileMovement.down = 3;
      } else {
        this.tileMovement.down = 2;
      }

      if (this.movable.left) {
        this.tileMovement.left = 0;
      } else {
        this.tileMovement.left = 1;
      }

      if (this.movable.right) {
        this.tileMovement.right = 3;
      } else {
        this.tileMovement.right = 2;
      }

      for (let i = this.tileMovement.left; i < this.tileMovement.right; i++) {
        rect(
          this.x + selectSquare(i),
          this.y,
          grid.squareSize,
          grid.squareSize
        );
      }

      for (let i = this.tileMovement.up; i < this.tileMovement.down; i++) {
        rect(
          this.x,
          this.y + selectSquare(i),
          grid.squareSize,
          grid.squareSize
        );
      }
    }

    //  Move the unit
    if (this.x < this.destinationX && !this.controllable) {
      this.x += unitSpeed;
    } else if (this.x > this.destinationX && !this.controllable) {
      this.x -= unitSpeed;
    } else if (this.y < this.destinationY && !this.controllable) {
      this.y += unitSpeed;
    } else if (this.y > this.destinationY && !this.controllable) {
      this.y -= unitSpeed;
    }

    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);

    if (!this.controllable) {
      this.tiles.current.occupied = 0;
    }
  }

  assignTileType() {
    //  Assign their tile's type to the units
    for (let i = 0; i < tiles.length; i++) {
      //  Current tile
      let d = dist(this.x, this.y, tiles[i].x, tiles[i].y);
      if (d <= unitSpeed) {
        this.tiles.current = tiles[i];
        this.tiles.current.occupied = this.team;
      }

      //  Up tile
      d = dist(this.x, this.y - grid.squareSize, tiles[i].x, tiles[i].y);
      if (d <= unitSpeed) {
        this.tiles.up = tiles[i];
      }

      //  Down tile
      d = dist(this.x, this.y + grid.squareSize, tiles[i].x, tiles[i].y);
      if (d <= unitSpeed) {
        this.tiles.down = tiles[i];
      }

      //  Left tile
      d = dist(this.x - grid.squareSize, this.y, tiles[i].x, tiles[i].y);
      if (d <= unitSpeed) {
        this.tiles.left = tiles[i];
      }

      //  Right tile
      d = dist(this.x + grid.squareSize, this.y, tiles[i].x, tiles[i].y);
      if (d <= unitSpeed) {
        this.tiles.right = tiles[i];
      }
    }
  }

  checkDefeated() {
    if (this.stats.defense <= 0) {
      if (this.team === 1) {
        players[0].currency += this.info.cost / 2;
        if (this.info.type === `Lord`) {
          players[1].lords--;
        }
      } else if (this.team === 2) {
        players[1].currency += this.info.cost / 2;
        if (this.info.type === `Lord`) {
          players[0].lords--;
        }
      }

      this.tiles.current.occupied = 0;
      this.endTurn();
      units.splice(units.indexOf(this), 1);
    }
  }

  endTurn() {
    this.currentMovement = 0;
    this.tapped = true;
    this.selected = false;
    setTimeout(() => {
      selectionActive = false;
    }, 50);
  }
}
