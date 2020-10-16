// Class with properties and method of every movable element in the game

class GameElement {
  constructor(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.directionY = 'none';
    this.width = 20;
    this.height = 20;
    this.speed = 2;
    this.minPosY = 0;
    this.maxPosY = 320;
  }

  moveUp(speed = this.speed, minPosY = this.minPosY) {
    if (this.posY > minPosY) {
      this.posY -= speed;
    }
  }

  moveDown(speed = this.speed, maxPosY = this.maxPosY) {
    if (this.posY < maxPosY) {
      this.posY += speed;
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
