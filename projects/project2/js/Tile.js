class Tile {
  constructor(x, y, type) {
    this.x = selectSquare(x + 1);
    this.y = selectSquare(y + 1);
    this.type = type;
    this.occupied = 0; //  0 (no unit), 1 (player1 unit), 2 (player2 unit), 3 (neutral unit)
  }

  display() {
    fill(255);
    if (this.type === `mountains`) {
      fill(127, 127, 127);
    } else if (this.type === `forest`) {
      fill(0, 127, 0);
    } else if (this.type === `plains`) {
      fill(50, 220, 50);
    } else if (this.type === `water`) {
      fill(0, 100, 255);
    }
    rect(this.x, this.y, grid.squareSize, grid.squareSize);
  }
}
