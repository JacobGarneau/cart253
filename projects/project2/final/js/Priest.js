class Priest extends Unit {
  constructor(xPos, yPos, team) {
    super(xPos, yPos, team);
    this.info = {
      type: `Priests`,
      description: `Servants of God blessed with divine power.\n\nPriests have average offense and average defense\nbut can heal ally units.\n\nTheir magical attacks ignore Heavy units’ damage reduction.`,
      icon: icons.priest,
      iconAlt: icons.priestAlt,
      cost: 350,
    };

    this.stats = {
      movement: 3,
      currentMovement: 3,
      maxAttack: 3,
      attack: 3,
      maxDefense: 4,
      defense: 4,
      healing: 3,
      magical: true,
    };

    this.healable = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
  }

  //  checkHealing()
  //  Checks for nearby healable units
  checkHealing() {
    if (this.selected && this.tiles.up.occupied === this.team) {
      this.healable.up = true;
    } else {
      this.healable.up = false;
    }

    if (this.selected && this.tiles.down.occupied === this.team) {
      this.healable.down = true;
    } else {
      this.healable.down = false;
    }

    if (this.selected && this.tiles.left.occupied === this.team) {
      this.healable.left = true;
    } else {
      this.healable.left = false;
    }

    if (this.selected && this.tiles.right.occupied === this.team) {
      this.healable.right = true;
    } else {
      this.healable.right = false;
    }
  }

  //  displayHealing()
  //  Displays the available healing options
  displayHealing() {
    if (this.healable.up && this.controllable) {
      push();
      rectMode(CENTER);
      fill(colors.heal.r, colors.heal.g, colors.heal.b, colors.heal.a);
      rect(
        this.x + grid.squareSize / 2,
        this.y + grid.squareSize / 2 - grid.squareSize,
        grid.squareSize,
        grid.squareSize
      );
      imageMode(CENTER);
      image(
        icons.healable,
        this.x + grid.squareSize / 2,
        this.y + grid.squareSize / 2 - grid.squareSize,
        grid.squareSize / 1.5,
        grid.squareSize / 1.5
      );
      pop();
    }

    if (this.healable.down && this.controllable) {
      push();
      rectMode(CENTER);
      fill(colors.heal.r, colors.heal.g, colors.heal.b, colors.heal.a);
      rect(
        this.x + grid.squareSize / 2,
        this.y + grid.squareSize / 2 + grid.squareSize,
        grid.squareSize,
        grid.squareSize
      );
      imageMode(CENTER);
      image(
        icons.healable,
        this.x + grid.squareSize / 2,
        this.y + grid.squareSize / 2 + grid.squareSize,
        grid.squareSize / 1.5,
        grid.squareSize / 1.5
      );
      pop();
    }

    if (this.healable.left && this.controllable) {
      push();
      rectMode(CENTER);
      fill(colors.heal.r, colors.heal.g, colors.heal.b, colors.heal.a);
      rect(
        this.x + grid.squareSize / 2 - grid.squareSize,
        this.y + grid.squareSize / 2,
        grid.squareSize,
        grid.squareSize
      );
      imageMode(CENTER);
      image(
        icons.healable,
        this.x + grid.squareSize / 2 - grid.squareSize,
        this.y + grid.squareSize / 2,
        grid.squareSize / 1.5,
        grid.squareSize / 1.5
      );
      pop();
    }

    if (this.healable.right && this.controllable) {
      push();
      rectMode(CENTER);
      fill(colors.heal.r, colors.heal.g, colors.heal.b, colors.heal.a);
      rect(
        this.x + grid.squareSize / 2 + grid.squareSize,
        this.y + grid.squareSize / 2,
        grid.squareSize,
        grid.squareSize
      );
      imageMode(CENTER);
      image(
        icons.healable,
        this.x + grid.squareSize / 2 + grid.squareSize,
        this.y + grid.squareSize / 2,
        grid.squareSize / 1.5,
        grid.squareSize / 1.5
      );
      pop();
    }
  }

  //  heal()
  //  Handles unit healing
  heal() {
    let dX = dist(mouseX, 0, this.x + grid.squareSize / 2, 0);
    let dY = dist(0, mouseY, 0, this.y + grid.squareSize / 2);

    if (
      dY < grid.squareSize * 1.5 &&
      dY > grid.squareSize * 0.5 &&
      dX < grid.squareSize * 0.5 &&
      mouseY < this.y &&
      mouseX > this.x &&
      this.healable.up
    ) {
      for (let i = 0; i < units.length; i++) {
        let d = dist(units[i].x, units[i].y, this.x, this.y);
        if (
          d <= grid.squareSize * 1.5 + 1 &&
          units[i].y < this.y &&
          units[i].x <= this.x + 1 &&
          units[i].x >= this.x - 1 &&
          units[i].team === this.team
        ) {
          this.healDefense(units[i]);
          this.endTurn();
        }
      }
    }

    if (
      dY < grid.squareSize * 1.5 &&
      dY > grid.squareSize * 0.5 &&
      dX < grid.squareSize * 0.5 &&
      mouseY > this.y &&
      mouseX > this.x &&
      this.healable.down
    ) {
      for (let i = 0; i < units.length; i++) {
        let d = dist(units[i].x, units[i].y, this.x, this.y);
        if (
          d <= grid.squareSize * 1.5 + 1 &&
          units[i].y > this.y &&
          units[i].x <= this.x + 1 &&
          units[i].x >= this.x - 1 &&
          units[i].team === this.team
        ) {
          this.healDefense(units[i]);
          this.endTurn();
        }
      }
    }

    if (
      dX < grid.squareSize * 1.5 &&
      dX > grid.squareSize * 0.5 &&
      dY < grid.squareSize * 0.5 &&
      mouseX < this.x &&
      mouseY > this.y &&
      this.healable.left
    ) {
      for (let i = 0; i < units.length; i++) {
        let d = dist(units[i].x, units[i].y, this.x, this.y);
        if (
          d <= grid.squareSize * 1.5 + 1 &&
          units[i].x < this.x &&
          units[i].y <= this.y + 1 &&
          units[i].y >= this.y - 1 &&
          units[i].team === this.team
        ) {
          this.healDefense(units[i]);
          this.endTurn();
        }
      }
    }

    if (
      dX < grid.squareSize * 1.5 &&
      dX > grid.squareSize * 0.5 &&
      dY < grid.squareSize * 0.5 &&
      mouseX > this.x &&
      mouseY > this.y &&
      this.healable.right
    ) {
      for (let i = 0; i < units.length; i++) {
        let d = dist(units[i].x, units[i].y, this.x, this.y);
        if (
          d <= grid.squareSize * 1.5 + 1 &&
          units[i].x > this.x &&
          units[i].y <= this.y + 1 &&
          units[i].y >= this.y - 1 &&
          units[i].team === this.team
        ) {
          this.healDefense(units[i]);
          this.endTurn();
        }
      }
    }
  }

  //  healDefense(target)
  //  Heals the targeted unit by a specific amount
  healDefense(target) {
    if (target.stats.defense + this.stats.healing > target.stats.maxDefense) {
      target.stats.defense = target.stats.maxDefense;
    } else {
      target.stats.defense += this.stats.healing;
    }
  }

  //  animateMovement()
  //  Prevents turn from ending if healabe unit is nearby
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
        setTimeout(() => {
          if (
            !this.attackable.up &&
            !this.attackable.down &&
            !this.attackable.left &&
            !this.attackable.right &&
            !this.healable.up &&
            !this.healable.down &&
            !this.healable.left &&
            !this.healable.right
          ) {
            this.endTurn();
          }
        });
      }
    }, timeoutDelay);
  }
}
