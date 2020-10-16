import GameElement from './gameElement.js';

class Ball extends GameElement {
  constructor(posX, posY) {
    super(posX, posY);
    this.directionX = 'right';
    this.directionY = 'none';
  }

  moveLeft(speed = this.speed, minPosX = this.minPosX, leftPaddle) {
    if (this.posX > minPosX) {
      this.posX -= speed;
      if (this.posX === leftPaddle.entityWidth) {
        if (this.posY + this.height >= leftPaddle.posY && this.posY <= leftPaddle.posY + leftPaddle.height) {
          this.hitsLeftPaddle();
        }
      }
    } else {
      this.goThroughLeftSide();
      leftPaddle.fails();
    }
  }

  moveRight(speed = this.speed, maxPosX = this.maxPosX, rightPaddle) {
    if (this.posX < maxPosX) {
      this.posX += speed;
      if (this.posX + this.width === 600 - rightPaddle.entityWidth) {
        if (this.posY + this.height >= rightPaddle.posY && this.posY <= rightPaddle.posY + rightPaddle.height) {
          this.hitsRightPaddle();
        }
      }
    } else {
      this.goThroughRightSide();
      rightPaddle.fails();
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
        this.moveLeft(5, 0, paddlesArr[0]);
        break;
      case 'right':
        this.moveRight(5, 600, paddlesArr[1]);
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

  hitsLeftPaddle() {
    this.changeDirectionX();
  }

  hitsRightPaddle() {
    this.changeDirectionX();
  }
}

export default Ball;
