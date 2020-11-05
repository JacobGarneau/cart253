class Priest extends Unit {
  constructor(xPos, yPos, team) {
    super(xPos, yPos, team);
    this.info = {
      type: `Priests`,
      description: `Servants of God blessed with divine power. Priests have average offense and high defense and can heal ally units from up to 2 squares away.`,
    };

    this.stats = {
      movement: 3,
      currentMovement: 3,
      maxAttack: 5,
      attack: 5,
      maxDefense: 3,
      defense: 3,
    };
  }
}
