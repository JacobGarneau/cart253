class Player {
  constructor() {
    this.currency = 150;
    this.lords = 3;
    this.buyable = [];
    this.structures = [`castle`];
    this.gender = `male`;

    for (let i = 0; i < unitTypes.length; i++) {
      if (
        unitTypes[i].info.type === `Infantry` ||
        unitTypes[i].info.type === `Cavalry` ||
        unitTypes[i].info.type === `Archers` ||
        unitTypes[i].info.type === `Heavies`
      ) {
        this.buyable.push(unitTypes[i]);
      }
    }
  }

  createName() {
    if (this.gender === `male`) {
      this.title = random(maleTitles);
      this.firstName = random(maleFirstNames);
    } else if (this.gender === `female`) {
      this.title = random(femaleTitles);
      this.firstName = random(femaleFirstNames);
    }
    this.lastName = random(lastNames);
  }
}
