class Structure {
  constructor(type, team) {
    this.type = type; //  castle, mageTower, church, dragonLair
    this.team = team;
    if (this.type === `castle`) {
      if (this.team === 1) {
        this.x = selectSquare(2 + 1);
        this.y = road.yStart;
        blueY = this.y;
      } else if (this.team === 2) {
        this.x = selectSquare(grid.width);
        this.y = road.yCurrent;
        redY = this.y;
      }
    }

    if (this.type === `church`) {
      let randomX = random(0, grid.height / 5);
      let randomY = random(0, grid.height / 3);
      this.x = selectSquare(randomX + (grid.width / 5) * 2.2 + 1);
      this.y = selectSquare(randomY + grid.height / 3 + 2);
    }

    //  Give random sides to the mage tower and the dragon lair
    let side = random([`left`, `right`]);

    if (this.type === `tower`) {
      let randomX =
        grid.squareSize + random(0, grid.height / 5) * grid.squareSize;
      let randomY = random(0, grid.height / 3);

      if (side === `left`) {
        this.x = 10 + 4 * grid.squareSize + randomX;
        this.y = selectSquare(randomY + (2 * grid.height) / 3 + 2);
      } else if (side === `right`) {
        this.x =
          grid.width * grid.squareSize - (10 + 3 * grid.squareSize + randomX);
        this.y = selectSquare(randomY + 2);
      }
    }

    if (this.type === `lair`) {
      let randomX =
        grid.squareSize + random(0, grid.height / 5) * grid.squareSize;
      let randomY = random(0, grid.height / 3);

      if (tower.x > width / 2) {
        this.x = 10 + 4 * grid.squareSize + randomX;
        this.y = selectSquare(randomY + (2 * grid.height) / 3 + 2);
      } else if (tower.x <= width / 2) {
        this.x =
          grid.width * grid.squareSize - (10 + 3 * grid.squareSize + randomX);
        this.y = selectSquare(randomY + 2);
      }
    }
  }

  display() {
    for (let i = 0; i < tiles.length; i++) {
      if (this.type === `castle`) {
        let d = dist(
          this.x - grid.squareSize,
          this.y - grid.squareSize / 2.5,
          tiles[i].x,
          tiles[i].y
        );

        if (d < grid.squareSize * 1.75) {
          tiles[i].type = `plains`;
        }
      }

      let d = dist(this.x, this.y, tiles[i].x, tiles[i].y);
      if (
        this.type === `church` ||
        this.type === `tower` ||
        this.type === `lair`
      ) {
        if (
          d - 1 < grid.squareSize * 2 &&
          tiles[i].type !== `water` &&
          tiles[i].type !== `road` &&
          tiles[i].type !== `bridge`
        ) {
          tiles[i].type = this.type;
          if (tiles[i].structureTeam === undefined) {
            tiles[i].structureTeam = this.team;
          }
          i = tiles.length;
        }
      }
    }

    for (let i = 0; i < tiles.length; i++) {
      if (this.type === `castle`) {
        let d = dist(this.x, this.y, tiles[i].x, tiles[i].y);
        if (d - 1 < grid.squareSize) {
          tiles[i].type = this.type;
          if (tiles[i].structureTeam === undefined) {
            tiles[i].structureTeam = this.team;
          }
          i = tiles.length;
        }
      }
    }
  }
}
