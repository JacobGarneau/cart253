class Tile {
  constructor(x, y, type) {
    this.x = selectSquare(x + 1) + marginX;
    this.y = selectSquare(y + 1) + menuHeight;
    this.type = type;
    this.occupied = 0; //  0 (no unit), 1 (player1 unit), 2 (player2 unit), 3 (neutral unit)
  }

  display() {
    fill(255);
    if (this.type === `mountains`) {
      fill(231, 231, 231);
    } else if (this.type === `forest`) {
      fill(86, 124, 83);
    } else if (this.type === `plains`) {
      fill(130, 217, 123);
    } else if (this.type === `water`) {
      fill(58, 193, 222);
    }
    rect(this.x, this.y, grid.squareSize, grid.squareSize);
  }
}
