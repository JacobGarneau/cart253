class River {
  constructor() {
    this.randomX = Math.floor(random(0, grid.width / 5));
    this.xStart = (this.randomX + (grid.width / 5) * 2) * grid.squareSize;
    this.yStart = 10;
    this.xCurrent = this.xStart;
    this.yCurrent = this.yStart;

    this.position();
  }

  position() {
    let riverHeight = 0;
    for (let i = 0; riverHeight < grid.height; i++) {
      let direction;

      if (
        this.xCurrent - grid.squareSize >
          (grid.width / 5) * 2 * grid.squareSize &&
        this.xCurrent + grid.squareSize < (grid.width / 5) * 3 * grid.squareSize
      ) {
        direction = random([
          `straight`,
          `straight`,
          `straight`,
          `right`,
          `left`,
        ]);
      } else if (
        this.xCurrent - grid.squareSize <
        (grid.width / 5) * 2 * grid.squareSize
      ) {
        direction = random([`straight`, `straight`, `straight`, `right`]);
      } else if (
        this.xCurrent - grid.squareSize >
        (grid.width / 5) * 3 * grid.squareSize
      ) {
        direction = random([`straight`, `straight`, `straight`, `left`]);
      }

      if (direction === `straight`) {
        this.yCurrent += grid.squareSize;
        riverHeight++;
      } else if (direction === `right`) {
        this.xCurrent += grid.squareSize;
      } else if (direction === `left`) {
        this.xCurrent -= grid.squareSize;
      }

      this.draw();
    }
  }

  draw() {
    for (let i = 0; i < 100; i++) {
      let d = dist(this.xCurrent, this.yCurrent, tiles[i].x, tiles[i].y);
      if (d + 1 < grid.squareSize / 2) {
        tiles[i].type = `water`;
      }
    }
  }
}
