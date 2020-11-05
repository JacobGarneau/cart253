class Heavy extends Unit {
  constructor(xPos, yPos, team) {
    super(xPos, yPos, team);
    this.info = {
      type: `Heavy`,
      description: `Infantry clad in heavy armor. Heavy units have low offense but very high defense and reduce the damage of all received attacks by 1.`,
    };

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
