import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || '',
  process.env.MYSQL_USER || '',
  process.env.MYSQL_PASSWORD || '',
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
  }
);

export const connectMySQL = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connection has been established successfully.');

    await sequelize.sync({ alter: true }); // drop and recreate the table

    console.log('MySQL models synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the MySQL database:', error);
  }
};
