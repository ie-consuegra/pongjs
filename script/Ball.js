import GameElement from './gameElement.js';

class Ball extends GameElement {
  constructor(posX, posY) {
    super(posX, posY);
    this.directionX = 'right';
    this.directionY = 'none';
  }

  moveRight(value, limitValue) {
    if (this.posX < limitValue) {
      this.posX += value;
    }
  }

  moveLeft(value, limitValue) {
    if (this.posX > limitValue) {
      this.posX -= value;
    }
  }
}

export default Ball;
