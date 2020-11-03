class Unit {
  constructor(xPos, yPos) {
    this.x = selectSquare(xPos);
    this.y = selectSquare(yPos);
    this.selected = false;
  }

  draw() {
    //  Draw the unit
    fill(255, 127, 0);
    noStroke();
    ellipse(
      this.x + grid.squareSize / 2,
      this.y + grid.squareSize / 2,
      grid.squareSize
    );
  }

  movement() {
    //  Draw the movement options
    if (this.selected) {
      fill(0, 255, 127, 100);
      noStroke();
      for (let i = 0; i < 3; i++) {
        rect(
          this.x + selectSquare(i),
          this.y,
          grid.squareSize,
          grid.squareSize
        );
      }

      for (let i = 0; i < 3; i++) {
        rect(
          this.x,
          this.y + selectSquare(i),
          grid.squareSize,
          grid.squareSize
        );
      }
    }
  }
}
