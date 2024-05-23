import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'backend-consumer',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'post-group' });

export const connectConsumer = async () => {
  await consumer.connect();
  console.log('Kafka consumer connected');
  
  await consumer.subscribe({ topic: 'posts', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Consumed message from topic ${topic}:`, {
        partition,
        offset: message.offset,
        value: message.value ? message.value.toString() : 'oops',
      });
    },
  });
};
