import GameElement from './gameElement.js';

class Ball extends GameElement {
  constructor() {
    super();
    this.directionX = 'left';
    this.directionY = 'none';
    this.minPosY = 0;
    this.maxPosY = 380;
  }

  moveLeft(leftPaddle) {
    if (this.posX > this.minPosX) {
      this.posX -= this.speed;
      if (this.posX <= leftPaddle.posX + leftPaddle.width) {
        if (this.posY + this.height >= leftPaddle.posY && this.posY <= leftPaddle.posY + leftPaddle.height) {
          this.hitsLeftPaddle(leftPaddle.getDirectionIntention());
        }
      }
    } else {
      this.goThroughLeftSide();
      // leftPaddle.fails();
    }
  }

  moveRight(rightPaddle) {
    if (this.posX < this.maxPosX) {
      this.posX += this.speed;
      if (this.posX + this.width >= rightPaddle.posX) {
        if (this.posY + this.height >= rightPaddle.posY && this.posY <= rightPaddle.posY + rightPaddle.height) {
          this.hitsRightPaddle(rightPaddle.getDirectionIntention());
        }
      }
    } else {
      this.goThroughRightSide();
      // rightPaddle.fails();
    }
  }

  moveUp() {
    if (this.posY > this.minPosY) {
      this.posY -= this.speed;
    } else {
      this.changeDirectionY();
      soundGen.wave(247, 'sine').play(50);
    }
  }

  moveDown() {
    if (this.posY < this.maxPosY) {
      this.posY += this.speed;
    } else {
      this.changeDirectionY();
      soundGen.wave(247, 'sine').play(50);
    }
  }

  update(paddlesArr) {
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

    switch (this.directionX) {
      case 'left':
        this.moveLeft(paddlesArr[0]);
        break;
      case 'right':
        this.moveRight(paddlesArr[1]);
        break;
      default:
        break;
    }
  }

  changeDirectionX() {
    if (this.directionX === 'right') {
      this.directionX = 'left';
    } else {
      this.directionX = 'right';
    }
  }

  goThroughLeftSide() {
    this.changeDirectionX();
    // Fail beep
    soundGen.wave(247, 'sawtooth').play(300);
  }

  goThroughRightSide() {
    this.changeDirectionX();
    // Fail beep
    soundGen.wave(247, 'sawtooth').play(300);
  }

  hitsLeftPaddle(directionIntention) {
    this.changeDirectionX();
    this.directionY = directionIntention;
    // Beep a C3 tone type: sine 50 ms long
    soundGen.wave(494, 'sine').play(50);
  }

  hitsRightPaddle(directionIntention) {
    this.changeDirectionX();
    this.directionY = directionIntention;
    // Beep a C3 tone type: sine 50 ms long
    soundGen.wave(494, 'sine').play(50);
  }

  changeDirectionY() {
    if (this.directionY === 'up') {
      this.directionY = 'down';
    } else {
      this.directionY = 'up';
    }
  }

  resize(areaWidth, areaHeight) {
    this.width = Math.floor((areaWidth * 10) / 640);
    this.height = Math.floor((areaHeight * 10) / 480);
  }
}

export default Ball;
