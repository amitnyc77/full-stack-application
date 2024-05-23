import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'backend',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092']
});

const producer = kafka.producer();

export const connectProducer = async () => {
  await producer.connect();
  console.log('Kafka producer connected');
};

export const sendMessage = async (topic: string, message: string) => {
  await producer.send({
    topic,
    messages: [
      { value: message },
    ],
  });
};
