function controller(input, active) {
  if (active) {
    switch (input) {
      case 'up':
        player1.directionY = 'up';
        break;
      case 'down':
        player1.directionY = 'down';
        break;
      default:
        break;
    }
  } else {
    player1.directionY = 'none';
  }
}

function keyUp(keyCode) {
  switch (keyCode) {
    case 38:
      controller('up', false);
      break;
    case 40:
      controller('down', false);
      break;
    default:
      break;
  }
}

function keyDown(keyCode) {
  switch (keyCode) {
    case 38:
      controller('up', true);
      break;
    case 40:
      controller('down', true);
      break;
    default:
      break;
  }
}

function keyEventHandler(event) {
  switch (event.type) {
    case 'keyup':
      keyUp(event.keyCode);
      break;
    case 'keydown':
      keyDown(event.keyCode);
      break;
    default:
      break;
  }
}

window.addEventListener('keydown', keyEventHandler);
window.addEventListener('keyup', keyEventHandler);
