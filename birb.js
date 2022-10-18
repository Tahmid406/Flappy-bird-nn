class Birb {
  constructor(brain = new NeuralNetwork(5, 4, 1)) {
    this.position = createVector(200, height / 2);
    this.velocity = 0;
    this.accelaration = 0.5;
    this.alive = true;
    this.score = 0;
    this.fitness = 0;
    this.brain = brain;
  }

  jump() {
    this.velocity = -10;
  }

  predictMovement(gap) {
    let inputs = [];
    inputs[0] = this.position.y;
    inputs[1] = this.velocity;
    inputs[2] = gap.x + gap.gapWidth;
    inputs[3] = gap.gapPosition;
    inputs[4] = gap.gapPosition + gap.gapLength;
    const output = this.brain.predict(inputs);
    if (output > 0.5) this.jump();
  }

  mutate(mutationRate) {
    tf.tidy(() => {
      const weights = this.brain.model.getWeights();
      let mutatedWeights = [];
      for (let i = 0; i < weights.length; i++) {
        let shape = weights[i].shape;
        let values = weights[i].dataSync().slice();
        for (let j = 0; j < values.length; j++) {
          if (random() < mutationRate) values[j] += randomGaussian();
        }
        const newTensor = tf.tensor(values, shape);
        mutatedWeights[i] = newTensor;
      }
      this.brain.model.setWeights(mutatedWeights);
    });
  }

  update() {
    if (this.alive) {
      this.position.y += this.velocity;
      this.velocity += this.accelaration;
    }
    if (this.position.y > height || this.position.y < 0) {
      this.alive = false;
    }
  }

  show() {
    fill(255, 255, 102, 100);
    ellipse(this.position.x, this.position.y, 60, 60);
  }
}
