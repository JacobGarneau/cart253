class Tile {
  constructor(x, y, type) {
    this.x = selectSquare(x + 1) + marginX;
    this.y = selectSquare(y + 1) + menuHeight;
    this.type = type;
    this.structureTeam;
    this.occupied = 0; //  0 (no unit), 1 (player1 unit), 2 (player2 unit), 3 (neutral unit)
    this.icon;
    this.spawnpoint = false;
    this.tiles = {
      current: undefined,
      up: undefined,
      down: undefined,
      left: undefined,
      right: undefined,
    };
  }

  //  display()
  //  Displays the tile as part of the map
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

  //  defineStructure()
  //  Defines additional parameters if the tile's type is a structure
  defineStructure() {
    if (this.structureTeam === 1) {
      fill(colors.blue.r, colors.blue.g, colors.blue.b);
    } else if (this.structureTeam === 2) {
      fill(colors.red.r, colors.red.g, colors.red.b);
    } else if (this.structureTeam === 3) {
      fill(colors.purple.r, colors.purple.g, colors.purple.b);
    }
  }

  //  checkSurroundings()
  //  Handles tile type assignment for new unit spawning
  checkSurroundings() {
    this.assignTileType();
    this.spawnpoint = true;
  }

  //  displaySpawnpoints()
  //  Displays the available spawpoints for new units
  displaySpawnpoints() {
    if (this.tiles.up !== undefined) {
      console.log("not undefined");
      if (
        (this.tiles.up.occupied === 0 &&
          this.tiles.up.type !== `water` &&
          this.tiles.up.type !== `castle` &&
          this.tiles.up.type !== `tower` &&
          this.tiles.up.type !== `church` &&
          this.tiles.up.type !== `lair`) ||
        (spawningUnit.info.type === `Dragon Riders` &&
          this.tiles.up.type === `water`)
      ) {
        if (
          spawningUnit.info.type === `Cavalry` &&
          this.tiles.up.type === `mountains`
        ) {
        } else {
          push();
          rectMode(CENTER);
          if (currentTurn === 1) {
            fill(colors.blue.r, colors.blue.g, colors.blue.b, 100);
          } else if (currentTurn === 2) {
            fill(colors.red.r, colors.red.g, colors.red.b, 100);
          }
          rect(
            this.x + grid.squareSize / 2,
            this.y + grid.squareSize / 2 - grid.squareSize,
            grid.squareSize,
            grid.squareSize
          );
          imageMode(CENTER);
          image(
            spawningUnit.info.icon,
            this.x + grid.squareSize / 2,
            this.y + grid.squareSize / 2 - grid.squareSize,
            grid.squareSize / 1.5,
            grid.squareSize / 1.5
          );
          pop();
        }
      }
    } else {
      console.log(`undefined`);
    }

    if (this.tiles.down !== undefined) {
      if (
        (this.tiles.down.occupied === 0 &&
          this.tiles.down.type !== `water` &&
          this.tiles.down.type !== `castle` &&
          this.tiles.down.type !== `tower` &&
          this.tiles.down.type !== `church` &&
          this.tiles.down.type !== `lair`) ||
        (spawningUnit.info.type === `Dragon Riders` &&
          this.tiles.down.type === `water`)
      ) {
        if (
          spawningUnit.info.type === `Cavalry` &&
          this.tiles.down.type === `mountains`
        ) {
        } else {
          push();
          rectMode(CENTER);
          if (currentTurn === 1) {
            fill(colors.blue.r, colors.blue.g, colors.blue.b, 100);
          } else if (currentTurn === 2) {
            fill(colors.red.r, colors.red.g, colors.red.b, 100);
          }
          rect(
            this.x + grid.squareSize / 2,
            this.y + grid.squareSize / 2 + grid.squareSize,
            grid.squareSize,
            grid.squareSize
          );
          imageMode(CENTER);
          image(
            spawningUnit.info.icon,
            this.x + grid.squareSize / 2,
            this.y + grid.squareSize / 2 + grid.squareSize,
            grid.squareSize / 1.5,
            grid.squareSize / 1.5
          );
          pop();
        }
      }
    }

    if (this.tiles.left !== undefined) {
      if (
        (this.tiles.left.occupied === 0 &&
          this.tiles.left.type !== `water` &&
          this.tiles.left.type !== `castle` &&
          this.tiles.left.type !== `tower` &&
          this.tiles.left.type !== `church` &&
          this.tiles.left.type !== `lair`) ||
        (spawningUnit.info.type === `Dragon Riders` &&
          this.tiles.left.type === `water`)
      ) {
        if (
          spawningUnit.info.type === `Cavalry` &&
          this.tiles.left.type === `mountains`
        ) {
        } else {
          push();
          rectMode(CENTER);
          if (currentTurn === 1) {
            fill(colors.blue.r, colors.blue.g, colors.blue.b, 100);
          } else if (currentTurn === 2) {
            fill(colors.red.r, colors.red.g, colors.red.b, 100);
          }
          rect(
            this.x + grid.squareSize / 2 - grid.squareSize,
            this.y + grid.squareSize / 2,
            grid.squareSize,
            grid.squareSize
          );
          imageMode(CENTER);
          image(
            spawningUnit.info.icon,
            this.x + grid.squareSize / 2 - grid.squareSize,
            this.y + grid.squareSize / 2,
            grid.squareSize / 1.5,
            grid.squareSize / 1.5
          );
          pop();
        }
      }
    }

    if (this.tiles.right !== undefined) {
      if (
        (this.tiles.right !== undefined &&
          this.tiles.right.occupied === 0 &&
          this.tiles.right.type !== `water` &&
          this.tiles.right.type !== `castle` &&
          this.tiles.right.type !== `tower` &&
          this.tiles.right.type !== `church` &&
          this.tiles.right.type !== `lair`) ||
        (this.tiles.right !== undefined &&
          spawningUnit.info.type === `Dragon Riders` &&
          this.tiles.right.type === `water`)
      ) {
        if (
          spawningUnit.info.type === `Cavalry` &&
          this.tiles.right.type === `mountains`
        ) {
        } else {
          push();
          rectMode(CENTER);
          if (currentTurn === 1) {
            fill(colors.blue.r, colors.blue.g, colors.blue.b, 100);
          } else if (currentTurn === 2) {
            fill(colors.red.r, colors.red.g, colors.red.b, 100);
          }
          rect(
            this.x + grid.squareSize / 2 + grid.squareSize,
            this.y + grid.squareSize / 2,
            grid.squareSize,
            grid.squareSize
          );
          imageMode(CENTER);
          image(
            spawningUnit.info.icon,
            this.x + grid.squareSize / 2 + grid.squareSize,
            this.y + grid.squareSize / 2,
            grid.squareSize / 1.5,
            grid.squareSize / 1.5
          );
          pop();
        }
      }
    }
  }

  //  assignTileType()
  //  Determines the type of the tiles surrounding this one
  assignTileType() {
    //  Assign their tile's type to the units
    for (let i = 0; i < tiles.length; i++) {
      //  Current tile
      let d = dist(this.x, this.y, tiles[i].x, tiles[i].y);
      if (d <= unitSpeed) {
        this.tiles.current = tiles[i];
      }

      //  Up tile
      d = dist(this.x, this.y - grid.squareSize, tiles[i].x, tiles[i].y);
      if (d <= unitSpeed) {
        this.tiles.up = tiles[i];
      }

      //  Down tile
      d = dist(this.x, this.y + grid.squareSize, tiles[i].x, tiles[i].y);
      if (d <= unitSpeed) {
        this.tiles.down = tiles[i];
      }

      //  Left tile
      d = dist(this.x - grid.squareSize, this.y, tiles[i].x, tiles[i].y);
      if (d <= unitSpeed) {
        this.tiles.left = tiles[i];
      }

      //  Right tile
      d = dist(this.x + grid.squareSize, this.y, tiles[i].x, tiles[i].y);
      if (d <= unitSpeed) {
        this.tiles.right = tiles[i];
      }
    }
  }

  //  spawn()
  //  Handles new unit spawning
  spawn(up, down, left, right) {
    let dX = dist(mouseX, 0, this.x + grid.squareSize / 2, 0);
    let dY = dist(0, mouseY, 0, this.y + grid.squareSize / 2);

    if (
      dY < grid.squareSize * 1.5 &&
      dY > grid.squareSize * 0.5 &&
      dX < grid.squareSize * 0.5 &&
      mouseY < this.y &&
      mouseX > this.x &&
      ((up.occupied === 0 &&
        up.type !== `water` &&
        up.type !== `castle` &&
        up.type !== `tower` &&
        up.type !== `church` &&
        up.type !== `lair`) ||
        (spawningUnit.info.type === `Dragon Riders` && up.type === `water`))
    ) {
      if (spawningUnit.info.type === `Cavalry` && up.type === `mountains`) {
      } else {
        for (let i = 0; i < tiles.length; i++) {
          let d = dist(tiles[i].x, tiles[i].y, this.x, this.y);
          if (
            d <= grid.squareSize * 1.5 + 1 &&
            tiles[i].y < this.y &&
            tiles[i].x <= this.x + 1 &&
            tiles[i].x >= this.x - 1
          ) {
            this.createUnit(tiles[i].x, tiles[i].y);
          }
        }
      }
    }

    if (
      dY < grid.squareSize * 1.5 &&
      dY > grid.squareSize * 0.5 &&
      dX < grid.squareSize * 0.5 &&
      mouseY > this.y &&
      mouseX > this.x &&
      ((down.occupied === 0 &&
        down.type !== `water` &&
        down.type !== `castle` &&
        down.type !== `tower` &&
        down.type !== `church` &&
        down.type !== `lair`) ||
        (spawningUnit.info.type === `Dragon Riders` && down.type === `water`))
    ) {
      if (spawningUnit.info.type === `Cavalry` && down.type === `mountains`) {
      } else {
        for (let i = 0; i < tiles.length; i++) {
          let d = dist(tiles[i].x, tiles[i].y, this.x, this.y);
          if (
            d <= grid.squareSize * 1.5 + 1 &&
            tiles[i].y > this.y &&
            tiles[i].x <= this.x + 1 &&
            tiles[i].x >= this.x - 1
          ) {
            this.createUnit(tiles[i].x, tiles[i].y);
          }
        }
      }
    }

    if (
      dX < grid.squareSize * 1.5 &&
      dX > grid.squareSize * 0.5 &&
      dY < grid.squareSize * 0.5 &&
      mouseX < this.x &&
      mouseY > this.y &&
      ((left.occupied === 0 &&
        left.type !== `water` &&
        left.type !== `castle` &&
        left.type !== `tower` &&
        left.type !== `church` &&
        left.type !== `lair`) ||
        (spawningUnit.info.type === `Dragon Riders` && left.type === `water`))
    ) {
      if (spawningUnit.info.type === `Cavalry` && left.type === `mountains`) {
      } else {
        for (let i = 0; i < tiles.length; i++) {
          let d = dist(tiles[i].x, tiles[i].y, this.x, this.y);
          if (
            d <= grid.squareSize * 1.5 + 1 &&
            tiles[i].x < this.x &&
            tiles[i].y <= this.y + 1 &&
            tiles[i].y >= this.y - 1
          ) {
            this.createUnit(tiles[i].x, tiles[i].y);
          }
        }
      }
    }

    if (
      dX < grid.squareSize * 1.5 &&
      dX > grid.squareSize * 0.5 &&
      dY < grid.squareSize * 0.5 &&
      mouseX > this.x &&
      mouseY > this.y &&
      ((right.occupied === 0 &&
        right.type !== `water` &&
        right.type !== `castle` &&
        right.type !== `tower` &&
        right.type !== `church` &&
        right.type !== `lair`) ||
        (spawningUnit.info.type === `Dragon Riders` && right.type === `water`))
    ) {
      if (spawningUnit.info.type === `Cavalry` && right.type === `mountains`) {
      } else {
        for (let i = 0; i < tiles.length; i++) {
          let d = dist(tiles[i].x, tiles[i].y, this.x, this.y);
          if (
            d <= grid.squareSize * 1.5 + 1 &&
            tiles[i].x > this.x &&
            tiles[i].y <= this.y + 1 &&
            tiles[i].y >= this.y - 1
          ) {
            this.createUnit(tiles[i].x, tiles[i].y);
          }
        }
      }
    }
  }

  //  createUnit(x, y)
  //  Places the new unit on the map
  createUnit(x, y) {
    for (let i = 0; i < units.length; i++) {
      units[i].selected = false;
      selectionActive = false;
    }
    if (currentTurn === 1) {
      players[1].currency -= spawningUnit.info.cost;
    } else if (currentTurn === 2) {
      players[0].currency -= spawningUnit.info.cost;
    }

    let newUnit;
    if (spawningUnit.info.type === `Infantry`) {
      newUnit = new Infantry(x - marginX, y - menuHeight, currentTurn);
    } else if (spawningUnit.info.type === `Cavalry`) {
      newUnit = new Cavalry(x - marginX, y - menuHeight, currentTurn);
    } else if (spawningUnit.info.type === `Archers`) {
      newUnit = new Archer(x - marginX, y - menuHeight, currentTurn);
    } else if (spawningUnit.info.type === `Heavies`) {
      newUnit = new Heavy(x - marginX, y - menuHeight, currentTurn);
    } else if (spawningUnit.info.type === `Mages`) {
      newUnit = new Mage(x - marginX, y - menuHeight, currentTurn);
    } else if (spawningUnit.info.type === `Priests`) {
      newUnit = new Priest(x - marginX, y - menuHeight, currentTurn);
    } else if (spawningUnit.info.type === `Dragon Riders`) {
      newUnit = new DragonRider(x - marginX, y - menuHeight, currentTurn);
    }

    units.push(newUnit);
    choosingSpawn = false;
    for (let i = 0; i < tiles.length; i++) {
      tiles[i].spawnpoint = false;
    }
  }
}
