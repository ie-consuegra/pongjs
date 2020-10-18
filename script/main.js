import Display from './Display.js';
import Player from './Player.js';
import Ball from './Ball.js';
import Controller from './Controller.js'

// import SoundGen from './sound';

const playerFrameGap = 20;

const display = new Display(window.innerWidth, window.innerHeight);

// Create players
const player1 = new Player(playerFrameGap, display.getCanvasHalfHeight() - 40);
const player2 = new Player(display.canvas.width - 40, display.getCanvasHalfHeight() - 40);
player2.hasAI = true;

// Ball
const ball = new Ball(50, 180);

function animate() {
  ball.update([player1, player2]);
  player1.update();
  player2.update(ball);
  display.render([ball, player1, player2]);
  requestAnimationFrame(animate);
}

const controller = new Controller();

window.addEventListener('keydown', (ev) => {
  controller.keyEventHandler(ev, player1);
});

window.addEventListener('keyup', (ev) => {
  controller.keyEventHandler(ev, player1);
});

function init() {
  ball.minPosX = 0;
  ball.speed = 5;
  player1.speed = 5;
  player2.speed = 5;
}

function resize() {
  display.resize(window.innerWidth, window.innerHeight);
  const areaWidth = display.canvas.width;
  const areaHeight = display.canvas.height;

  player1.maxPosY = areaHeight - player1.height;
  player2.maxPosY = areaHeight - player2.height;
  player2.posX = areaWidth - 40;

  // Paddle resizing
  player1.resize(areaWidth, areaHeight);
  player2.resize(areaWidth, areaHeight);

  ball.maxPosX = display.canvas.width;
  ball.maxPosY = display.canvas.height - ball.height;
  ball.resize(areaWidth, areaHeight);
}

window.addEventListener('resize', resize);
init();
resize();
animate();
