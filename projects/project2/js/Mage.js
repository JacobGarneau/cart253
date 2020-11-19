class Mage extends Unit {
  constructor(xPos, yPos, team) {
    super(xPos, yPos, team);
    this.info = {
      type: `Mages`,
      description: `Powerful practitioners of the arcane arts. Mages have high offense and low defense and can attack from 2 squares away. Their attacks ignore Heavy units’ damage reduction.`,
    };

    this.stats = {
      movement: 3,
      currentMovement: 3,
      maxAttack: 5,
      attack: 5,
      maxDefense: 3,
      defense: 3,
      magical: true,
    };
  }
}
