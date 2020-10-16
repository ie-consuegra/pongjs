// Class with properties and method of every movable element in the game

class GameElement {
  constructor(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.directionY = 'none';
    this.width = 20;
    this.height = 20;
  }

  moveUp(value, limitValue) {
    if (this.posY > limitValue) {
      this.posY -= value;
    }
  }

  moveDown(value, limitValue) {
    if (this.posY < limitValue) {
      this.posY += value;
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
