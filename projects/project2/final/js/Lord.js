class Lord extends Unit {
  constructor(xPos, yPos, team) {
    super(xPos, yPos, team);
    this.info = {
      type: `Lord`,
      description: `A noble leading his personal guard into battle. Lords have high offense and defense but cannot be purchased, so you should think twice before sending them out on the battlefield. They can capture neutral or enemy structures.`,
      icon: icons.lord,
      cost: 300,
    };

    this.stats = {
      movement: 3,
      currentMovement: 3,
      maxAttack: 4,
      attack: 4,
      maxDefense: 9,
      defense: 9,
      magical: false,
    };

    this.conquerable = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
  }

  checkConquest() {
    if (
      this.selected &&
      (this.tiles.up.type === `castle` ||
        this.tiles.up.type === `church` ||
        this.tiles.up.type === `tower` ||
        this.tiles.up.type === `lair`)
    ) {
      this.conquerable.up = true;
    } else {
      this.conquerable.up = false;
    }

    if (
      this.selected &&
      (this.tiles.down.type === `castle` ||
        this.tiles.down.type === `church` ||
        this.tiles.down.type === `tower` ||
        this.tiles.down.type === `lair`)
    ) {
      this.conquerable.down = true;
    } else {
      this.conquerable.down = false;
    }

    if (
      this.selected &&
      (this.tiles.left.type === `castle` ||
        this.tiles.left.type === `church` ||
        this.tiles.left.type === `tower` ||
        this.tiles.left.type === `lair`)
    ) {
      this.conquerable.left = true;
    } else {
      this.conquerable.left = false;
    }

    if (
      this.selected &&
      (this.tiles.right.type === `castle` ||
        this.tiles.right.type === `church` ||
        this.tiles.right.type === `tower` ||
        this.tiles.right.type === `lair`)
    ) {
      this.conquerable.right = true;
    } else {
      this.conquerable.right = false;
    }
  }

  displayConquest() {
    if (this.conquerable.up && this.controllable) {
      push();
      rectMode(CENTER);
      if (this.team === 1) {
        fill(colors.blue.r, colors.blue.g, colors.blue.b, 100);
      } else if (this.team === 2) {
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
        icons.conquest,
        this.x + grid.squareSize / 2,
        this.y + grid.squareSize / 2 - grid.squareSize,
        grid.squareSize / 1.5,
        grid.squareSize / 1.5
      );
      pop();
    }

    if (this.conquerable.down && this.controllable) {
      push();
      rectMode(CENTER);
      if (this.team === 1) {
        fill(colors.blue.r, colors.blue.g, colors.blue.b, 100);
      } else if (this.team === 2) {
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
        icons.conquest,
        this.x + grid.squareSize / 2,
        this.y + grid.squareSize / 2 + grid.squareSize,
        grid.squareSize / 1.5,
        grid.squareSize / 1.5
      );
      pop();
    }

    if (this.conquerable.left && this.controllable) {
      push();
      rectMode(CENTER);
      if (this.team === 1) {
        fill(colors.blue.r, colors.blue.g, colors.blue.b, 100);
      } else if (this.team === 2) {
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
        icons.conquest,
        this.x + grid.squareSize / 2 - grid.squareSize,
        this.y + grid.squareSize / 2,
        grid.squareSize / 1.5,
        grid.squareSize / 1.5
      );
      pop();
    }

    if (this.conquerable.right && this.controllable) {
      push();
      rectMode(CENTER);
      if (this.team === 1) {
        fill(colors.blue.r, colors.blue.g, colors.blue.b, 100);
      } else if (this.team === 2) {
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
        icons.conquest,
        this.x + grid.squareSize / 2 + grid.squareSize,
        this.y + grid.squareSize / 2,
        grid.squareSize / 1.5,
        grid.squareSize / 1.5
      );
      pop();
    }
  }

  conquer() {
    let dX = dist(mouseX, 0, this.x + grid.squareSize / 2, 0);
    let dY = dist(0, mouseY, 0, this.y + grid.squareSize / 2);

    if (
      dY < grid.squareSize * 1.5 &&
      dY > grid.squareSize * 0.5 &&
      dX < grid.squareSize * 0.5 &&
      mouseY < this.y &&
      mouseX > this.x &&
      this.conquerable.up
    ) {
      for (let i = 0; i < tiles.length; i++) {
        let d = dist(tiles[i].x, tiles[i].y, this.x, this.y);
        if (
          d <= grid.squareSize * 1.5 + 1 &&
          tiles[i].y < this.y &&
          tiles[i].x <= this.x + 1 &&
          tiles[i].x >= this.x - 1 &&
          (tiles[i].type === `castle` ||
            tiles[i].type === `church` ||
            tiles[i].type === `tower` ||
            tiles[i].type === `lair`)
        ) {
          this.conquerStructure(tiles[i]);
          this.endTurn();
        }
      }
    }

    if (
      dY < grid.squareSize * 1.5 &&
      dY > grid.squareSize * 0.5 &&
      dX < grid.squareSize * 0.5 &&
      mouseY > this.y &&
      mouseX > this.x &&
      this.conquerable.down
    ) {
      for (let i = 0; i < tiles.length; i++) {
        let d = dist(tiles[i].x, tiles[i].y, this.x, this.y);
        if (
          d <= grid.squareSize * 1.5 + 1 &&
          tiles[i].y > this.y &&
          tiles[i].x <= this.x + 1 &&
          tiles[i].x >= this.x - 1 &&
          (tiles[i].type === `castle` ||
            tiles[i].type === `church` ||
            tiles[i].type === `tower` ||
            tiles[i].type === `lair`)
        ) {
          this.conquerStructure(tiles[i]);
          this.endTurn();
        }
      }
    }

    if (
      dX < grid.squareSize * 1.5 &&
      dX > grid.squareSize * 0.5 &&
      dY < grid.squareSize * 0.5 &&
      mouseX < this.x &&
      mouseY > this.y &&
      this.conquerable.left
    ) {
      for (let i = 0; i < tiles.length; i++) {
        let d = dist(tiles[i].x, tiles[i].y, this.x, this.y);
        if (
          d <= grid.squareSize * 1.5 + 1 &&
          tiles[i].x < this.x &&
          tiles[i].y <= this.y + 1 &&
          tiles[i].y >= this.y - 1 &&
          (tiles[i].type === `castle` ||
            tiles[i].type === `church` ||
            tiles[i].type === `tower` ||
            tiles[i].type === `lair`)
        ) {
          this.conquerStructure(tiles[i]);
          this.endTurn();
        }
      }
    }

    if (
      dX < grid.squareSize * 1.5 &&
      dX > grid.squareSize * 0.5 &&
      dY < grid.squareSize * 0.5 &&
      mouseX > this.x &&
      mouseY > this.y &&
      this.conquerable.right
    ) {
      for (let i = 0; i < tiles.length; i++) {
        let d = dist(tiles[i].x, tiles[i].y, this.x, this.y);
        if (
          d <= grid.squareSize * 1.5 + 1 &&
          tiles[i].x > this.x &&
          tiles[i].y <= this.y + 1 &&
          tiles[i].y >= this.y - 1 &&
          (tiles[i].type === `castle` ||
            tiles[i].type === `church` ||
            tiles[i].type === `tower` ||
            tiles[i].type === `lair`)
        ) {
          this.conquerStructure(tiles[i]);
          this.endTurn();
        }
      }
    }
  }

  conquerStructure(target) {
    if (this.team === 1) {
      players[1].structures = players[1].structures.filter(
        (e) => e !== target.type
      );

      if (target.type === `church`) {
        for (let i = 0; i < unitTypes.length; i++) {
          if (unitTypes[i].info.type === `Priests`) {
            players[1].buyable = players[1].buyable.filter(
              (e) => e !== unitTypes[i]
            );
          }
        }
      } else if (target.type === `tower`) {
        for (let i = 0; i < unitTypes.length; i++) {
          if (unitTypes[i].info.type === `Mages`) {
            players[1].buyable = players[1].buyable.filter(
              (e) => e !== unitTypes[i]
            );
          }
        }
      } else if (target.type === `lair`) {
        for (let i = 0; i < unitTypes.length; i++) {
          if (unitTypes[i].info.type === `Dragon Riders`) {
            players[1].buyable = players[1].buyable.filter(
              (e) => e !== unitTypes[i]
            );
          }
        }
      }

      if (target.structureTeam === 3) {
        target.structureTeam = 1;
        players[this.team - 1].structures.push(target.type);
        players[1].currency += conquestReward;

        if (target.type === `church`) {
          for (let i = 0; i < unitTypes.length; i++) {
            if (unitTypes[i].info.type === `Priests`) {
              players[this.team - 1].buyable.push(unitTypes[i]);
            }
          }
        } else if (target.type === `tower`) {
          for (let i = 0; i < unitTypes.length; i++) {
            if (unitTypes[i].info.type === `Mages`) {
              players[this.team - 1].buyable.push(unitTypes[i]);
            }
          }
        } else if (target.type === `lair`) {
          for (let i = 0; i < unitTypes.length; i++) {
            if (unitTypes[i].info.type === `Dragon Riders`) {
              players[this.team - 1].buyable.push(unitTypes[i]);
            }
          }
        }
      } else if (target.structureTeam === 2) {
        target.structureTeam = 3;
      }
    } else {
      if (this.team === 2) {
        players[0].structures = players[0].structures.filter(
          (e) => e !== target.type
        );

        if (target.type === `church`) {
          for (let i = 0; i < unitTypes.length; i++) {
            if (unitTypes[i].info.type === `Priests`) {
              players[0].buyable = players[0].buyable.filter(
                (e) => e !== unitTypes[i]
              );
            }
          }
        } else if (target.type === `tower`) {
          for (let i = 0; i < unitTypes.length; i++) {
            if (unitTypes[i].info.type === `Mages`) {
              players[0].buyable = players[0].buyable.filter(
                (e) => e !== unitTypes[i]
              );
            }
          }
        } else if (target.type === `lair`) {
          for (let i = 0; i < unitTypes.length; i++) {
            if (unitTypes[i].info.type === `Dragon Riders`) {
              players[0].buyable = players[0].buyable.filter(
                (e) => e !== unitTypes[i]
              );
            }
          }
        }

        if (target.structureTeam === 3) {
          target.structureTeam = 2;
          players[this.team - 1].structures.push(target.type);
          players[0].currency += conquestReward;

          if (target.type === `church`) {
            for (let i = 0; i < unitTypes.length; i++) {
              if (unitTypes[i].info.type === `Priests`) {
                players[this.team - 1].buyable.push(unitTypes[i]);
              }
            }
          } else if (target.type === `tower`) {
            for (let i = 0; i < unitTypes.length; i++) {
              if (unitTypes[i].info.type === `Mages`) {
                players[this.team - 1].buyable.push(unitTypes[i]);
              }
            }
          } else if (target.type === `lair`) {
            for (let i = 0; i < unitTypes.length; i++) {
              if (unitTypes[i].info.type === `Dragon Riders`) {
                players[this.team - 1].buyable.push(unitTypes[i]);
              }
            }
          }
        } else if (target.structureTeam === 1) {
          target.structureTeam = 3;
        }
      }
    }
  }

  //  Prevents turn from ending if conquerable structure is nearby
  animateMovement() {
    this.stats.currentMovement--;
    this.controllable = false;

    let timeoutDelay = (grid.squareSize / unitSpeed / 60) * 1000;
    setTimeout(() => {
      this.x = this.destinationX;
      this.y = this.destinationY;
      this.controllable = true;
      let banditRoll = random(0, 100);
      if (
        banditRoll <= banditChance &&
        this.tiles.current.type === `forest` &&
        this.banditEncounters
      ) {
        popup.active = `bandits`;
        banditTarget = this;
      }

      if (this.stats.currentMovement === 0) {
        if (
          !this.attackable.up &&
          !this.attackable.down &&
          !this.attackable.left &&
          !this.attackable.right &&
          !this.conquerable.up &&
          !this.conquerable.down &&
          !this.conquerable.left &&
          !this.conquerable.right
        ) {
          this.endTurn();
        }
      }
    }, timeoutDelay);
  }
}
