import GameElement from './gameElement.js';

class Ball extends GameElement {
  constructor() {
    super();
    this.directionX = 'left';
    this.directionY = 'none';
    this.minWidth = 0;
    this.maxPosY = 380;
  }
}

export default Ball;
