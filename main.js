let bird;
let gaps = [];
let frame = 0;
let population;
let generation = 0;
let bestScore = 0;

function setup() {
  createCanvas(innerWidth, innerHeight);
  tf.setBackend("cpu");
  population = new Population(250, 0.01);
  noStroke();
  textSize(20);
}

function draw() {
  if (frame % 100 == 0) {
    gaps.push(new Gap());
  }
  background(135, 211, 248);

  population.simulate();

  gaps.forEach((gap, i) => {
    gap.show();
    if (gap.x < -gap.gapWidth) {
      setTimeout(() => {
        gaps.splice(i, 1);
      }, 0);
    }
  });

  fill(0);
  text("Population: " + population.birds.length, 10, 30);
  text("Generation: " + generation, 10, 60);
  text("Current Score: " + population.birds[0].score, 10, 120);
  text("Best Score: " + population.bestBird.score, 10, 150);

  frame += 1;
}
