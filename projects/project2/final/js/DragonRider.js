class DragonRider extends Unit {
  constructor(xPos, yPos, team) {
    super(xPos, yPos, team);
    this.info = {
      type: `Dragon Riders`,
      description: `Valorous knights mounted on fierce creatures. Dragon Riders have high offense and average defense, can move after attacking and are not hindered by water, mountains or forests. However, they take additional damage from archers.`,
      icon: icons.dragon,
      iconAlt: icons.dragonAlt,
      cost: 450,
    };

    this.banditEncounters = false;
    this.stats = {
      movement: 4,
      currentMovement: 4,
      maxAttack: 4,
      attack: 4,
      maxDefense: 4,
      defense: 4,
      magical: false,
    };
  }

  //  checkMovement()
  //  Allows the Dragon Rider unit to move over any type of tile except for structures
  checkMovement() {
    if (
      this.tiles.up.type === `castle` ||
      this.tiles.up.type === `church` ||
      this.tiles.up.type === `tower` ||
      this.tiles.up.type === `lair` ||
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
      this.tiles.right.occupied !== 0
    ) {
      this.movable.right = false;
    } else {
      this.movable.right = true;
    }
  }
}
