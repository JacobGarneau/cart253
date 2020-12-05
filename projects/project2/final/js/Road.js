class Road {
  constructor() {
    this.randomY = Math.floor(random(0, grid.height / 3));
    this.yStart = selectSquare(this.randomY + grid.height / 3 + 2);
    this.xStart = 10 + 2 * grid.squareSize;
    this.xCurrent = this.xStart;
    this.yCurrent = this.yStart;

    this.positionRoad();
  }

  positionRoad() {
    let roadX = 0;
    let lastDirection;
    let straightness = 2;

    for (let i = 0; i < grid.width * 6; i++) {
      if (roadX < grid.width - 5) {
        let direction;

        if (
          this.yCurrent - grid.squareSize > selectSquare(grid.height / 3 + 2) &&
          this.yCurrent + grid.squareSize <
            selectSquare((grid.height / 3) * 2 + 2)
        ) {
          if (lastDirection === `up`) {
            direction = random([`straight`, `straight`, `up`, `up`]);
          } else if (lastDirection === `down`) {
            direction = random([`straight`, `straight`, `down`, `right`]);
          } else {
            direction = random([`straight`, `straight`, `down`, `up`]);
          }
        } else if (
          this.yCurrent - grid.squareSize <=
          selectSquare(grid.height / 3 + 2)
        ) {
          if (lastDirection === `up`) {
            direction = `straight`;
          } else {
            direction = random([`straight`, `straight`, `down`, `down`]);
          }
        } else if (
          this.yCurrent + grid.squareSize >=
          selectSquare((grid.height / 3) * 2 + 2)
        ) {
          if (lastDirection === `down`) {
            direction = `straight`;
          } else {
            direction = random([`straight`, `straight`, `up`, `up`]);
          }
        }

        if (straightness > 0) {
          direction = `straight`;
        }

        if (direction === `straight`) {
          this.xCurrent += grid.squareSize;
          lastDirection = `straight`;
          straightness--;
          roadX++;
          this.drawRoad();
        } else if (direction === `down`) {
          this.yCurrent += grid.squareSize;
          lastDirection = `down`;
          straightness = 2;
          this.drawRoad();
        } else if (direction === `up`) {
          this.yCurrent -= grid.squareSize;
          lastDirection = `up`;
          straightness = 2;
          this.drawRoad();
        }
      }
    }
  }

  drawRoad() {
    for (let i = 0; i < tiles.length; i++) {
      let d = dist(this.xCurrent, this.yCurrent, tiles[i].x, tiles[i].y);
      if (d + 1 < grid.squareSize / 2) {
        if (tiles[i].type === `water`) {
          tiles[i].type = `bridge`;
        } else {
          tiles[i].type = `road`;
        }
      }
    }
  }
}
