import Player from './Player.js';
import Ball from './Ball.js';
import Controller from './Controller.js'


// import SoundGen from './sound';

// TV
const screen = document.querySelector('canvas');
const ctxScreen = screen.getContext('2d');
const screenWidth = screen.width;
const screenHeight = screen.height;
const screenYHalf = screenHeight / 2;
const screenXHalf = screenWidth / 2;
const elementsOnScreenColor = '#FFF';
const backgroundScreenColor = '#222';
const playerFrameGap = 20;

// Create players
const player1 = new Player(playerFrameGap, screenYHalf - 40);
const player2 = new Player(screenWidth - 40, screenYHalf - 40);

// Ball
const ball = new Ball(50, 180);

function render() {
  // Background
  ctxScreen.fillStyle = backgroundScreenColor;
  ctxScreen.fillRect(0, 0, screenWidth, screenHeight);

  // Define the elements on screen color
  ctxScreen.fillStyle = elementsOnScreenColor;

  // Net, created by a line made by 32 dashes
  const gapDelimiter = screenHeight / 32;
  const netWidth = 3;
  const netHeight = gapDelimiter - Math.floor(screenHeight / 72);
  for (let index = 0; index < screenHeight; index += gapDelimiter) {
    ctxScreen.fillRect(screenXHalf - netWidth / 2, index, netWidth, netHeight);
  }

  // Players

  ctxScreen.fillRect(player1.posX, player1.posY, player1.width, player1.height);

  ctxScreen.fillRect(player2.posX, player2.posY, player2.width, player2.height);

  // Ball
  ctxScreen.fillRect(ball.posX, ball.posY, ball.width, ball.height);
}

function paddle1HitsBall() {
  // Create an oblique blow when the paddle is moving
  if (player1.directionY !== 'none') {
    ball.directionY = player1.directionY;
  }
}

function paddle2HitsBall() {
  const directionArr = ['up', 'none', 'down'];
  const randomNum = Math.floor(Math.random() * 3);
  player2.directionIntention = directionArr[randomNum];

  ball.directionY = player2.directionIntention;
}

function ballHitsFrame() {
  switch (ball.directionY) {
    case 'up':
      ball.directionY = 'down';
      break;
    case 'down':
      ball.directionY = 'up';
      break;
    default:
      break;
  }
}

function ballMove() {
  switch (ball.directionX) {
    case 'right':
      if (ball.posX < screenWidth) {
        ball.posX += 5;
        // Ball touches the player2 paddle and bounces
        if (ball.posX + ball.side === screenWidth - player2.entityWidth) {
          if (ball.posY + ball.side >= player2.posY && ball.posY <= player2.posY + player2.height) {
            ball.directionX = 'left';
            paddle2HitsBall();
          }
        }
      } else {
        ball.directionX = 'left';
      }
      break;
    case 'left':
      if (ball.posX > -20) {
        ball.posX -= 5;
        // Ball touches the player1 paddle and bounces back
        if (ball.posX === player1.entityWidth) {
          if (ball.posY + ball.side >= player1.posY && ball.posY <= player1.posY + player1.height) {
            ball.directionX = 'right';
            paddle1HitsBall();
            // Generate the bounce beep
          }
        }
      } else {
        ball.directionX = 'right';
        // player1 fails
      }
      break;
    default:
      break;
  }

  switch (ball.directionY) {
    case 'up':
      ball.posY -= 2;
      break;
    case 'none':
      break;
    case 'down':
      ball.posY += 2;
      break;
    default:
      break;
  }

  if (ball.posY <= 0) {
    ballHitsFrame();
  } else if (ball.posY >= 380) {
    ballHitsFrame();
  }
}

function computerAI() {
  player2.posY = ball.posY - 30;
}


setInterval(() => {
  // ballMove();
  ball.update([player1, player2]);
  player1.update();
  computerAI();
  render();
}, 20);

const controller = new Controller();

window.addEventListener('keydown', (ev) => {
  controller.keyEventHandler(ev, player1);
});

window.addEventListener('keyup', (ev) => {
  controller.keyEventHandler(ev, player1);
});
