class Player {
  constructor() {
    this.currency = 500;
    this.lords = 3;

    this.gender = `male`;
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
