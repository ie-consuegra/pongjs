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
player2.hasAI = true;

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

setInterval(() => {
  // ballMove();
  ball.update([player1, player2]);
  player1.update();
  player2.update(ball);
  render();
}, 20);

const controller = new Controller();

window.addEventListener('keydown', (ev) => {
  controller.keyEventHandler(ev, player1);
});

window.addEventListener('keyup', (ev) => {
  controller.keyEventHandler(ev, player1);
});
