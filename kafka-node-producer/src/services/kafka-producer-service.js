const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'kakfa-node-js',
  brokers: ['0.0.0.0:9092']
});

class KafkaProducerService {

  constructor() {
    this.producer = kafka.producer();
  }

  async connect() {
    return this.producer.connect();
  }

  async sendMessage(topic, messageValue) {
    await this.producer.send({ topic, messages: [{ value: messageValue }] });
  }
}

module.exports = { KafkaProducerService };
