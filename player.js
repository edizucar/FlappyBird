class Player {
  constructor() {
    this.timeLimit = 10000;

    this.color = [random(255), random(255), random(255)];
    this.pos = createVector(50, 200);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.dead = false;
    this.width = 20;
    this.nn = new NN();
    this.time = 0;
  }

  update() {
    if (!this.dead) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(6);
      this.time += 1;
      if (this.time > this.timeLimit) {
        this.dead = true;
      }
    } else {
      let v = createVector(-1, 0);
      this.pos.add(v);
    }
  }

  applyForce(v) {
    this.acc.add(v);
  }

  draw() {
    fill(this.color[0], this.color[1], this.color[2]);
    rect(this.pos.x, this.pos.y, this.width, this.width);
  }

  bounce(closestPipe) {
    if (this.nn.bounce(this.vel.y, closestPipe.pos.x, this.pos.y, closestPipe.topLen)) {
      let l = createVector(0, -4);
      this.vel = l.copy();
    }
  }

  floorCeil() {
    if ((this.pos.y + this.width > 400) || (this.pos.y < 0)) {
      this.dead = true;
      return true;
    } else {
      return false;
    }
  }

  pipeHit(pipe) {
    if (this.pos.x + this.width >= pipe.pos.x) {
      if (this.pos.x <= pipe.pos.x + pipe.pipeWidth) {

        if (this.pos.y <= pipe.topLen) {
          this.dead = true;
        } else if (this.pos.y + this.width >= pipe.topLen + pipe.gap) {
          this.dead = true;
        }
      }
    }
  }

  getFitness() {
    return (this.time - 43) * (this.time - 43);
  }
}