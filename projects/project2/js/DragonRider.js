class DragonRider extends Unit {
  constructor(xPos, yPos, team) {
    super(xPos, yPos, team);
    this.unitType = `dragonRider`;
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
    this.movable.up = true;
    this.movable.down = true;
    this.movable.left = true;
    this.movable.right = true;
  }
}
