class Unit {
  constructor(xPos, yPos, team) {
    this.x = selectSquare(xPos) + marginX;
    this.y = selectSquare(yPos) + menuHeight;
    this.destinationX = this.x;
    this.destinationY = this.y;
    this.selected = false;
    this.controllable = true;
    this.team = team;

    this.movable = {
      up: true,
      down: true,
      left: true,
      right: true,
    };

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

  checkMovement() {
    if (this.tileType.up === `water`) {
      this.movable.up = false;
    } else {
      this.movable.up = true;
    }

    if (this.tileType.down === `water`) {
      this.movable.down = false;
    } else {
      this.movable.down = true;
    }

    if (this.tileType.left === `water`) {
      this.movable.left = false;
    } else {
      this.movable.left = true;
    }

    if (this.tileType.right === `water`) {
      this.movable.right = false;
    } else {
      this.movable.right = true;
    }
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

      if (this.movable.up) {
        this.tiles.up = 0;
      } else {
        this.tiles.up = 1;
      }

      if (this.movable.down) {
        this.tiles.down = 3;
      } else {
        this.tiles.down = 2;
      }

      if (this.movable.left) {
        this.tiles.left = 0;
      } else {
        this.tiles.left = 1;
      }

      if (this.movable.right) {
        this.tiles.right = 3;
      } else {
        this.tiles.right = 2;
      }

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
