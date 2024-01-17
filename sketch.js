let p = [];
let myPop;
let frames = 0;
let g;
let RUN = true;
let highScore = 0;
let generation = 1;
let b1, b2, b3, b4, b5, b6, b7;
let video;

// Testing Tillmans Account

function setup() {
  createCanvas(800, 400);
  append(p, new Pipe());
  myPop = new Pop(500, 10);
  g = createVector(0, 0.2);
  textSize(30);
  frameRate(1000);

  //Buttons
  let buttonGap = 40;

  b1 = new Button(false, "bar", 750, buttonGap, [0, 255, 0]);
  b2 = new Button(false, "bar", 750, buttonGap * 2, [0, 0, 255]);
  b3 = new Button(false, "bar", 750, buttonGap * 3, [255, 0, 0]);
  b4 = new Button(false, "bar", 750, buttonGap * 4, [0, 255, 0]);
  b5 = new Button(false, "bar", 750, buttonGap * 5, [0, 0, 255]);
  b6 = new Button(false, "bar", 750, buttonGap * 6, [255, 0, 0]);
  b7 = new Button(false, "bar", 750, buttonGap * 7, [0, 255, 0]);

}

function draw() {



  if (RUN) {
    frames += 1;
    background(34, 128, 178);



    for (i = 0; i < p.length; i++) {
      p[i].update();
      p[i].draw();
    }

    myPop.applyForce(g);
    myPop.update(p);
    myPop.draw();


    if (myPop.currDead) {
      myPop.currDead = false;
      RUN = false;
    }

    // Deletes any pipes that are off the end of the screen
    if (p[0].dead()) {
      p.splice(0, 1);
    }

    if (frames % 200 == 0) {
      append(p, new Pipe());
    }

    // Finds the nearest pipe to the players.
    let currentPipe;
    for (i = 0; i < p.length; i++) {
      if (p[i].pos.x > p[i].pipeWidth) {
        currentPipe = p[i];
        break;
      }
    }


    myPop.bounce(currentPipe);

    stroke(255, 0, 0);
    strokeWeight(5);
    line(20, myPop.averageY(), 60, myPop.averageY());
    stroke(0);
    strokeWeight(1);

    fill(0);
    textSize(15);

    if (frames > highScore) {
      highScore = frames;
    }

    text(str(frames), 400 - 50, 23);
    text("Highscore : " + str(highScore), 3 * 400 / 4 - 50, 400 - 23);
    text("Gen : " + str(generation), 400 / 4 - 50, 400 - 23);
    text(str(myPop.aliveNum()), 400 / 4 - 30, 23);

    fill(255, 0, 0);
    rect(400 / 4, 10, 200, 10);
    fill(0, 255, 0);
    rect(400 / 4, 10, myPop.aliveNum() / myPop.pop.length * 200, 10);

  } else {
    myPop.nextGen();

    // ------- RESET ALL VARIABLES EXCEPT MYPOP --------

    frames = 0;
    p = [];
    append(p, new Pipe());
    RUN = true;
    generation += 1;
  }

  // -------- Graph Drawing Zone --------
  fill(255);
  rect(400, 0, 400, 400);


  fill(0);
  stroke(0);

  text("Generation : " + str(generation - 1), 550, 20);

  //Graph Box

  fill(0);
  rect(500, 100, 200, 200);

  // Buttons 

  b1.draw();
  b2.draw();
  b3.draw();
  b4.draw();
  b5.draw();
  b6.draw();
  b7.draw();



}
