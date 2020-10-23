import Player from './Player.js';
import Ball from "./Ball.js";
import SoundGenerator from "./SoundGen.js";
import Display from "./Display.js"

class Game {
  constructor(windowWidth, windowHeight) {
    // System
    this.display = new Display(windowWidth, windowHeight);
    this.windowWidth = windowWidth;
    this.windowHeight = windowHeight;
    this.soundGen = new SoundGenerator();
    this.controller = {
      key: '',
      active: '',
    };

    // Movable elements
    this.player1 = new Player();
    this.player2 = new Player();
    this.ball = new Ball();
  }

  // This happens anytime the game is refreshed/updated
  detectBallCollisions() {
    if (this.ball.posX > this.ball.minPosX) {
      if (this.ball.posX <= (this.player1.posX + this.player1.width)) {
        if ((this.ball.posY + this.ball.height) >= this.player1.posY) {
          if (this.ball.posY <= (this.player1.posY + this.player1.height)) {
            // ball touches the left paddle, player1
            this.ballPaddle();
          }
        }
      }
    } else {
      this.ballVerticalBoundary();
      this.player2.increaseScore();
      console.log (this.player2.score);
      // player1 fails, increase player2 score
      // reset speed
    }

    if ((this.ball.posX + this.ball.width) < this.ball.maxPosX) {
      if ((this.ball.posX + this.ball.width) >= this.player2.posX) {
        if ((this.ball.posY + this.ball.height) >= this.player2.posY) {
          if (this.ball.posY <= (this.player2.posY + this.player2.height)) {
            // ball touches the right paddle, player2
            this.ballPaddle();
          }
        }
      }
    } else {
      this.ballVerticalBoundary();
      this.player1.increaseScore();
      // player2 fails, increase player1 score
      // reset speed
    }

    if (this.ball.posY <= this.ball.minPosY) {
      this.ballHorizontalBoundary();
    }

    if ((this.ball.posY + this.ball.height) >= this.ball.maxPosY) {
      this.ballHorizontalBoundary();
    }
  }

  // ball events
  ballPaddle() {
    // Take into account direction intention
    this.ball.increaseSpeed();
    this.player1.increaseSpeed();
    this.ball.changeXdirection();
    this.ballPaddleSoundEffect();
  }

  ballHorizontalBoundary() {
    this.ball.changeYdirection();
    this.ballHorizontalBoundarySoundEffect();
  }

  ballVerticalBoundary() {
    // Detect who fails
    // Sound efect
    // Ball disappears
    this.ball.posX = this.display.getCanvasHalfHeight();
    this.ball.posY = this.display.getCanvasHalfHeight();
    this.ball.width = 0;
    this.ball.Xdirection = 'none';
    this.ball.Ydirection = 'none';
    this.ball.resetSpeed();
    this.ballAppears = this.ballAppears.bind(this);
    setTimeout(this.ballAppears, 2000);

    this.player1.resetSpeed();
    this.BallVerticalBoundarySoundEffect();
  }

  ballAppears() {
    this.resize();
    this.ball.Xdirection = 'left';
    this.ball.Ydirection = 'up';
  }

  // Control methods
  sendSignal() {
    if (this.controller.active) {
      switch (this.controller.keyCode) {
        case 38:
          this.player1.Ydirection = 'up';
          break;
        case 40:
          this.player1.Ydirection = 'down';
          break;
        default:
          break;
      }
    } else {
      // Do nothing, pause, stop, set inactive state
      this.player1.Ydirection = 'none';
    }
  }

  keyEventHandler({ keyCode, type }) {
    switch (type) {
      case 'keydown':
        this.controller.active = true;
        break;
      case 'keyup':
        this.controller.active = false;
        break;
      default:
        break;
    }

    this.controller.keyCode = keyCode;
    this.sendSignal();
  }

  update() {
    this.detectBallCollisions();
    this.ball.update();
    this.player1.update();
    this.player2.update(this.ball);
    this.display.render([this.player1, this.player2, this.ball]);
  }

  resize(windowWidth = this.windowWidth, windowHeight = this.windowHeight) {
    this.display.resize(windowWidth, windowHeight);
    this.player1.resize(windowWidth, windowHeight);
    this.player2.resize(windowWidth, windowHeight);
    this.ball.resize(windowWidth, windowHeight);
    this.relocateElements();
  }

  relocateElements() {
    this.display.padding = [Math.floor(this.display.canvas.width / 8), 10];

    this.player1.posX = this.display.padding[0];
    this.player2.posX = this.display.canvas.width - (this.player2.width + this.display.padding[0]);
    // Set the elements in the middle of the area (Y axis)
    this.player1.posY = this.display.getCanvasHalfHeight() - Math.floor(this.player1.height / 2);
    this.player2.posY = this.display.getCanvasHalfHeight() - Math.floor(this.player2.height / 2);
    this.ball.minPosX = 0;
    this.ball.posX = this.display.getCanvasHalfWidth() - this.ball.width;
    this.ball.posY = this.display.getCanvasHalfHeight() - Math.floor(this.ball.height / 2);

    const areaHeight = this.display.canvas.height;

    this.player1.maxPosY = areaHeight - this.player1.height;
    this.player2.maxPosY = areaHeight - this.player2.height;

    this.ball.minPosX = this.player1.posX;
    this.ball.maxPosX = this.player2.posX + this.player2.width;
    this.ball.maxPosY = this.display.canvas.height - this.ball.height;
  }

  // --- Sound effects methods ---

  ballPaddleSoundEffect() {
    // Emit a 494Hz (B4), square sound that lasts 30ms
    this.soundGen.wave(494, 'square').play(30);
  }

  ballHorizontalBoundarySoundEffect() {
    // Emit a 247Hz (B3), square sound that lasts 30ms
    this.soundGen.wave(247, 'square').play(30);
  }

  BallVerticalBoundarySoundEffect() {
    // Emit a 247Hz (B3), sawtooth sound that lasts 300ms
    this.soundGen.wave(247, 'sawtooth').play(300);
  }

  init() {
    // Initial configuration
    // PLAYERS
    this.player2.hasAI = true;
    // Set the position of player1 and player2 (X axis)
    this.player1.minHeight = 40;
    this.player2.minHeight = 40;
    // Set the initial properties of the ball
    this.ball.minHeight = 10;
    this.ball.minWidth = 10;
    this.ball.Xdirection = 'left';
    this.ball.Ydirection = 'down';
    this.resize();
  }
}

export default Game;
