// Class with properties and methods of every movable element in the game

class GameElement {
  constructor() {
    this.posX = 0;
    this.posY = 0;
    this.minPosX = 0;
    this.maxPosX = 640;
    this.minPosY = 0;
    this.maxPosY = 480;
    this.width = 10;
    this.height = 10;
    this.minWidth = 10;
    this.minHeight = 10;
    this.minPosY = 0;
    this.maxPosY = 320;
    this.Xdirection = 'none';
    this.Ydirection = 'none';
    this.variationPerFrame = 2;
  }

  moveUp() {
    if (this.posY > this.minPosY) {
      this.posY -= this.variationPerFrame;
    }
  }

  moveDown() {
    if (this.posY < this.maxPosY) {
      this.posY += this.variationPerFrame;
    }
  }

  moveLeft() {
    if (this.posX > this.minPosX) {
      this.posX -= this.variationPerFrame;
    }
  }

  moveRight() {
    if (this.posX < this.maxPosX) {
      this.posX += this.variationPerFrame;
    }
  }

  changeXdirection() {
    // Only change if Xdirection is left/right, none does not apply
    if (this.Xdirection === 'left') {
      this.Xdirection = 'right';
    } else if (this.Xdirection === 'right') {
      this.Xdirection = 'left';
    }
  }

  changeYdirection() {
    // Only change if Ydirection is up/down, none does not apply
    if (this.Ydirection === 'up') {
      this.Ydirection = 'down';
    } else if (this.Ydirection === 'down') {
      this.Ydirection = 'up';
    }
  }

  update() {
    switch (this.Ydirection) {
      case 'up':
        this.moveUp();
        break;
      case 'down':
        this.moveDown();
        break;
      default:
        break;
    }

    switch (this.Xdirection) {
      case 'left':
        this.moveLeft();
        break;
      case 'right':
        this.moveRight();
        break;
      default:
        break;
    }
  }

  resize(areaWidth, areaHeight) {
    this.width = Math.floor((areaWidth * this.minWidth) / 640);
    this.height = Math.floor((areaHeight * this.minHeight) / 480);
  }
}

export default GameElement;
