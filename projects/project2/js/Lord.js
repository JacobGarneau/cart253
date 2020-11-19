class Lord extends Unit {
  constructor(xPos, yPos, team) {
    super(xPos, yPos, team);
    this.info = {
      type: `Lord`,
      description: `A noble leading his personal guard into battle. Lords have high offense and defense but cannot be purchased, so you should think twice before sending them out on the battlefield. They can inspire nearby allies to temporarily increase their offense by 1.`,
      icon: icons.lord,
    };

    this.stats = {
      movement: 3,
      currentMovement: 3,
      maxAttack: 5,
      attack: 5,
      maxDefense: 5,
      defense: 5,
      magical: false,
    };
  }
}
