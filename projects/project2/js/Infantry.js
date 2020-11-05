class Infantry extends Unit {
  constructor(xPos, yPos, team) {
    super(xPos, yPos, team);
    this.unitType = `infantry`;
    this.stats = {
      movement: 3,
      currentMovement: 3,
      maxAttack: 4,
      attack: 4,
      maxDefense: 4,
      defense: 4,
    };
  }
}
