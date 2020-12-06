class Tile {
  constructor(x, y, type) {
    this.x = selectSquare(x + 1) + marginX;
    this.y = selectSquare(y + 1) + menuHeight;
    this.type = type;
    this.structureTeam;
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
    } else if (this.type === `castle`) {
      this.icon = icons.castle;
      this.defineStructure();
    } else if (this.type === `church`) {
      this.icon = icons.church;
      this.defineStructure();
    } else if (this.type === `tower`) {
      this.icon = icons.tower;
      this.defineStructure();
    } else if (this.type === `lair`) {
      this.icon = icons.lair;
      this.defineStructure();
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

  defineStructure() {
    if (this.structureTeam === 1) {
      fill(colors.blue.r, colors.blue.g, colors.blue.b);
    } else if (this.structureTeam === 2) {
      fill(colors.red.r, colors.red.g, colors.red.b);
    } else if (this.structureTeam === 3) {
      fill(colors.purple.r, colors.purple.g, colors.purple.b);
    }
  }
}
