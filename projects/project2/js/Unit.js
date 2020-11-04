class Unit {
  constructor(xPos, yPos, unitType, team) {
    this.x = selectSquare(xPos);
    this.y = selectSquare(yPos);
    this.destinationX = this.x;
    this.destinationY = this.y;
    this.selected = false;
    this.movable = true;
    this.unitType = unitType; //  infantry, archers, cavalry, heavy
    this.team = team;

    this.tileType = {
      current: undefined,
      up: undefined,
      down: undefined,
      left: undefined,
      right: undefined,
    };

    this.tiles = {
      up: 0,
      down: 3,
      left: 0,
      right: 3,
    };

    if (this.unitType === `infantry`) {
      this.stats = {
        movement: 3,
        currentMovement: 3,
        maxAttack: 4,
        attack: 4,
        maxDefense: 4,
        defense: 4,
      };
    } else if (this.unitType === `archers`) {
      this.stats = {
        movement: 3,
        currentMovement: 3,
        maxAttack: 5,
        attack: 5,
        maxDefense: 3,
        defense: 3,
      };
    } else if (this.unitType === `cavalry`) {
      this.stats = {
        movement: 4,
        currentMovement: 4,
        maxAttack: 5,
        attack: 5,
        maxDefense: 3,
        defense: 3,
      };
    } else if (this.unitType === `heavy`) {
      this.stats = {
        movement: 2,
        currentMovement: 2,
        maxAttack: 3,
        attack: 3,
        maxDefense: 5,
        defense: 5,
      };
    }
  }

  display() {
    //  Draw the unit
    fill(255);
    noStroke();
    ellipseMode(CORNER);
    ellipse(this.x, this.y, grid.squareSize);

    //  Attack circle
    fill(255, 0, 127);
    ellipseMode(CENTER);
    ellipse(
      this.x + grid.squareSize / 2 + grid.squareSize / 3,
      this.y + grid.squareSize / 2 + grid.squareSize / 3,
      grid.squareSize / 3
    );

    //  Defense circle
    fill(0, 200, 127);
    ellipse(
      this.x + grid.squareSize / 2 - grid.squareSize / 3,
      this.y + grid.squareSize / 2 + grid.squareSize / 3,
      grid.squareSize / 3
    );

    //  Movement circle
    fill(200, 200, 127);
    ellipse(
      this.x + grid.squareSize / 2 - grid.squareSize / 3,
      this.y + grid.squareSize / 2 - grid.squareSize / 3,
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
    text(
      this.stats.defense,
      this.x + grid.squareSize / 2 - grid.squareSize / 3,
      this.y + grid.squareSize / 2 + grid.squareSize / 3
    );

    //  Movement text
    text(
      this.stats.currentMovement,
      this.x + grid.squareSize / 2 - grid.squareSize / 3,
      this.y + grid.squareSize / 2 - grid.squareSize / 3
    );
  }

  move() {
    //  Draw the movement options
    if (
      this.selected &&
      this.stats.currentMovement > 0 &&
      this.x === this.destinationX &&
      this.y === this.destinationY
    ) {
      fill(255, 0, 0, 150);
      noStroke();

      if (
        this.tileType.up === `water` ||
        (this.unitType === `cavalry` && this.tileType.up === `mountains`)
      ) {
        this.tiles.up = 1;
      } else {
        this.tiles.up = 0;
      }

      if (
        this.tileType.down === `water` ||
        (this.unitType === `cavalry` && this.tileType.down === `mountains`)
      ) {
        this.tiles.down = 2;
      } else {
        this.tiles.down = 3;
      }

      if (
        this.tileType.left === `water` ||
        (this.unitType === `cavalry` && this.tileType.left === `mountains`)
      ) {
        this.tiles.left = 1;
      } else {
        this.tiles.left = 0;
      }

      if (
        this.tileType.right === `water` ||
        (this.unitType === `cavalry` && this.tileType.right === `mountains`)
      ) {
        this.tiles.right = 2;
      } else {
        this.tiles.right = 3;
      }
      console.log(this.tileType.right);

      for (let i = this.tiles.left; i < this.tiles.right; i++) {
        rect(
          this.x + selectSquare(i),
          this.y,
          grid.squareSize,
          grid.squareSize
        );
      }

      for (let i = this.tiles.up; i < this.tiles.down; i++) {
        rect(
          this.x,
          this.y + selectSquare(i),
          grid.squareSize,
          grid.squareSize
        );
      }
    }

    //  Move the unit
    if (this.x < this.destinationX) {
      this.x += unitSpeed;
    } else if (this.x > this.destinationX) {
      this.x -= unitSpeed;
    } else if (this.y < this.destinationY) {
      this.y += unitSpeed;
    } else if (this.y > this.destinationY) {
      this.y -= unitSpeed;
    }

    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  assignTileType() {
    //  Assign their tile's type to the units
    for (let i = 0; i < tiles.length; i++) {
      //  Current tile
      let d = dist(this.x, this.y, tiles[i].x, tiles[i].y);
      if (d <= unitSpeed) {
        this.tileType.current = tiles[i].type;
        tiles[i].occupied = this.team;
      }

      //  Up tile
      d = dist(this.x, this.y - grid.squareSize, tiles[i].x, tiles[i].y);
      if (d <= unitSpeed) {
        this.tileType.up = tiles[i].type;
      }

      //  Down tile
      d = dist(this.x, this.y + grid.squareSize, tiles[i].x, tiles[i].y);
      if (d <= unitSpeed) {
        this.tileType.down = tiles[i].type;
      }

      //  Left tile
      d = dist(this.x - grid.squareSize, this.y, tiles[i].x, tiles[i].y);
      if (d <= unitSpeed) {
        this.tileType.left = tiles[i].type;
      }

      //  Right tile
      d = dist(this.x + grid.squareSize, this.y, tiles[i].x, tiles[i].y);
      if (d <= unitSpeed) {
        this.tileType.right = tiles[i].type;
      }
    }
  }
}
