class NeuralNetwork {

    constructor(a, b, c, d) {
        if (a instanceof tf.Sequential) {
            this.model = a
            this.input_nodes = b;
            this.hidden_nodes = c;
            this.outpur_nodes = d;
        } else {
            this.input_nodes = a;
            this.hidden_nodes = b;
            this.outpur_nodes = c;
            this.model = this.createModel();
        }
    }

    copy() {
        const modelCopy = this.createModel()
        const weights = this.model.getWeights();
        const weightsCopies = []
        for (let i = 0; i < weights.length; i++) {
            weightsCopies[i] = weights[i].clone();
        }

        modelCopy.setWeights(weightsCopies)
        return new NeuralNetwork(
            modelCopy,
            this.input_nodes,
            this.hidden_nodes,
            this.outpur_nodes
        )
    }

    mutate(rate) {
        const weights = this.model.getWeights();
        const mutatedWeights = [];
        for (let i = 0; i < weights.length; i++) {
            let tensor = weights[i]
            let shape = weights[i].shape
            let values = tensor.dataSync().slice();

            for (let j = 0; j < values.length; j++) {
                if (random(1) < rate) {
                    let w = values[j];
                    values[j] = w + randomGaussian();
                }
            }

            let newTensor = tf.tensor(values, shape)
            mutatedWeights[i] = newTensor
        }
        this.model.setWeights(mutatedWeights)
    }

    dispose() {
        this.model.dispose();
    }

    predict(inputs) {
        const xs = tf.tensor2d([inputs])
        const ys = this.model.predict(xs)
        const outputs = ys.dataSync();
        return outputs
    }

    createModel() {
        const model = tf.sequential();
        const hidden = tf.layers.dense({
            units: this.hidden_nodes,
            inputShape: [this.input_nodes],
            activation: 'sigmoid'
        })
        model.add(hidden)

        const output = tf.layers.dense({
            units: this.outpur_nodes,
            activation: 'softmax'
        })
        model.add(output)
        return model
    }
}