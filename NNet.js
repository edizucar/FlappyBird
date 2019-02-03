class NN {
  constructor() {
    this.centresN = [];
    this.outputsN = [];

    let i;
    for (i = 0; i < 5; i++) {
      append(this.centresN, new Node(4));
    }
    
    for (i = 0; i < 2; i++) {
      append(this.outputsN, new Node(5));
    }
  }

  bounce(downV, pipeX, Y, pipeY) {
    let results = [0, 0, 0, 0, 0];
    let inputs = [downV, pipeX, Y, pipeY];

    for (i = 0; i < 5; i++) {
      results[i] = this.centresN[i].run(inputs);
    }

    let jump;
    let donut;
    jump = this.outputsN[0].run(results);
    donut = this.outputsN[1].run(results);

    if (jump > donut) {
      return true;
    } 
		else {
      return false;
    }
  }

  getDNA() {
    let DNA = [];
    let l1 = [];
    let l2 = [];
    let i;
    let j;
    for (i = 0; i < 5; i++) {
      let tempL1 = [];
      for (j = 0; j < 4; j++) {
        append(tempL1, this.centresN[i].arms[j].weight);
      }
      append(tempL1, this.centresN[i].bias);
      append(l1, tempL1);
    }

    append(DNA, l1);

    for (i = 0; i < 2; i++) {
      let tempL2 = [];
      for (j = 0; j < 5; j++) {
        append(tempL2, this.outputsN[i].arms[j].weight);
      }
      append(tempL2, this.outputsN[i].bias);
      append(l2, tempL2);
    }

    append(DNA, l2);

    return DNA;
  }

  giveDNA(DNA) {
    let i;
    let j;
    for (i = 0; i < 5; i++) {
      for (j = 0; j < 4; j++) {

        this.centresN[i].arms[j].weight = DNA[0][i][j];
      }
      this.centresN.bias = DNA[0][i][4];
    }
    for (i = 0; i < 2; i++) {
      for (j = 0; j < 5; j++) {
        this.outputsN[i].arms[j].weight = DNA[1][i][j];
      }
      this.outputsN[i].bias = DNA[1][i][5];
    }
  }
}

class Node {
  constructor(x) {
    // x indicates where the node lies
    this.arms = [];
    this.bias = random(-50, 50);
    this.x = x;

    let i;
    for (i = 0; i < x; i++) {
      append(this.arms, new Arm());
    }
  }

  run(inputs) {
    let sum = 0;
    let result;
    let e = 2.7182818284590452353602874713526624977572470936999595749669676277240766303535;

    let v;
    for (i = 0; i < this.x; i++) {
      v = this.arms[i].run(inputs[i]);
      sum = sum + v;
    }


    sum = sum + this.bias;

    result = 1.0 / (1.0 + pow(e, -sum));

    return result;
  }
}


class Arm {
  constructor() {
    this.weight = random(-1, 1);

  }
  run(x) {
    return (this.weight * x);
  }

}