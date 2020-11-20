class Heavy extends Unit {
  constructor(xPos, yPos, team) {
    super(xPos, yPos, team);
    this.info = {
      type: `Heavy Infantry`,
      description: `Infantry clad in heavy armor. Heavy units have low offense but very high defense and reduce the damage of all received attacks by 1.`,
      icon: icons.heavy,
    };

    this.stats = {
      movement: 2,
      currentMovement: 2,
      maxAttack: 2,
      attack: 2,
      maxDefense: 5,
      defense: 5,
      magical: false,
    };
  }

  takeDamage(amount, magic) {
    if (magic) {
      this.stats.defense -= amount;
    } else {
      this.stats.defense -= amount - 1;
    }
  }
}
