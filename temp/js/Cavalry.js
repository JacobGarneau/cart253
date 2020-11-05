class Cavalry extends Unit {
  constructor(xPos, yPos, team) {
    super(xPos, yPos, team);
    this.info = {
      type: `Cavalry`,
      description: `Mounted units with high mobility. Cavalry has high offense and average defense and can still move after attacking.`,
    };

    this.stats = {
      movement: 4,
      currentMovement: 4,
      maxAttack: 5,
      attack: 5,
      maxDefense: 3,
      defense: 3,
    };
  }

  checkMovement() {
    if (this.tileType.up === `water` || this.tileType.up === `mountains`) {
      this.movable.up = false;
    } else {
      this.movable.up = true;
    }

    if (this.tileType.down === `water` || this.tileType.down === `mountains`) {
      this.movable.down = false;
    } else {
      this.movable.down = true;
    }

    if (this.tileType.left === `water` || this.tileType.left === `mountains`) {
      this.movable.left = false;
    } else {
      this.movable.left = true;
    }

    if (
      this.tileType.right === `water` ||
      this.tileType.right === `mountains`
    ) {
      this.movable.right = false;
    } else {
      this.movable.right = true;
    }
  }
}
