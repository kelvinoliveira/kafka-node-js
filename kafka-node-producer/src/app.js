const { KafkaProducerService } = require('./services/kafka-producer-service');

const kafkaTopic = process.env.KAFKA_TOPIC || 'temperature';

const run = async () => {
  const producer = new KafkaProducerService();
  await producer.connect();

  setInterval(async () => {
    const kelvinTemperature = Math.floor(Math.random() * 100);
    await producer.sendMessage(kafkaTopic, kelvinTemperature.toString());
  }, 1000);
};

run().catch(console.error);
