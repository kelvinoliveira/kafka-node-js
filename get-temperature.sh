#!/bin/bash
docker exec -it kafka_node_js_broker_1 /opt/kafka/bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic temperature
