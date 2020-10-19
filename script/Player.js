import GameElement from './gameElement.js';

class Player extends GameElement {
  constructor() {
    super();
    this.height = 40;
    this.hasAI = false;
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
      this.directionIntention = 'none';
    }
  }

  update(trackedBall) {
    if (this.hasAI) {
      // AI Tracks the ball position
      this.posY = Math.floor(trackedBall.posY - ((this.height / 2) - (trackedBall.height / 2)));
    } else {
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

  getDirectionIntention() {
    if (this.hasAI) {
      // Set direction intention randomly
      const directionArr = ['up', 'none', 'down'];
      const randomNum = Math.floor(Math.random() * 3);
      this.directionIntention = directionArr[randomNum];
    }
    return this.directionIntention;
  }

  resize(areaWidth, areaHeight) {
    this.width = Math.floor((areaWidth * 10) / 640);
    this.height = Math.floor((areaHeight * 40) / 480);
  }
}

export default Player;
