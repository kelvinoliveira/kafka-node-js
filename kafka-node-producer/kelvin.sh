#!/bin/bash
cd kafka-node-producer
if [ ! -d node_modules ]; then
  npm install
fi
KAFKA_TOPIC=temperature node src/app.js
