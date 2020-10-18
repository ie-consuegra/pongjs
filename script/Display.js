
class Display {
  constructor(width, height) {
    this.canvas = document.querySelector('canvas');
    this.canvasCtx = this.canvas.getContext('2d');
    this.canvasBackgroundColor = '#222';
    this.canvasElementsColor = '#FFF';
    this.draw = this.draw.bind(this);
    this.resize = this.resize.bind(this);
    this.resize(width, height);
    this.net = {};
  }

  getCanvasHalfWidth() {
    return this.canvas.width / 2;
  }

  getCanvasHalfHeight() {
    return this.canvas.height / 2;
  }

  render(elementsArr) {
    this.elementsArr = [...elementsArr];
    // Background default
    this.canvasCtx.fillStyle = this.canvasBackgroundColor;
    this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Color of the game elements
    this.canvasCtx.fillStyle = this.canvasElementsColor;

    // Render the net
    this.drawNet();
    // Iterates the array and render each element
    this.elementsArr.forEach(this.draw);
  }

  draw(element) {
    this.canvasCtx.fillRect(element.posX, element.posY, element.width, element.height);
  }

  drawNet() {
    this.net.gapDelimiter = this.canvas.height / 32;
    this.net.width = 3;
    this.net.height = this.net.gapDelimiter - Math.floor(this.canvas.height / 72);

    for (let index = 0; index < this.canvas.height; index += this.net.gapDelimiter) {
      this.net.posX = this.getCanvasHalfWidth() - Math.floor(this.net.width / 2);
      this.net.posY = index;
      this.draw(this.net);
    }
  }

  resize(windowWidth, windowHeight) {
    // Resize keeping a 4:3 Aspect ratio
    this.canvas.height = windowHeight;
    this.canvas.width = Math.floor((windowHeight * 4) / 3);

    if (windowWidth < this.canvas.width) {
      this.canvas.width = windowWidth;
      this.canvas.height = Math.floor((window.innerWidth * 3) / 4);
    }
  }
}

export default Display;
