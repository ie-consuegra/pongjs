// Class with properties and method of every movable element in the game

class GameElement {
  constructor() {
    this.posX = 0;
    this.posY = 0;
    this.directionY = 'none';
    this.width = 10;
    this.height = 10;
    this.speed = 2;
    this.minPosY = 0;
    this.maxPosY = 320;
  }

  moveUp() {
    if (this.posY > this.minPosY) {
      this.posY -= this.speed;
    }
  }

  moveDown() {
    if (this.posY < this.maxPosY) {
      this.posY += this.speed;
    }
  }

  update() {
    switch (this.directionY) {
      case 'up':
        this.moveUp();
        break;
      case 'down':
        this.moveDown();
        break;
      default:
        break;
    }
  }
}

export default GameElement;
