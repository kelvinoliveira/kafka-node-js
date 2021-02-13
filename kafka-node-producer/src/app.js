const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'kakfa-node-js',
  brokers: ['0.0.0.0:9092', '0.0.0.0:9092']
});

const producer = kafka.producer();

const sendMessage = async () => {
  const kelvinTemperature = Math.floor(Math.random() * 100);

  await producer.send({
    topic: 'temperature',
    messages: [
      { value: kelvinTemperature.toString() },
    ],
  });
};

const run = async () => {
  await producer.connect();

  setInterval(sendMessage, 1000);
};

run().catch(console.error);