// TV
const screen = document.querySelector('canvas');
const ctxScreen = screen.getContext('2d');
const screenWidth = screen.width;
const screenHeight = screen.height;
const screenYHalf = screenHeight / 2;
const screenXHalf = screenWidth / 2;
const elementsOnScreenColor = '#FFF';
const screenBackgroundColor = '#222';

// Players
class Player {
  constructor(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.width = 20;
    this.height = 80;
  }
}

const player1 = new Player(20, screenYHalf - 40);
const player2 = new Player(screenWidth - 40, screenYHalf - 40);

function render() {
  // Background
  ctxScreen.fillStyle = screenBackgroundColor;
  ctxScreen.fillRect(0, 0, screenWidth, screenHeight);

  // Define the elements on screen color
  ctxScreen.fillStyle = elementsOnScreenColor;

  // Net
  const netWidth = 10;
  const netHeight = 30;
  for (let index = 0; index < screenHeight; index += 40) {
    ctxScreen.fillRect(screenXHalf - netWidth / 2, index, netWidth, netHeight);
  }

  // Players

  ctxScreen.fillRect(player1.posX, player1.posY, player1.width, player1.height);

  ctxScreen.fillRect(player2.posX, player2.posY, player2.width, player2.height);

  // Ball
  ctxScreen.fillRect(50, 50, 20, 20);
}

render();

function playerMove(event) {
  switch (event.keyCode) {
    case 38: // ArrowUp
      if (player1.posY > 0) {
        player1.posY -= 10;
      }
      break;
    case 40: // ArrowDown
      if (player1.posY < 320) {
        player1.posY += 10;
      }
      break;
    default:
      break;
  }
  render();
}

document.addEventListener('keydown', playerMove);
