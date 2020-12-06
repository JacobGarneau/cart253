class River {
  constructor() {
    this.randomX = Math.floor(random(0, grid.width / 5));
    this.xStart = selectSquare(this.randomX + (grid.width / 5) * 2 + 1);
    this.yStart = 10;
    this.xCurrent = this.xStart;
    this.yCurrent = this.yStart;

    this.positionRiver();
  }

  positionRiver() {
    let riverY = 0;
    let lastDirection;
    let straightness = 2;

    for (let i = 0; i < grid.height * 6; i++) {
      if (riverY < grid.height + 1) {
        let direction;

        if (
          this.xCurrent - grid.squareSize >
            (grid.width / 5) * 2 * grid.squareSize &&
          this.xCurrent + grid.squareSize <
            (grid.width / 5) * 3 * grid.squareSize
        ) {
          if (lastDirection === `left`) {
            direction = random([`straight`, `left`]);
          } else if (lastDirection === `right`) {
            direction = random([`straight`, `right`]);
          } else {
            direction = random([`straight`, `straight`, `right`, `left`]);
          }
        } else if (
          this.xCurrent - grid.squareSize <=
          selectSquare((grid.width / 5) * 2 + 1)
        ) {
          if (lastDirection === `left`) {
            direction = `straight`;
          } else {
            direction = random([`straight`, `right`]);
          }
        } else if (
          this.xCurrent + grid.squareSize >=
          selectSquare((grid.width / 5) * 3 + 1)
        ) {
          if (lastDirection === `right`) {
            direction = `straight`;
          } else {
            direction = random([`straight`, `left`]);
          }
        }

        if (straightness > 0) {
          direction = `straight`;
        }

        if (direction === `straight`) {
          this.yCurrent += grid.squareSize;
          lastDirection = `straight`;
          straightness--;
          riverY++;
          this.drawRiver();
        } else if (direction === `right`) {
          this.xCurrent += grid.squareSize;
          lastDirection = `right`;
          straightness = 2;
          this.drawRiver();
        } else if (direction === `left`) {
          this.xCurrent -= grid.squareSize;
          lastDirection = `left`;
          straightness = 2;
          this.drawRiver();
        }
      }
    }
  }

  drawRiver() {
    for (let i = 0; i < tiles.length; i++) {
      let d = dist(this.xCurrent, this.yCurrent, tiles[i].x, tiles[i].y);
      if (d - 1 < grid.squareSize) {
        tiles[i].type = `water`;
        i = tiles.length;
      }
    }
  }
}
