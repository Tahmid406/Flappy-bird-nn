class NeuralNetwork {
  constructor(input, hidden, output) {
    this.input_nodes = input;
    this.hidden_nodes = hidden;
    this.output_nodes = output;
    this.model = this.createModel();
  }

  copy() {
    return tf.tidy(() => {
      let brainCopy = new NeuralNetwork(this.input_nodes, this.hidden_nodes, this.output_nodes);
      const weights = this.model.getWeights();
      let weightCopy = [];
      for (let i = 0; i < weights.length; i++) weightCopy[i] = weights[i].clone();
      brainCopy.model.setWeights(weightCopy);

      return brainCopy;
    });
  }

  predict(input) {
    return tf.tidy(() => {
      return this.model.predict(tf.tensor2d([input])).dataSync();
    });
  }

  createModel() {
    const model = tf.sequential();

    const hidden = tf.layers.dense({
      units: this.hidden_nodes,
      inputShape: [this.input_nodes],
      activation: "sigmoid",
    });
    const output = tf.layers.dense({
      units: this.output_nodes,
      activation: "sigmoid",
    });

    model.add(hidden);
    model.add(output);
    return model;
  }
}
