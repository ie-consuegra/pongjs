// Controller class

class Controller {
  control(input, active) {
    this.controlledObject.controlSignal(input, active);
  }

  keyUp(keyCode) {
    switch (keyCode) {
      case 38:
        this.control('up', false);
        break;
      case 40:
        this.control('down', false);
        break;
      default:
        break;
    }
  }

  keyDown(keyCode) {
    switch (keyCode) {
      case 38:
        this.control('up', true);
        break;
      case 40:
        this.control('down', true);
        break;
      default:
        break;
    }
  }

  keyEventHandler(event, controlledObject) {
    this.controlledObject = controlledObject;
    switch (event.type) {
      case 'keyup':
        this.keyUp(event.keyCode);
        break;
      case 'keydown':
        this.keyDown(event.keyCode);
        break;
      default:
        break;
    }
  }
}

export default Controller;
