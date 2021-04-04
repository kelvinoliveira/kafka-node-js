#!/bin/bash
cd kafka-node-consumer
if [ ! -d node_modules ]; then
  npm install
fi
KAFKA_TOPIC=temperature TEMPERATURE_NAME=Fahrenheit TEMPERATURE_KELVIN_DIFF=-457.87 PORT=8093 node src/app.js
