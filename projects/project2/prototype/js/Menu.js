class Menu {
  constructor() {
    this.bar = {
      height: menuHeight,
      width: windowWidth,
    };
    this.side = {
      width: marginX,
      height: windowHeight - menuHeight,
    };
  }

  display() {
    fill(50);
    rect(0, menuHeight, this.side.width, this.side.height);
    rect(width, menuHeight, -this.side.width, this.side.height);

    fill(70);
    rect(0, 0, this.bar.width, this.bar.height);
  }
}
