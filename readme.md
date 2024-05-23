## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Docker Setup](#docker-setup)
- [Kafka Setup](#kafka-setup)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Getting Started

### Clone the Repository

## Backend
cd backend
npm install

## Frontend
cd frontend
npm install

# Running the Application Without Docker

### Backend
cd backend
npm run build
npm start

### Frontend
cd frontend
npm start
With Docker

### Build and Run
docker compose up --build

# API Endpoints
POST /api/users/register: Register a new user
POST /api/users/login: Login a user
GET /api/posts: Get all posts for the logged-in user
POST /api/posts: Create a new post
PUT /api/posts: Update an existing post
DELETE /api/posts/:id: Delete a post
Environment Variables

# Create a .env file in the backend directory with the following content:

MYSQL_HOST=mysql
MYSQL_USER=root
MYSQL_PASSWORD=rootpassword
MYSQL_DATABASE=testdb
MONGO_URI=mongodb://mongo:27017/testdb
JWT_SECRET=your_jwt_secret
KAFKA_BROKER=kafka:9092
FRONTEND_URL=http://localhost:3000

# Create a .env file in the frontend directory with the following content:

REACT_APP_BACKEND_URL=http://localhost:3001

# Docker Setup

## Running Docker Compose
docker compose up --build

## Stopping Docker Compose
docker compose down
Kafka Setup
Kafka is used for messaging when a new post is created. The Kafka producer and consumer are set up in the backend.

## Kafka Producer
The producer sends a message to the Kafka topic posts when a new post is created.

## Kafka Consumer
The consumer logs messages from the Kafka topic posts.

## Troubleshooting
Common Issues
Ensure Docker is running.
Check if the necessary ports are available (3000, 3001, 3306, 27017, 2181, 9092).