class Archer extends Unit {
  constructor(xPos, yPos, team) {
    super(xPos, yPos, team);
    this.info = {
      type: `Archers`,
      description: `Ranged units. Archers have high offense and low defense but can attack from 2 squares away.`,
      icon: icons.archer,
      iconAlt: icons.archerAlt,
      cost: 250,
    };

    this.stats = {
      movement: 3,
      currentMovement: 3,
      maxAttack: 4,
      attack: 4,
      maxDefense: 3,
      defense: 3,
      magical: false,
    };
  }
}
