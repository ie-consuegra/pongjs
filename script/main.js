import Display from './Display.js';
import Player from './Player.js';
import Ball from './Ball.js';
import Controller from './Controller.js'

// import SoundGen from './sound';

const display = new Display(window.innerWidth, window.innerHeight);

const distancePlayer = Math.floor(display.canvas.width / 8);
// Create players "the Paddles"
const player1 = new Player();
const player2 = new Player();

// Ball
const ball = new Ball();

// Keyboard input handler
const controller = new Controller();

function animate() {
  ball.update([player1, player2]);
  player1.update();
  player2.update(ball);
  display.render([ball, player1, player2]);
  requestAnimationFrame(animate);
}

window.addEventListener('keydown', (ev) => {
  controller.keyEventHandler(ev, player1);
});

window.addEventListener('keyup', (ev) => {
  controller.keyEventHandler(ev, player1);
});

function init() {
  // Initial configuration
  // PLAYERS
  player2.hasAI = true;
  // Set the position of player1 and player2 (X axis)
  player1.posX = distancePlayer;
  player2.posX = display.canvas.width - (player2.width + distancePlayer);
  // Set the elements in the middle of the area (Y axis)
  player1.posY = display.getCanvasHalfHeight() - Math.floor(player1.height / 2);
  player2.posY = display.getCanvasHalfHeight() - Math.floor(player2.height / 2);
  // Set the initial properties of the ball
  ball.minPosX = 0;
  ball.posX = display.getCanvasHalfWidth() - ball.width;
  ball.posY = display.getCanvasHalfHeight() - Math.floor(ball.height / 2);
  // Set the speed of the elements of the game
  ball.speed = 5;
  player1.speed = 5;
  player2.speed = 5;

  // RESIZING
  display.resize(window.innerWidth, window.innerHeight);
  const areaWidth = display.canvas.width;
  const areaHeight = display.canvas.height;

  player1.maxPosY = areaHeight - player1.height;
  player2.maxPosY = areaHeight - player2.height;

  // Paddle resizing
  player1.resize(areaWidth, areaHeight);
  player2.resize(areaWidth, areaHeight);

  ball.maxPosX = display.canvas.width;
  ball.maxPosY = display.canvas.height - ball.height;
  ball.resize(areaWidth, areaHeight);
}

display.canvas.addEventListener('dblclick', () => {
  soundGen.toggle();
});

window.addEventListener('resize', init);
init();
animate();
