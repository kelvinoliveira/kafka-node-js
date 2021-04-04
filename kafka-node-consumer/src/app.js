const express = require('express');
const SSE = require('express-sse');
const sse = new SSE();

const { KafkaConsumerService } = require('./services/kafka-consumer-service');

const kafkaTopic = process.env.KAFKA_TOPIC || 'temperature';
const temperatureName = process.env.TEMPERATURE_NAME || 'Kelvin';
const temperatureKelvinDiff = Number(process.env.TEMPERATURE_KELVIN_DIFF || 0);
const port = process.env.PORT;

const app = express();

app.use(express.static('src/public'));

app.get('/temperature/name', (req, res) => {
  res.send(temperatureName);
})

app.get('/temperature/stream', sse.init);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});

const run = async () => {
  const consumer = new KafkaConsumerService(temperatureName.toLocaleLowerCase());
  await consumer.connect();

  await consumer.readMessage(kafkaTopic, ({ message }) => {
    const kelvinTemperature = Number(message.value.toString());

    let temperature = kelvinTemperature + temperatureKelvinDiff;
    temperature = Math.round(temperature * 100) / 100;

    sse.send(temperature);
  });
};

run().catch(console.error);
