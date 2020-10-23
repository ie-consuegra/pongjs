import Game from './Game.js';

const game = new Game(window.innerWidth, window.innerHeight);

function animate() {
  // game.update = game.update.bind(game);
  game.update();
  requestAnimationFrame(animate);
}

window.addEventListener('keydown', (ev) => {
  game.keyEventHandler = game.keyEventHandler.bind(game);
  game.keyEventHandler(ev);
});

window.addEventListener('keyup', (ev) => {
  game.keyEventHandler = game.keyEventHandler.bind(game);
  game.keyEventHandler(ev);
});

game.display.canvas.addEventListener('dblclick', () => {
  game.soundGen.toggle = game.soundGen.toggle.bind(game);
  game.soundGen.toggle();
});

window.addEventListener('resize', (ev) => {
  game.resize = game.resize.bind(game);
  game.resize(ev.currentTarget.innerWidth, ev.currentTarget.innerWidth);
});

game.init();
animate();
