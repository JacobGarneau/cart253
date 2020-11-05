class Lord extends Unit {
  constructor(xPos, yPos, team) {
    super(xPos, yPos, team);
    this.unitType = `lord`;
    this.stats = {
      movement: 3,
      currentMovement: 3,
      maxAttack: 5,
      attack: 5,
      maxDefense: 5,
      defense: 5,
    };
  }
}
