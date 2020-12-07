class Cavalry extends Unit {
  constructor(xPos, yPos, team) {
    super(xPos, yPos, team);
    this.info = {
      type: `Cavalry`,
      description: `Mounted units with high mobility. Cavalry has high offense and average defense and can still move after attacking.`,
      icon: icons.cavalry,
      iconAlt: icons.cavalryAlt,
      cost: 250,
    };

    this.stats = {
      movement: 4,
      currentMovement: 4,
      maxAttack: 3,
      attack: 3,
      maxDefense: 4,
      defense: 4,
      magical: false,
    };
  }

  //  checkMovement()
  //  Prevents the cavalry unit from moving over mountain tiles
  checkMovement() {
    if (
      this.tiles.up.type === `castle` ||
      this.tiles.up.type === `church` ||
      this.tiles.up.type === `tower` ||
      this.tiles.up.type === `lair` ||
      this.tiles.up.type === `water` ||
      this.tiles.up.type === `mountains` ||
      this.tiles.up.occupied !== 0
    ) {
      this.movable.up = false;
    } else {
      this.movable.up = true;
    }

    if (
      this.tiles.down.type === `castle` ||
      this.tiles.down.type === `church` ||
      this.tiles.down.type === `tower` ||
      this.tiles.down.type === `lair` ||
      this.tiles.down.type === `water` ||
      this.tiles.down.type === `mountains` ||
      this.tiles.down.occupied !== 0
    ) {
      this.movable.down = false;
    } else {
      this.movable.down = true;
    }

    if (
      this.tiles.left.type === `castle` ||
      this.tiles.left.type === `church` ||
      this.tiles.left.type === `tower` ||
      this.tiles.left.type === `lair` ||
      this.tiles.left.type === `water` ||
      this.tiles.left.type === `mountains` ||
      this.tiles.left.occupied !== 0
    ) {
      this.movable.left = false;
    } else {
      this.movable.left = true;
    }

    if (
      this.tiles.right.type === `castle` ||
      this.tiles.right.type === `church` ||
      this.tiles.right.type === `tower` ||
      this.tiles.right.type === `lair` ||
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
