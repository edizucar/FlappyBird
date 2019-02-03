class Pop {
  constructor(pop_size, mut_rate) {
    this.pop = [];
    
    
    
    this.mutation_rate = mut_rate;
    this.currDead = false;
    let i;

    for (i = 0; i < pop_size; i++) {
      append(this.pop, new Player());
    }

  }

  update(pipes) {
    if (!this.currDead) {
      let i;
      let dead = true;
      for (i = 0; i < this.pop.length; i++) {
        this.pop[i].floorCeil();
        this.pop[i].update();


        let x;
        for (x = 0; x < pipes.length; x++) {
          this.pop[i].pipeHit(pipes[x]);
        }

        if (this.pop[i].dead == false) {
          dead = false;
        }
      }


      if (dead) {
        this.currDead = true;
      }
    }
  }

  draw() {
    let i;
    for (i = 0; i < this.pop.length; i++) {
      this.pop[i].draw();
    }
  }

  applyForce(v) {
    let i;
    for (i = 0; i < this.pop.length; i++) {
      this.pop[i].applyForce(v);
    }
  }

  bounce(closestPipe) {
    let i;
    for (i = 0; i < this.pop.length; i++) {
      this.pop[i].bounce(closestPipe);
    }
  }
	
	sumFit() {
		
		let i;
		let sum = 0;
		
		for (i=0;i < this.pop.length; i++) {
			sum += this.pop[i].getFitness();
		}
		return sum;
	}

  nextGen() {

		let i;
		let j;
		let newPop = [];
		let currIndex = null;
		let newP;
		let rand;
		let maxFitness = 0;
    
		
		// Getting the highest fitness
		for (i=0;i<this.pop.length; i++) {
			if (this.pop[i].getFitness() > maxFitness) {
				maxFitness = this.pop[i].getFitness();

        
			}
		}
    
  // ------- This does crossover reproduction -------
  

  let newP1 = null;
  let newP2 = null;
  let newP3 = null;
  let newP4 = null;
  let currDNA1;
  let currDNA2;
  let nextDNA1 = [];
  let nextDNA2 = [];

  let currIndex2;

  while (newPop.length < this.pop.length) {

    // Selects two parents
    while(currIndex == null) {
      currIndex = round(random(0, this.pop.length-1));
      if (this.pop[currIndex].getFitness() <= random(0, maxFitness)) {
        currIndex = null;
      }
    }
    while(currIndex2 == null) {
      currIndex2 = round(random(0, this.pop.length-1));
      if (this.pop[currIndex2].getFitness() <= random(0, maxFitness)) {
        currIndex2 = null;
      }
    }

    // Copy of Parent 1
    newP1 = new Player();
    newP1.nn.giveDNA(this.pop[currIndex].nn.getDNA());

    // Copy of Parent 2
    newP2 = new Player();
    newP2.nn.giveDNA(this.pop[currIndex2].nn.getDNA());

    currDNA1 = this.pop[currIndex].nn.getDNA();
    currDNA2 = this.pop[currIndex2].nn.getDNA();
    
    
    //First half of Parent 1 with second half of Parent 2
    append(nextDNA1, currDNA1[0]);
    append(nextDNA1, currDNA2[1]);

    newP3 = new Player();
    newP3.nn.giveDNA(nextDNA1);

    //First half of Parent 2 with second half of Parent 1
    append(nextDNA2, currDNA2[0]);
    append(nextDNA2, currDNA1[1]);

    newP4 = new Player();
    newP4.nn.giveDNA(nextDNA2);    

    // Add all four children to Population
    append(newPop, newP1);
    append(newPop, newP2);
    append(newPop, newP3);
    append(newPop, newP4);
  }
    


  // ------- This does asexual reproduction ---------

	/*	while(newPop.length < this.pop.length) {
			currIndex = round(random(0, this.pop.length-1));		
			rand = random(maxFitness/4, maxFitness);
			
			if (this.pop[currIndex].getFitness() > rand) {
				newP = new Player();
				newP.nn.giveDNA(this.pop[currIndex].nn.getDNA());
				append(newPop, newP);
			}
		}*/
		
		this.pop = newPop;
		this.mutate();
    
    
  }

  sort() {

    let sorted = false;

    while (!sorted) {
      let i;

      for (i = 0; i < this.pop.length - 1; i++) {
        sorted = true;
        if (this.pop[i].getFitness() > this.pop[i + 1].getFitness()) {
          sorted = false;
          let temp;
          temp = this.pop[i];
          this.pop[i] = this.pop[i + 1];
          this.pop[i + 1] = temp;
        }
      }
    }
  }
  
  averageY() {
    let i;
    let sum = 0;
    let num = 0;
    
    for (i=0;i < this.pop.length; i++) {
      if (!this.pop[i].dead) {
      	sum = sum + this.pop[i].pos.y;
        num = num + 1;
      }
    }
    return (sum / num);
    
  }
  
  
  aliveNum() {
    let num = 0;
    let i;
    
    for (i=0;i < this.pop.length;i++) {
      if (this.pop[i].dead == false) {
        num ++;
      }
    }
    return num;
  }
  
  standardDeviation() {
    let mean = this.mean();
    let i;
    let sum = 0;
    
    for (i=0; i<this.pop.length ; i++) {
      sum += sq(this.pop[i].getFitness() - mean);
    }
    
    return sqrt(sum / this.pop.length);
  }
  
  
  
  mean() {
    return (this.sumFit() / this.pop.length);
  }
  
  
  
  mutate() {
    /*let i;
    let j;
    let x;
    let rate = this.mutation_rate;
    let severity;
    let currDNA;
    for (i = 0; i < this.pop.length; i++) {
      x = round(random(0, 100));
      if (x < rate) {
        severity = round(random(1, 25));
        currDNA = this.pop[i].nn.getDNA();
        for (j = 0; j < severity; j++) {
          if (round(random(0, 1)) == 0) {
            if (round(random(0, 4)) == 0) {
              currDNA[0][round(random(0, 4))][round(random(0, 3))] = random(-1, 1);
            } else {
              currDNA[0][round(random(0, 4))][4] = random(-50, 50);
            }
          } else {
            if (round(random(0, 4)) == 0) {
              currDNA[1][round(random(0, 1))][round(random(0, 4))] = random(-1, 1);
            } else {
              currDNA[1][round(random(0, 1))][4] = random(-50, 50);
            }
          }
        }
        this.pop[i].nn.giveDNA(currDNA);
      }
    }*/
    
    let i, j, currDNA;
    
    for (i=0; i <this.pop.length; i++) {
      
      if (random(0, 100) > this.mutation_rate) {
        // Selecting which bit of DNA to edit :
        currDNA = this.pop[i].nn.getDNA();
        if (random(1) > 0.5) {
          
          if (random(0,4) >= 1) {
            currDNA[0][round(random(0,4))][round(random(0,3))] = random(-1,1);
          }
          else {
            currDNA[0][round(random(0,4))][4] = random(-50,50);
          }
          
        }
        
        else {
          
          
          if (random(0,4) >= 1) {
            currDNA[0][round(random(0,1))][round(random(0,4))] = random(-1,1);
          }
          else {
            currDNA[1][round(random(0,1))][5] = random(-50,50);
          }
          
          
        }
        this.pop[i].nn.giveDNA(currDNA);
    	} // Close Big if
    } // Close For
  } // Close method
  
  
  
  
  
}