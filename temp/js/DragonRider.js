class DragonRider extends Unit {
  constructor(xPos, yPos, team) {
    super(xPos, yPos, team);
    this.info = {
      type: `Dragon Riders`,
      description: `Valorous knights mounted on fierce creatures. Dragon Riders have high offense and average defense, can move after attacking and are not hindered by water, mountains or forests. However, they take additional damage from archers.`,
    };

    this.banditEncounters = false;
    this.stats = {
      movement: 5,
      currentMovement: 5,
      maxAttack: 5,
      attack: 5,
      maxDefense: 3,
      defense: 3,
    };
  }

  checkMovement() {
    if (this.tiles.up.occupied !== 0) {
      this.movable.up = false;
    } else {
      this.movable.up = true;
    }

    if (this.tiles.down.occupied !== 0) {
      this.movable.down = false;
    } else {
      this.movable.down = true;
    }

    if (this.tiles.left.occupied !== 0) {
      this.movable.left = false;
    } else {
      this.movable.left = true;
    }

    if (this.tiles.right.occupied !== 0) {
      this.movable.right = false;
    } else {
      this.movable.right = true;
    }
  }
}
