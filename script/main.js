import Display from './Display.js';
import Player from './Player.js';
import Ball from './Ball.js';
import Controller from './Controller.js'

// import SoundGen from './sound';

const playerFrameGap = 20;

const display = new Display(600, 400);

// Create players
const player1 = new Player(playerFrameGap, display.canvasHalfHeight - 40);
const player2 = new Player(display.canvas.width - 40, display.canvasHalfHeight - 40);
player1.hasAI = true;
player2.hasAI = true;

// Ball
const ball = new Ball(50, 180);

function animate() {
  ball.update([player1, player2]);
  player1.update(ball);
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

animate();
