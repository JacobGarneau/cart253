class Unit {
  constructor(xPos, yPos, movement, maxAttack, maxDefense, unitType, team) {
    this.x = selectSquare(xPos);
    this.y = selectSquare(yPos);
    this.destinationX = this.x;
    this.destinationY = this.y;
    this.selected = false;
    this.movable = true;
    this.unitType = unitType; //  infantry, archers, cavalry, heavy
    this.team = team;

    this.tileType = {
      current: `plains`,
      up: `plains`,
      down: `plains`,
      left: `plains`,
      right: `plains`,
    };

    this.stats = {
      movement: movement,
      currentMovement: movement,
      maxAttack: maxAttack,
      attack: maxAttack,
      maxDefense: maxDefense,
      defense: maxDefense,
    };
  }

  display() {
    //  Draw the unit
    fill(255, 255, 255);
    noStroke();
    ellipseMode(CORNER);
    ellipse(this.x, this.y, grid.squareSize);

    //  Attack circle
    fill(255, 0, 127);
    ellipseMode(CENTER);
    ellipse(
      this.x + grid.squareSize / 2 + 22.5,
      this.y + grid.squareSize / 2 + 22.5,
      30
    );

    //  Defense circle
    fill(0, 255, 127);
    ellipse(
      this.x + grid.squareSize / 2 - 22.5,
      this.y + grid.squareSize / 2 + 22.5,
      30
    );

    //  Movement circle
    fill(200, 200, 127);
    ellipse(
      this.x + grid.squareSize / 2 - 22.5,
      this.y + grid.squareSize / 2 - 22.5,
      30
    );

    //  Attack text
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(16);
    text(
      this.stats.attack,
      this.x + grid.squareSize / 2 + 22.5,
      this.y + grid.squareSize / 2 + 22.5
    );

    //  Defense text
    text(
      this.stats.defense,
      this.x + grid.squareSize / 2 - 22.5,
      this.y + grid.squareSize / 2 + 22.5
    );

    //  Movement circle
    text(
      this.stats.currentMovement,
      this.x + grid.squareSize / 2 - 22.5,
      this.y + grid.squareSize / 2 - 22.5
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

    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }
}
