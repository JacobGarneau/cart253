class Mage extends Unit {
  constructor(xPos, yPos, team) {
    super(xPos, yPos, team);
    this.info = {
      type: `Mages`,
      description: `Powerful practitioners of the arcane arts.\n\nMages have very high offense and low defense\nand can attack from 2 squares away.\n\nTheir magical attacks ignore Heavy units’ damage reduction.`,
      icon: icons.mage,
      iconAlt: icons.mageAlt,
      cost: 350,
    };

    this.stats = {
      movement: 3,
      currentMovement: 3,
      maxAttack: 5,
      attack: 5,
      maxDefense: 3,
      defense: 3,
      magical: true,
    };

    this.tiles = {
      up: false,
      down: false,
      left: false,
      right: false,
      up2: false,
      down2: false,
      left2: false,
      right2: false,
      upLeft: false,
      upRight: false,
      downLeft: false,
      downRight: false,
    };

    this.attackable = {
      up: false,
      down: false,
      left: false,
      right: false,
      up2: false,
      down2: false,
      left2: false,
      right2: false,
      upLeft: false,
      upRight: false,
      downLeft: false,
      downRight: false,
    };
  }

  //  checkAttack()
  //  Allows the unit to attack targets up to 2 tiles away
  checkAttack() {
    if (
      this.selected &&
      this.tiles.up.occupied !== undefined &&
      this.tiles.up.occupied !== this.team &&
      this.tiles.up.occupied !== 0
    ) {
      this.attackable.up = true;
    } else {
      this.attackable.up = false;
    }

    if (
      this.selected &&
      this.tiles.down.occupied !== undefined &&
      this.tiles.down.occupied !== this.team &&
      this.tiles.down.occupied !== 0
    ) {
      this.attackable.down = true;
    } else {
      this.attackable.down = false;
    }

    if (
      this.selected &&
      this.tiles.left.occupied !== undefined &&
      this.tiles.left.occupied !== this.team &&
      this.tiles.left.occupied !== 0
    ) {
      this.attackable.left = true;
    } else {
      this.attackable.left = false;
    }

    if (
      this.selected &&
      this.tiles.right.occupied !== undefined &&
      this.tiles.right.occupied !== this.team &&
      this.tiles.right.occupied !== 0
    ) {
      this.attackable.right = true;
    } else {
      this.attackable.right = false;
    }

    //  2 Tiles away
    if (
      this.selected &&
      this.tiles.up2.occupied !== undefined &&
      this.tiles.up2.occupied !== this.team &&
      this.tiles.up2.occupied !== 0
    ) {
      this.attackable.up2 = true;
    } else {
      this.attackable.up2 = false;
    }

    if (
      this.selected &&
      this.tiles.down2.occupied !== undefined &&
      this.tiles.down2.occupied !== this.team &&
      this.tiles.down2.occupied !== 0
    ) {
      this.attackable.down2 = true;
    } else {
      this.attackable.down2 = false;
    }

    if (
      this.selected &&
      this.tiles.left2.occupied !== undefined &&
      this.tiles.left2.occupied !== this.team &&
      this.tiles.left2.occupied !== 0
    ) {
      this.attackable.left2 = true;
    } else {
      this.attackable.left2 = false;
    }

    if (
      this.selected &&
      this.tiles.right2.occupied !== undefined &&
      this.tiles.right2.occupied !== this.team &&
      this.tiles.right2.occupied !== 0
    ) {
      this.attackable.right2 = true;
    } else {
      this.attackable.right2 = false;
    }

    //  Diagonally
    if (
      this.selected &&
      this.tiles.upLeft.occupied !== undefined &&
      this.tiles.upLeft.occupied !== this.team &&
      this.tiles.upLeft.occupied !== 0
    ) {
      this.attackable.upLeft = true;
    } else {
      this.attackable.upLeft = false;
    }

    if (
      this.selected &&
      this.tiles.upRight.occupied !== undefined &&
      this.tiles.upRight.occupied !== this.team &&
      this.tiles.upRight.occupied !== 0
    ) {
      this.attackable.upRight = true;
    } else {
      this.attackable.upRight = false;
    }

    if (
      this.selected &&
      this.tiles.downLeft.occupied !== undefined &&
      this.tiles.downLeft.occupied !== this.team &&
      this.tiles.downLeft.occupied !== 0
    ) {
      this.attackable.downLeft = true;
    } else {
      this.attackable.downLeft = false;
    }

    if (
      this.selected &&
      this.tiles.downRight.occupied !== undefined &&
      this.tiles.downRight.occupied !== this.team &&
      this.tiles.downRight.occupied !== 0
    ) {
      this.attackable.downRight = true;
    } else {
      this.attackable.downRight = false;
    }
  }

  //  displayAttack()
  //  Displays the unit's attack options up to 2 tiles away
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

    //  2 tiles away

    if (this.attackable.up2 && this.controllable) {
      push();
      rectMode(CENTER);
      fill(colors.attack.r, colors.attack.g, colors.attack.b, colors.attack.a);
      rect(
        this.x + grid.squareSize / 2,
        this.y + grid.squareSize / 2 - grid.squareSize * 2,
        grid.squareSize,
        grid.squareSize
      );
      imageMode(CENTER);
      image(
        icons.attackable,
        this.x + grid.squareSize / 2,
        this.y + grid.squareSize / 2 - grid.squareSize * 2,
        grid.squareSize / 1.5,
        grid.squareSize / 1.5
      );
      pop();
    }

    if (this.attackable.down2 && this.controllable) {
      push();
      rectMode(CENTER);
      fill(colors.attack.r, colors.attack.g, colors.attack.b, colors.attack.a);
      rect(
        this.x + grid.squareSize / 2,
        this.y + grid.squareSize / 2 + grid.squareSize * 2,
        grid.squareSize,
        grid.squareSize
      );
      imageMode(CENTER);
      image(
        icons.attackable,
        this.x + grid.squareSize / 2,
        this.y + grid.squareSize / 2 + grid.squareSize * 2,
        grid.squareSize / 1.5,
        grid.squareSize / 1.5
      );
      pop();
    }

    if (this.attackable.left2 && this.controllable) {
      push();
      rectMode(CENTER);
      fill(colors.attack.r, colors.attack.g, colors.attack.b, colors.attack.a);
      rect(
        this.x + grid.squareSize / 2 - grid.squareSize * 2,
        this.y + grid.squareSize / 2,
        grid.squareSize,
        grid.squareSize
      );
      imageMode(CENTER);
      image(
        icons.attackable,
        this.x + grid.squareSize / 2 - grid.squareSize * 2,
        this.y + grid.squareSize / 2,
        grid.squareSize / 1.5,
        grid.squareSize / 1.5
      );
      pop();
    }

    if (this.attackable.right2 && this.controllable) {
      push();
      rectMode(CENTER);
      fill(colors.attack.r, colors.attack.g, colors.attack.b, colors.attack.a);
      rect(
        this.x + grid.squareSize / 2 + grid.squareSize * 2,
        this.y + grid.squareSize / 2,
        grid.squareSize,
        grid.squareSize
      );
      imageMode(CENTER);
      image(
        icons.attackable,
        this.x + grid.squareSize / 2 + grid.squareSize * 2,
        this.y + grid.squareSize / 2,
        grid.squareSize / 1.5,
        grid.squareSize / 1.5
      );
      pop();
    }

    //  Diagonally

    if (this.attackable.upLeft && this.controllable) {
      push();
      rectMode(CENTER);
      fill(colors.attack.r, colors.attack.g, colors.attack.b, colors.attack.a);
      rect(
        this.x + grid.squareSize / 2 - grid.squareSize,
        this.y + grid.squareSize / 2 - grid.squareSize,
        grid.squareSize,
        grid.squareSize
      );
      imageMode(CENTER);
      image(
        icons.attackable,
        this.x + grid.squareSize / 2 - grid.squareSize,
        this.y + grid.squareSize / 2 - grid.squareSize,
        grid.squareSize / 1.5,
        grid.squareSize / 1.5
      );
      pop();
    }

    if (this.attackable.upRight && this.controllable) {
      push();
      rectMode(CENTER);
      fill(colors.attack.r, colors.attack.g, colors.attack.b, colors.attack.a);
      rect(
        this.x + grid.squareSize / 2 + grid.squareSize,
        this.y + grid.squareSize / 2 - grid.squareSize,
        grid.squareSize,
        grid.squareSize
      );
      imageMode(CENTER);
      image(
        icons.attackable,
        this.x + grid.squareSize / 2 + grid.squareSize,
        this.y + grid.squareSize / 2 - grid.squareSize,
        grid.squareSize / 1.5,
        grid.squareSize / 1.5
      );
      pop();
    }

    if (this.attackable.downLeft && this.controllable) {
      push();
      rectMode(CENTER);
      fill(colors.attack.r, colors.attack.g, colors.attack.b, colors.attack.a);
      rect(
        this.x + grid.squareSize / 2 - grid.squareSize,
        this.y + grid.squareSize / 2 + grid.squareSize,
        grid.squareSize,
        grid.squareSize
      );
      imageMode(CENTER);
      image(
        icons.attackable,
        this.x + grid.squareSize / 2 - grid.squareSize,
        this.y + grid.squareSize / 2 + grid.squareSize,
        grid.squareSize / 1.5,
        grid.squareSize / 1.5
      );
      pop();
    }

    if (this.attackable.downRight && this.controllable) {
      push();
      rectMode(CENTER);
      fill(colors.attack.r, colors.attack.g, colors.attack.b, colors.attack.a);
      rect(
        this.x + grid.squareSize / 2 + grid.squareSize,
        this.y + grid.squareSize / 2 + grid.squareSize,
        grid.squareSize,
        grid.squareSize
      );
      imageMode(CENTER);
      image(
        icons.attackable,
        this.x + grid.squareSize / 2 + grid.squareSize,
        this.y + grid.squareSize / 2 + grid.squareSize,
        grid.squareSize / 1.5,
        grid.squareSize / 1.5
      );
      pop();
    }
  }

  //  attack()
  //  Allows the unit to attack up to 2 tiles away
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
        let d = dist(units[i].x, units[i].y, this.tiles.up.x, this.tiles.up.y);
        if (d <= grid.squareSize / 2) {
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
        let d = dist(
          units[i].x,
          units[i].y,
          this.tiles.down.x,
          this.tiles.down.y
        );
        if (d <= grid.squareSize / 2) {
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
        let d = dist(
          units[i].x,
          units[i].y,
          this.tiles.left.x,
          this.tiles.left.y
        );
        if (d <= grid.squareSize / 2) {
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
        let d = dist(
          units[i].x,
          units[i].y,
          this.tiles.right.x,
          this.tiles.right.y
        );
        if (d <= grid.squareSize / 2) {
          this.damage(units[i]);
        }
      }
    }

    //  2 tiles away

    if (
      dY < grid.squareSize * 2.5 &&
      dY > grid.squareSize * 1.5 &&
      dX < grid.squareSize * 0.5 &&
      mouseY < this.y &&
      mouseX > this.x &&
      this.attackable.up2
    ) {
      for (let i = 0; i < units.length; i++) {
        let d = dist(
          units[i].x,
          units[i].y,
          this.tiles.up2.x,
          this.tiles.up2.y
        );
        if (d <= grid.squareSize / 2) {
          this.damage(units[i]);
        }
      }
    }

    if (
      dY < grid.squareSize * 2.5 &&
      dY > grid.squareSize * 1.5 &&
      dX < grid.squareSize * 0.5 &&
      mouseY > this.y &&
      mouseX > this.x &&
      this.attackable.down2
    ) {
      for (let i = 0; i < units.length; i++) {
        let d = dist(
          units[i].x,
          units[i].y,
          this.tiles.down2.x,
          this.tiles.down2.y
        );
        if (d <= grid.squareSize / 2) {
          this.damage(units[i]);
        }
      }
    }

    if (
      dX < grid.squareSize * 2.5 &&
      dX > grid.squareSize * 1.5 &&
      dY < grid.squareSize * 0.5 &&
      mouseX < this.x &&
      mouseY > this.y &&
      this.attackable.left2
    ) {
      for (let i = 0; i < units.length; i++) {
        let d = dist(
          units[i].x,
          units[i].y,
          this.tiles.left2.x,
          this.tiles.left2.y
        );
        if (d <= grid.squareSize / 2) {
          this.damage(units[i]);
        }
      }
    }

    if (
      dX < grid.squareSize * 2.5 &&
      dX > grid.squareSize * 1.5 &&
      dY < grid.squareSize * 0.5 &&
      mouseX > this.x &&
      mouseY > this.y &&
      this.attackable.right2
    ) {
      for (let i = 0; i < units.length; i++) {
        let d = dist(
          units[i].x,
          units[i].y,
          this.tiles.right2.x,
          this.tiles.right2.y
        );
        if (d <= grid.squareSize / 2) {
          this.damage(units[i]);
        }
      }
    }

    //  Diagonally

    if (
      dY < grid.squareSize * 1.5 &&
      dY > grid.squareSize * 0.5 &&
      dX < grid.squareSize * 1.5 &&
      dX > grid.squareSize * 0.5 &&
      mouseY < this.y &&
      mouseX < this.x &&
      this.attackable.upLeft
    ) {
      for (let i = 0; i < units.length; i++) {
        let d = dist(
          units[i].x,
          units[i].y,
          this.tiles.upLeft.x,
          this.tiles.upLeft.y
        );
        if (d <= grid.squareSize / 2) {
          this.damage(units[i]);
        }
      }
    }

    if (
      dY < grid.squareSize * 1.5 &&
      dY > grid.squareSize * 0.5 &&
      dX < grid.squareSize * 1.5 &&
      dX > grid.squareSize * 0.5 &&
      mouseY < this.y &&
      mouseX > this.x &&
      this.attackable.upRight
    ) {
      for (let i = 0; i < units.length; i++) {
        let d = dist(
          units[i].x,
          units[i].y,
          this.tiles.upRight.x,
          this.tiles.upRight.y
        );
        if (d <= grid.squareSize / 2) {
          this.damage(units[i]);
        }
      }
    }

    if (
      dX < grid.squareSize * 1.5 &&
      dX > grid.squareSize * 0.5 &&
      dY < grid.squareSize * 1.5 &&
      dY > grid.squareSize * 0.5 &&
      mouseX < this.x &&
      mouseY > this.y &&
      this.attackable.downLeft
    ) {
      for (let i = 0; i < units.length; i++) {
        let d = dist(
          units[i].x,
          units[i].y,
          this.tiles.downLeft.x,
          this.tiles.downLeft.y
        );
        if (d <= grid.squareSize / 2) {
          this.damage(units[i]);
        }
      }
    }

    if (
      dX < grid.squareSize * 1.5 &&
      dX > grid.squareSize * 0.5 &&
      dY < grid.squareSize * 1.5 &&
      dY > grid.squareSize * 0.5 &&
      mouseX > this.x &&
      mouseY > this.y &&
      this.attackable.downRight
    ) {
      for (let i = 0; i < units.length; i++) {
        let d = dist(
          units[i].x,
          units[i].y,
          this.tiles.downRight.x,
          this.tiles.downRight.y
        );
        if (d <= grid.squareSize / 2) {
          this.damage(units[i]);
        }
      }
    }
  }

  //  assignTileType()
  //  Expands the detection of the surrounding tiles' types to 2 tiles of range
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

      //  2 tiles away

      //  Up2 tile
      d = dist(this.x, this.y - grid.squareSize * 2, tiles[i].x, tiles[i].y);
      if (d <= unitSpeed) {
        this.tiles.up2 = tiles[i];
      }

      //  Down2 tile
      d = dist(this.x, this.y + grid.squareSize * 2, tiles[i].x, tiles[i].y);
      if (d <= unitSpeed) {
        this.tiles.down2 = tiles[i];
      }

      //  Left2 tile
      d = dist(this.x - grid.squareSize * 2, this.y, tiles[i].x, tiles[i].y);
      if (d <= unitSpeed) {
        this.tiles.left2 = tiles[i];
      }

      //  Right2 tile
      d = dist(this.x + grid.squareSize * 2, this.y, tiles[i].x, tiles[i].y);
      if (d <= unitSpeed) {
        this.tiles.right2 = tiles[i];
      }

      //  Diagonally

      //  Up-Left tile
      d = dist(
        this.x - grid.squareSize,
        this.y - grid.squareSize,
        tiles[i].x,
        tiles[i].y
      );
      if (d <= unitSpeed) {
        this.tiles.upLeft = tiles[i];
      }

      //  Up-Right tile
      d = dist(
        this.x + grid.squareSize,
        this.y - grid.squareSize,
        tiles[i].x,
        tiles[i].y
      );
      if (d <= unitSpeed) {
        this.tiles.upRight = tiles[i];
      }

      //  Down-Left tile
      d = dist(
        this.x - grid.squareSize,
        this.y + grid.squareSize,
        tiles[i].x,
        tiles[i].y
      );
      if (d <= unitSpeed) {
        this.tiles.downLeft = tiles[i];
      }

      //  Down-Right tile
      d = dist(
        this.x + grid.squareSize,
        this.y + grid.squareSize,
        tiles[i].x,
        tiles[i].y
      );
      if (d <= unitSpeed) {
        this.tiles.downRight = tiles[i];
      }
    }
  }

  //  animateMovement()
  //  Prevents the unit from ending its turn when reaching 0 Movement if a target is within range
  animateMovement() {
    this.stats.currentMovement--;
    this.controllable = false;

    let timeoutDelay = (grid.squareSize / unitSpeed / 60) * 1000;
    setTimeout(() => {
      this.x = this.destinationX;
      this.y = this.destinationY;

      let banditRoll = random(0, 100);
      setTimeout(() => {
        this.controllable = true;
        if (
          banditRoll <= banditChance &&
          this.tiles.current.type === `forest` &&
          this.banditEncounters
        ) {
          popup.active = `bandits`;
          banditTarget = this;
          sounds.bandits.play();
        }
      }, 25);

      if (this.stats.currentMovement === 0) {
        setTimeout(() => {
          if (
            !this.attackable.up &&
            !this.attackable.down &&
            !this.attackable.left &&
            !this.attackable.right &&
            !this.attackable.up2 &&
            !this.attackable.Down2 &&
            !this.attackable.left2 &&
            !this.attackable.right2 &&
            !this.attackable.upLeft &&
            !this.attackable.upRight &&
            !this.attackable.downLeft &&
            !this.attackable.downRight
          ) {
            this.endTurn();
          }
        }, 100);
      }
    }, timeoutDelay);
  }
}
