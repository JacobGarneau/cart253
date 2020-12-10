class Heavy extends Unit {
  constructor(xPos, yPos, team) {
    super(xPos, yPos, team);
    this.info = {
      type: `Heavies`,
      description: `Infantry clad in heavy armor.\n\nHeavy units have low offense but very high defense\nand reduce the damage of all nonmagical attacks by 2.`,
      icon: icons.heavy,
      iconAlt: icons.heavyAlt,
      cost: 200,
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

  //  takeDamage(amount, magic)
  //  Reduces all nonmagical damage taken by 1
  takeDamage(amount, magic) {
    if (magic) {
      this.stats.defense -= amount;
    } else {
      this.stats.defense -= amount - 2;
    }
  }
}
