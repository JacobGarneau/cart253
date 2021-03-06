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
    if (
      this.tiles.up.type === `water` ||
      this.tiles.up.type === `mountains` ||
      this.tiles.up.occupied !== 0
    ) {
      this.movable.up = false;
    } else {
      this.movable.up = true;
    }

    if (
      this.tiles.down.type === `water` ||
      this.tiles.down.type === `mountains` ||
      this.tiles.down.occupied !== 0
    ) {
      this.movable.down = false;
    } else {
      this.movable.down = true;
    }

    if (
      this.tiles.left.type === `water` ||
      this.tiles.left.type === `mountains` ||
      this.tiles.left.occupied !== 0
    ) {
      this.movable.left = false;
    } else {
      this.movable.left = true;
    }

    if (
      this.tiles.right.type === `water` ||
      this.tiles.right.type === `mountains` ||
      this.tiles.right.occupied !== 0
    ) {
      this.movable.right = false;
    } else {
      this.movable.right = true;
    }
  }
}
