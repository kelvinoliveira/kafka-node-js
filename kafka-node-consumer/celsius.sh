#!/bin/bash
cd kafka-node-consumer
if [ ! -d node_modules ]; then
  npm install
fi
KAFKA_TOPIC=temperature TEMPERATURE_NAME=Celsius TEMPERATURE_KELVIN_DIFF=-272.15 PORT=8092 node src/app.js
