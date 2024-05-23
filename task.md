Objective: Build a simple full-stack application that allows users to register, log in, and create posts. The application should use Node.js for the backend, React.js for the frontend, MySQL and MongoDB for data storage, and Docker for containerization.
Requirements
Backend (Node.js):
- Set up an Express.js server.
- Create RESTful API endpoints for user registration, login, and CRUD operations on posts.
- Use MySQL to store user data (registration and login information).
- Use MongoDB to store post data.
- Implement JWT (JSON Web Token) for authentication.
Frontend (React.js):
- Create a user registration and login form.
- After logging in, display a form to create a new post.
- Display a list of posts created by the logged-in user.
- Use React Router for navigation between the registration, login, and post creation views.
Database:
- MySQL: Set up a table for users with fields for user ID, username, email, and password.
- MongoDB: Set up a collection for posts with fields for post ID, user ID, title, content, and timestamp.
Docker:
- Create Dockerfiles for the backend and frontend.
- Use Docker Compose to manage multi-container applications (Node.js server, React app, MySQL, MongoDB).
Messaging (Kafka or MQTT):
- Implement a simple messaging feature where a message is sent to Kafka/MQTT when a new post is created.
- Set up a Kafka/MQTT consumer that logs these messages to the console.
Documentation:
- Provide a README file with instructions on how to build and run the application using Docker Compose.
- Include instructions for setting up the MySQL and MongoDB databases.
Evaluation Criteria
- Code Quality: Clean, well-documented, and modular code.
- Functionality: The application meets all the specified requirements.
- Architecture: Proper use of technologies and adherence to best practices.
- Security: Implementation of JWT for authentication and secure handling of user data.
- Dockerization: Correct use of Docker and Docker Compose to containerize the application.
- Messaging: Correct implementation of Kafka/MQTT for messaging.
Submission
- Provide a link to a public Git repository (GitHub, GitLab, etc.) containing the project code.
- Ensure the repository includes the Dockerfiles, Docker Compose file, and the README with setup instructions.