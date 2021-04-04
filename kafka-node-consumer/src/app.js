const { KafkaConsumerService } = require('./services/kafka-consumer-service');

const kafkaTopic = process.env.KAFKA_TOPIC || 'temperature';
const temperatureName = process.env.TEMPERATURE_NAME || 'kelvin';
const temperatureKelvinDiff = Number(process.env.TEMPERATURE_KELVIN_DIFF || 0);

const run = async () => {
  const consumer = new KafkaConsumerService(temperatureName.toLocaleLowerCase());
  await consumer.connect();

  await consumer.readMessage(kafkaTopic, ({ message }) => {
    const kelvinTemperature = Number(message.value.toString());

    let temperature = kelvinTemperature + temperatureKelvinDiff;
    temperature = Math.round(temperature * 100) / 100;

    console.log({ kelvinTemperature, temperatureName, temperature });
  });
};

run().catch(console.error);
