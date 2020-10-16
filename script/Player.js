import GameElement from './gameElement.js';

class Player extends GameElement {
  constructor(posX, posY) {
    super(posX, posY);
    this.height = 80;
    this.gapPlayerBoundary = 20;
    this.entityWidth = this.width + this.gapPlayerBoundary;
  }

  controlSignal(input, active) {
    if (active) {
      // Set movement direction of player
      this.directionY = input;
      // Intention of player to set the ball direction
      this.directionIntention = input;
    } else {
      // do nothing
      this.directionY = 'none';
    }
  }

  update() {
    switch (this.directionY) {
      case 'up':
        this.moveUp(5, 0); // Temporarily hardcoded 5 determines speed of movement and 0 the limit of the movement
        break;
      case 'down':
        this.moveDown(5, 320);
        break;
      default:
        break;
    }
  }

  fails() {
    console.log('La embarré');
  }
}

export default Player;
