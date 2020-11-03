class Unit {
  constructor(xPos, yPos, movement, maxAttack, maxDefense) {
    this.x = selectSquare(xPos);
    this.y = selectSquare(yPos);
    this.destinationX = this.x;
    this.destinationY = this.y;
    this.selected = false;
    this.movement = movement;
    this.currentMovement = this.movement;
    this.maxDefense = maxDefense;
    this.maxAttack = maxAttack;
    this.defense = this.maxDefense;
    this.attack = this.maxAttack;
  }

  display() {
    //  Draw the unit
    fill(255, 255, 255);
    noStroke();
    ellipse(
      this.x + grid.squareSize / 2,
      this.y + grid.squareSize / 2,
      grid.squareSize
    );

    //  Circles
    fill(255, 0, 127);
    ellipse(
      this.x + grid.squareSize / 2 + 22.5,
      this.y + grid.squareSize / 2 + 22.5,
      30
    );

    fill(0, 255, 127);
    ellipse(
      this.x + grid.squareSize / 2 - 22.5,
      this.y + grid.squareSize / 2 + 22.5,
      30
    );

    //  Text
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(16);
    text(
      this.attack,
      this.x + grid.squareSize / 2 + 22.5,
      this.y + grid.squareSize / 2 + 22.5
    );
    text(
      this.defense,
      this.x + grid.squareSize / 2 - 22.5,
      this.y + grid.squareSize / 2 + 22.5
    );
  }

  move() {
    //  Draw the movement options
    if (
      this.selected &&
      this.currentMovement > 0 &&
      this.x === this.destinationX &&
      this.y === this.destinationY
    ) {
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

    unit.x = constrain(unit.x, 0, width);
    unit.y = constrain(unit.y, 0, height);
  }
}
