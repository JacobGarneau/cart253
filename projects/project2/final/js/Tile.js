class Tile {
  constructor(x, y, type) {
    this.x = selectSquare(x + 1) + marginX;
    this.y = selectSquare(y + 1) + menuHeight;
    this.type = type;
    this.occupied = 0; //  0 (no unit), 1 (player1 unit), 2 (player2 unit), 3 (neutral unit)
    this.icon;
  }

  display() {
    fill(255);
    if (this.type === `mountains`) {
      fill(231, 231, 231);
      this.icon = icons.mountains;
    } else if (this.type === `forest`) {
      fill(86, 124, 83);
      this.icon = icons.forest;
    } else if (this.type === `plains`) {
      fill(130, 217, 123);
    } else if (this.type === `water`) {
      fill(58, 193, 222);
      this.icon = icons.water;
    } else if (this.type === `road`) {
      fill(222, 207, 189);
    } else if (this.type === `bridge`) {
      fill(147, 135, 120);
    }
    rect(this.x, this.y, grid.squareSize, grid.squareSize);

    if (
      this.type !== `plains` &&
      this.type !== `road` &&
      this.type !== `bridge`
    ) {
      push();
      imageMode(CENTER);
      image(
        this.icon,
        this.x + grid.squareSize / 2,
        this.y + grid.squareSize / 2,
        grid.squareSize / 1.5,
        grid.squareSize / 1.5
      );
      pop();
    }
  }
}
