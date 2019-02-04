class Button {
  constructor(active, type, x, y, color) {
    this.color = color;
    this.active = active;
    this.type = type;
    this.x = x;
    this.y = y;
    this.radius = 20;
  }
  update() {
    if (mouseIsPressed) {
      let m = createVector(mouseX, mouseY);
      let v = createVector(this.x, this.y);
      v.sub(m);
      if (v.mag() < this.radius) {
        this.active = true;
      } else {
        this.active = false;
      }
    }

  }

  draw() {
    this.update();

    if (!this.active) {
      fill(this.color[0], this.color[1], this.color[2]);
    } else {
      fill(0, 0, 0);
    }
    ellipse(this.x, this.y, this.radius, this.radius);

    if (this.active) {
      // Draw Graph
    }
  }
}