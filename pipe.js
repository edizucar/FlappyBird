class Pipe {
  constructor() {
    this.gap = 100;
    this.pos = createVector(400, 0);
    this.pipeMax = 10;
    this.pipeWidth = 20;
    this.topLen = random(this.pipeMax,400 - this.pipeMax * 2 - this.gap);
  }
  update() {
    this.pos.x -= 1;
  }
  draw() {
    fill(0, 255, 0);
    rect(this.pos.x, this.pos.y, this.pipeWidth, this.topLen);
    rect(this.pos.x, this.pos.y + this.topLen + this.gap, this.pipeWidth, 400 - this.gap - this.topLen);
  }

  dead() {
    if (this.pos.x + this.pipeWidth < 0) {
      return true;
    }
  }
}