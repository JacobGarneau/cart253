class Heavy extends Unit {
  constructor(xPos, yPos, team) {
    super(xPos, yPos, team);
    this.unitType = `heavy`;
    this.stats = {
      movement: 2,
      currentMovement: 2,
      maxAttack: 3,
      attack: 3,
      maxDefense: 5,
      defense: 5,
    };
  }
}
