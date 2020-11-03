class Unit {
  constructor(xPos, yPos) {
    this.x = selectSquare(xPos);
    this.y = selectSquare(yPos);
    this.selected = false;
    this.movement = 2;
    this.currentMovement = this.movement;
  }

  display() {
    //  Draw the unit
    fill(255, 127, 0);
    noStroke();
    ellipse(
      this.x + grid.squareSize / 2,
      this.y + grid.squareSize / 2,
      grid.squareSize
    );
  }

  move() {
    //  Draw the movement options
    if (this.selected && this.currentMovement > 0) {
      fill(255, 0, 0, 100);
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
