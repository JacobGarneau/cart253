class Archer extends Unit {
  constructor(xPos, yPos, team) {
    super(xPos, yPos, team);
    this.info = {
      type: `Archers`,
      description: `Ranged units. Archers have average offense and low defense but can attack from 2 squares away.`,
      icon: icons.archer,
    };

    this.stats = {
      movement: 3,
      currentMovement: 3,
      maxAttack: 5,
      attack: 5,
      maxDefense: 3,
      defense: 3,
      magical: false,
    };
  }
}
