class Lord extends Unit {
  constructor(xPos, yPos, team) {
    super(xPos, yPos, team);
    this.info = {
      type: `Lord`,
      description: `A noble leading his personal guard into battle. Lords have high offense and defense but cannot be purchased, so you should think twice before sending them out on the battlefield. They can capture neutral or enemy structures.`,
      icon: icons.lord,
    };

    this.stats = {
      movement: 3,
      currentMovement: 3,
      maxAttack: 4,
      attack: 4,
      maxDefense: 9,
      defense: 9,
      magical: false,
    };
  }
}
