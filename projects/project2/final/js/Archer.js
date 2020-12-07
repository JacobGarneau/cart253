class Archer extends Unit {
  constructor(xPos, yPos, team) {
    super(xPos, yPos, team);
    this.info = {
      type: `Archers`,
      description: `Ranged units. Archers have high offense and low defense but can attack from 2 squares away.`,
      icon: icons.archer,
      iconAlt: icons.archerAlt,
      cost: 250,
    };

    this.stats = {
      movement: 3,
      currentMovement: 3,
      maxAttack: 4,
      attack: 4,
      maxDefense: 3,
      defense: 3,
      magical: false,
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
      this.tiles.up.occupied !== this.team &&
      this.tiles.up.occupied !== 0
    ) {
      this.attackable.up = true;
      console.log(`up`);
    } else {
      this.attackable.up = false;
    }

    if (
      this.selected &&
      this.tiles.down.occupied !== this.team &&
      this.tiles.down.occupied !== 0
    ) {
      this.attackable.down = true;
      console.log(`down`);
    } else {
      this.attackable.down = false;
    }

    if (
      this.selected &&
      this.tiles.left.occupied !== this.team &&
      this.tiles.left.occupied !== 0
    ) {
      this.attackable.left = true;
      console.log(`left`);
    } else {
      this.attackable.left = false;
    }

    if (
      this.selected &&
      this.tiles.right.occupied !== this.team &&
      this.tiles.right.occupied !== 0
    ) {
      this.attackable.right = true;
      console.log(`right`);
    } else {
      this.attackable.right = false;
    }

    //  2 Tiles away
    if (
      this.selected &&
      this.tiles.up2.occupied !== this.team &&
      this.tiles.up2.occupied !== 0
    ) {
      this.attackable.up2 = true;
      console.log(`up2`);
    } else {
      this.attackable.up2 = false;
    }

    if (
      this.selected &&
      this.tiles.down2.occupied !== this.team &&
      this.tiles.down2.occupied !== 0
    ) {
      this.attackable.down2 = true;
      console.log(`down2`);
    } else {
      this.attackable.down2 = false;
    }

    if (
      this.selected &&
      this.tiles.left2.occupied !== this.team &&
      this.tiles.left2.occupied !== 0
    ) {
      this.attackable.left2 = true;
      console.log(`left2`);
    } else {
      this.attackable.left2 = false;
    }

    if (
      this.selected &&
      this.tiles.right2.occupied !== this.team &&
      this.tiles.right2.occupied !== 0
    ) {
      this.attackable.right2 = true;
      console.log(`right2`);
    } else {
      this.attackable.right2 = false;
    }

    //  Diagonally
    if (
      this.selected &&
      this.tiles.upLeft.occupied !== this.team &&
      this.tiles.upLeft.occupied !== 0
    ) {
      this.attackable.upLeft = true;
      console.log(`upLeft`);
    } else {
      this.attackable.upLeft = false;
    }

    if (
      this.selected &&
      this.tiles.upRight.occupied !== this.team &&
      this.tiles.upRight.occupied !== 0
    ) {
      this.attackable.upRight = true;
      console.log(`upRight`);
    } else {
      this.attackable.upRight = false;
    }

    if (
      this.selected &&
      this.tiles.downLeft.occupied !== this.team &&
      this.tiles.downLeft.occupied !== 0
    ) {
      this.attackable.downLeft = true;
      console.log(`downLeft`);
    } else {
      this.attackable.downLeft = false;
    }

    if (
      this.selected &&
      this.tiles.downRight.occupied !== this.team &&
      this.tiles.downRight.occupied !== 0
    ) {
      this.attackable.downRight = true;
      console.log(`downRight`);
    } else {
      this.attackable.downRight = false;
    }
  }

  //  displayAttack()
  //  Displays the unit's attack options
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
  //  Attacks the unit's target
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
          units[i].y > this.y - grid.squareSize &&
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
          units[i].y < this.y + grid.squareSize &&
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
          units[i].x > this.x - grid.squareSize &&
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
          units[i].x > this.x + grid.squareSize &&
          units[i].y <= this.y + 1 &&
          units[i].y >= this.y - 1 &&
          units[i].team !== this.team
        ) {
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
        let d = dist(units[i].x, units[i].y, this.x, this.y);
        if (
          d <= grid.squareSize * 1.5 + 1 &&
          units[i].y < this.y - grid.squareSize &&
          units[i].y > this.y - grid.squareSize * 2 &&
          units[i].x <= this.x + 1 &&
          units[i].x >= this.x - 1 &&
          units[i].team !== this.team
        ) {
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
        let d = dist(units[i].x, units[i].y, this.x, this.y);
        if (
          d <= grid.squareSize * 1.5 + 1 &&
          units[i].y > this.y + grid.squareSize &&
          units[i].y < this.y + grid.squareSize * 2 &&
          units[i].x <= this.x + 1 &&
          units[i].x >= this.x - 1 &&
          units[i].team !== this.team
        ) {
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
        let d = dist(units[i].x, units[i].y, this.x, this.y);
        if (
          d <= grid.squareSize * 1.5 + 1 &&
          units[i].x < this.x - grid.squareSize &&
          units[i].x > this.x - grid.squareSize * 2 &&
          units[i].y <= this.y + 1 &&
          units[i].y >= this.y - 1 &&
          units[i].team !== this.team
        ) {
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
        let d = dist(units[i].x, units[i].y, this.x, this.y);
        if (
          d <= grid.squareSize * 1.5 + 1 &&
          units[i].x > this.x + grid.squareSize &&
          units[i].x > this.x + grid.squareSize * 2 &&
          units[i].y <= this.y + 1 &&
          units[i].y >= this.y - 1 &&
          units[i].team !== this.team
        ) {
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
      mouseX > this.x &&
      this.attackable.upLeft
    ) {
      for (let i = 0; i < units.length; i++) {
        let d = dist(units[i].x, units[i].y, this.x, this.y);
        if (
          d <= grid.squareSize * 1.5 + 1 &&
          units[i].y < this.y &&
          units[i].y > this.y - grid.squareSize &&
          units[i].x < this.x &&
          units[i].x > this.x - grid.squareSize &&
          units[i].team !== this.team
        ) {
          this.damage(units[i]);
        }
      }
    }

    if (
      dY < grid.squareSize * 1.5 &&
      dY > grid.squareSize * 0.5 &&
      dX < grid.squareSize * 1.5 &&
      dX > grid.squareSize * 0.5 &&
      mouseY > this.y &&
      mouseX > this.x &&
      this.attackable.upRight
    ) {
      for (let i = 0; i < units.length; i++) {
        let d = dist(units[i].x, units[i].y, this.x, this.y);
        if (
          d <= grid.squareSize * 1.5 + 1 &&
          units[i].y > this.y &&
          units[i].y < this.y - grid.squareSize &&
          units[i].x < this.x + grid.squareSize &&
          units[i].x > this.x &&
          units[i].team !== this.team
        ) {
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
        let d = dist(units[i].x, units[i].y, this.x, this.y);
        if (
          d <= grid.squareSize * 1.5 + 1 &&
          units[i].x < this.x &&
          units[i].x > this.x - grid.squareSize &&
          units[i].y < this.y &&
          units[i].y > this.y - grid.squareSize &&
          units[i].team !== this.team
        ) {
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
        let d = dist(units[i].x, units[i].y, this.x, this.y);
        if (
          d <= grid.squareSize * 1.5 + 1 &&
          units[i].x > this.x &&
          units[i].x > this.x + grid.squareSize &&
          units[i].y < this.y + grid.squareSize &&
          units[i].y > this.y &&
          units[i].team !== this.team
        ) {
          this.damage(units[i]);
        }
      }
    }
  }

  //  assignTileType()
  //  Determines the type of the tiles surrounding the unit
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
}
