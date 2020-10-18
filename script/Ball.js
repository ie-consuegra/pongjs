import GameElement from './gameElement.js';

class Ball extends GameElement {
  constructor(posX, posY) {
    super(posX, posY);
    this.directionX = 'right';
    this.directionY = 'none';
    this.minPosY = 0;
    this.maxPosY = 380;
  }

  moveLeft(leftPaddle) {
    if (this.posX > this.minPosX) {
      this.posX -= this.speed;
      if (this.posX <= leftPaddle.entityWidth) {
        if (this.posY + this.height >= leftPaddle.posY && this.posY <= leftPaddle.posY + leftPaddle.height) {
          this.hitsLeftPaddle(leftPaddle.getDirectionIntention());
        }
      }
    } else {
      this.goThroughLeftSide();
      leftPaddle.fails();
    }
  }

  moveRight(rightPaddle) {
    if (this.posX < this.maxPosX) {
      this.posX += this.speed;
      if (this.posX + this.width >= this.maxPosX - rightPaddle.entityWidth) {
        if (this.posY + this.height >= rightPaddle.posY && this.posY <= rightPaddle.posY + rightPaddle.height) {
          this.hitsRightPaddle(rightPaddle.getDirectionIntention());
        }
      }
    } else {
      this.goThroughRightSide();
      rightPaddle.fails();
    }
  }

  moveUp() {
    if (this.posY > this.minPosY) {
      this.posY -= this.speed;
    } else {
      this.changeDirectionY();
    }
  }

  moveDown() {
    if (this.posY < this.maxPosY) {
      this.posY += this.speed;
    } else {
      this.changeDirectionY();
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
  }

  goThroughRightSide() {
    this.changeDirectionX();
  }

  hitsLeftPaddle(directionIntention) {
    this.changeDirectionX();
    this.directionY = directionIntention;
  }

  hitsRightPaddle(directionIntention) {
    this.changeDirectionX();
    this.directionY = directionIntention;
  }

  changeDirectionY() {
    if (this.directionY === 'up') {
      this.directionY = 'down';
    } else {
      this.directionY = 'up';
    }
  }
}

export default Ball;
