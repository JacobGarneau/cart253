class Infantry extends Unit {
  constructor(xPos, yPos, team) {
    super(xPos, yPos, team);
    this.info = {
      type: `Infantry`,
      description: `Standard foot soldiers. With well-rounded stats and high versatility, infantry is the bread and butter of any army.`,
    };

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
