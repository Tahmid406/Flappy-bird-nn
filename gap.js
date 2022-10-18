class Gap {
  constructor() {
    this.x = width;
    this.gapLength = 200;
    this.gapWidth = 80;
    this.gapPosition = random(0, height - this.gapLength);
  }

  update(birb) {
    if (
      (birb.position.x > this.x &&
        birb.position.x < this.x + this.gapWidth &&
        birb.position.y > this.gapPosition + this.gapLength &&
        birb.position.y < height) ||
      (birb.position.x > this.x &&
        birb.position.x < this.x + this.gapWidth &&
        birb.position.y > 0 &&
        birb.position.y < this.gapPosition)
    ) {
      birb.alive = false;
    }

    if (this.x < birb.position.x - this.gapWidth) birb.score++;
  }

  show() {
    fill(46, 204, 113);
    rect(this.x, 0, this.gapWidth, this.gapPosition);
    rect(this.x, this.gapPosition + this.gapLength, this.gapWidth, height);
    this.x -= 4;
  }
}
