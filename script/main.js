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

// Players
class Player {
  constructor(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.width = 20;
    this.height = 80;
    this.entityWidth = this.width + playerFrameGap;
  }
}

const player1 = new Player(playerFrameGap, screenYHalf - 40);
const player2 = new Player(screenWidth - 40, screenYHalf - 40);

// Ball
const ball = {
  side: 20,
  posX: 50,
  posY: 180,
};

function render() {
  // Background
  ctxScreen.fillStyle = backgroundScreenColor;
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
  ctxScreen.fillRect(ball.posX, ball.posY, ball.side, ball.side);
}

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

let directionX = 'right';
// const directionY = 'line';

function ballMove() {
  switch (directionX) {
    case 'right':
      if (ball.posX < screenWidth) {
        ball.posX += 5;
        // Ball touches the player2 paddle and bounces
        if (ball.posX + ball.side === screenWidth - player2.entityWidth) {
          if (ball.posY + ball.side >= player2.posY && ball.posY <= player2.posY + player2.height) {
            directionX = 'left';
          }
        }
      } else {
        directionX = 'left';
      }
      break;
    case 'left':
      if (ball.posX > -20) {
        ball.posX -= 5;
        // Ball touches the player1 paddle and bounces back
        if (ball.posX === player1.entityWidth) {
          if (ball.posY + ball.side >= player1.posY && ball.posY <= player1.posY + player1.height) {
            directionX = 'right';
            // Calculate where the ball hits to set direction
            // Generate the bounce beep
          }
        }
      } else {
        directionX = 'right';
        // player1 fails
      }
      break;
    default:
      break;
  }
  render();
}

document.addEventListener('keydown', playerMove);

setInterval(ballMove, 20);
