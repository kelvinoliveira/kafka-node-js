const SSE = require('express-sse');
const sse = new SSE();

const { KafkaConsumerService } = require('../services/kafka-consumer-service');

const kafkaTopic = process.env.KAFKA_TOPIC || 'temperature';
const temperatureName = process.env.TEMPERATURE_NAME || 'Kelvin';
const temperatureKelvinDiff = Number(process.env.TEMPERATURE_KELVIN_DIFF || 0);

class TemperatureController {

  getTemperatureName(req, res) {
    return res.send(temperatureName);
  }

  getStream(req, res) {
    return sse.init(req, res);
  }

  async listenMessages() {
    const consumer = new KafkaConsumerService(temperatureName.toLocaleLowerCase());
    await consumer.connect();

    await consumer.readMessage(kafkaTopic, ({ message }) => {
      const kelvinTemperature = Number(message.value.toString());

      let temperature = kelvinTemperature + temperatureKelvinDiff;
      temperature = Math.round(temperature * 100) / 100;

      sse.send(temperature);
    });
  }
}

module.exports = { TemperatureController };