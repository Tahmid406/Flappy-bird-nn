class Population {
  constructor(maxBirds, mutationRate) {
    this.maxBirds = maxBirds;
    this.mutationRate = mutationRate;
    this.birds = [];
    this.bestBird = new Birb();
    this.totalScore = 0;
    this.newGenerationBirds = [];

    for (let i = 0; i < this.maxBirds; i++) {
      this.birds.push(new Birb());
    }
  }

  simulate() {
    this.birds.forEach((bird, i) => {
      bird.update();
      if (!bird.alive) {
        this.newGenerationBirds.push(this.birds.splice(i, 1)[0]);
        return;
      }
      bird.show();
      bird.predictMovement(gaps[0].x + gaps[0].gapWidth > 200 ? gaps[0] : gaps[1]);
      gaps[0].update(bird);
    });

    if (this.birds.length <= 0) this.newGeneration();
  }

  calcTotalScore() {
    let sum = 0;
    this.newGenerationBirds.forEach((bird) => {
      sum += bird.score;
      if (bird.score > this.bestBird.score) this.bestBird = bird;
    });
    this.totalScore = sum;
  }

  normalizeFitness() {
    this.newGenerationBirds.forEach((bird) => {
      bird.fitness = bird.score / this.totalScore;
    });
  }

  naturalSelection() {
    let i = 0;
    let r = Math.random();

    while (r > 0) {
      r -= this.newGenerationBirds[i].fitness;
      i++;
    }
    i--;
    return this.newGenerationBirds[i];
  }

  newGeneration() {
    this.calcTotalScore();
    this.normalizeFitness();

    if (this.totalScore > 0) {
      this.birds = [];
      for (let i = 0; i < this.maxBirds; i++) {
        let child = this.naturalSelection();
        child.mutate(this.mutationRate);
        this.birds[i] = new Birb(child.brain.copy());
      }
    } else {
      for (let i = 0; i < this.maxBirds; i++) {
        this.birds[i] = new Birb();
      }
    }

    this.newGenerationBirds = [];
    generation++;
    frame = 0;
    gaps = [new Gap()];
  }
}
