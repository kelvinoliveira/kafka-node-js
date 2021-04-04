const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'kakfa-node-js',
  brokers: ['0.0.0.0:9092']
});

class KafkaConsumerService {

  constructor(groupName) {
    this.consumer = kafka.consumer({ groupId: `kafka-node-js-${groupName}-group` });
  }

  async connect() {
    return this.consumer.connect();
  }

  async readMessage(topic, eachMessageCallback) {
    await this.consumer.subscribe({ topic: topic, fromBeginning: false });
    await this.consumer.run({ eachMessage: eachMessageCallback });
  }
}

module.exports = { KafkaConsumerService };
