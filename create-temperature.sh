#!/bin/bash
docker exec -it kafka_node_js_broker_1 /opt/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --topic temperature
