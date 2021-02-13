const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'kakfa-node-js',
  brokers: ['0.0.0.0:9092', '0.0.0.0:9092']
})

const consumer = kafka.consumer({ groupId: 'kafka-node-js-group' });

const readMessage = async ({ message }) => {
  const kelvinTemperature = Number(message.value.toString());
  const kelvinDiff = Number(process.env.KELVIN_DIFF || 0);

  const temperatureName = process.env.TEMPERATURE_NAME;
  const temperature = kelvinTemperature + kelvinDiff;

  console.log({ temperatureName, temperature });
}

const run = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic: 'temperature' });

  await consumer.run({ eachMessage: readMessage });
}

run().catch(console.error);