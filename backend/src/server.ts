import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectMySQL } from './config/mysql';
import { connectMongoDB } from './config/mongo';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import { connectProducer } from './kafka/producer';
import { connectConsumer } from './kafka/consumer';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

connectProducer();
connectConsumer();

const startServer = async () => {
  await connectMySQL();
  await connectMongoDB();
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();
