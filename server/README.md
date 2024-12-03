## Server

The server is built with MongoDB, Express, Typescript and Node. It provides a REST API for managing todos.

#### Setup

```bash
npm install && npm run dev
```

### Directory Structure

- `src/routes`: Contains the routes for the API.
- `src/controllers`: Contains the controllers for handling requests.
- `src/models`: Contains the data models.
- `src/middleware`: Contains middleware functions.
- `src/interface`: Contains TypeScript interfaces.
- `src/exceptions`: Contains custom exception classes.

## API Design

The API is designed to handle the following endpoints:

- `POST /api/v1/users/register`: Register a new user.
- `POST /api/v1/users/login`: Login a user.
- `GET /api/v1/todos`: Retrieve a list of all todos.
- `GET /api/v1/todos/user`: Retrieve a list of all todos created by a user.
- `GET Single Todo /api/v1/todos/user/:id`: Retrieve a single todo created by a user.
- `DELETE /api/v1/todos/delete/:id`: Delete a todo created by a user.
- `DATCH /api/v1/todos/update/:id`: Edit a todo created by a user.


## API Link

Access the deployed api url at [Project-Link](https://eukapay-todo.onrender.com/)

#### Database Connection

1. Import connect.js
2. Invoke in start()
3. Setup .env in the root
4. Add MONGO_URI with correct value

#### Security

- helmet
- cors
- express-rate-limit

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

