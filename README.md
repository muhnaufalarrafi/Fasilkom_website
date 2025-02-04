# Fasilkom Website Backend

This repository contains the backend code for the **Fasilkom Website**, which serves as the core API and data management system for managing events, discussions, organizations, and user authentication for the Fasilkom website. Built with Node.js and Express, this backend interacts with a MySQL/Sequelize database and provides secure access to the data via RESTful APIs.

**Create By : Muhammad Naufal Arrafi**

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Organizations](#organizations)
  - [Events](#events)
  - [Discussions](#discussions)
  - [Projects](#projects)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Role-based access control using JWT tokens for secure login and restricted admin access.
- **CRUD Operations**: Perform Create, Read, Update, and Delete operations for organizations, events, discussions, and projects.
- **File Uploads**: Image uploads for organizations, events, and other entities via `Multer`.
- **Admin Panel**: Provides specific routes for admin roles to manage data more effectively.
- **MySQL Database Integration**: Utilizing Sequelize as the ORM for managing the MySQL database.

## Technologies

- **Node.js**: JavaScript runtime for building scalable network applications.
- **Express.js**: Minimalist web framework for building APIs.
- **Sequelize**: Promise-based ORM for managing database models and queries.
- **MySQL**: Relational database for managing structured data.
- **JWT (JSON Web Tokens)**: For secure authentication and authorization.
- **Multer**: Middleware for handling `multipart/form-data` for file uploads.
- **bcrypt**: For password hashing and secure storage.

## Setup

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v14 or above)
- **MySQL** (v8 or above)
- **Git**

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/muhnaufalarrafi/Fasilkom_website.git
    cd Fasilkom_website/backend
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the backend directory and configure the environment variables (See Environment Variables).

4. Set up the database:

    Ensure MySQL is running.
    
    - Create a database for the project in MySQL.
    - Run the Sequelize migrations:
    
    ```bash
    npx sequelize-cli db:migrate
    ```

5. Start the development server:

    ```bash
    npm start
    ```

    The backend server will run on `http://localhost:5000`.

## API Endpoints

### Authentication

- `POST /api/login`: User login and generate a JWT token.
- `POST /api/signup`: Register a new user.

### Organizations

- `GET /api/organization`: Retrieve all organizations.
- `GET /api/organization/:id`: Retrieve a specific organization by ID.
- `POST /api/organization`: Create a new organization (Admin-only).
- `PUT /api/organization/:id`: Update an existing organization (Admin-only).
- `DELETE /api/organization/:id`: Delete an organization (Admin-only).

### Events

- `GET /api/events`: Retrieve all events.
- `GET /api/events/:id`: Retrieve a specific event by ID.
- `POST /api/events`: Create a new event (Admin-only).
- `PUT /api/events/:id`: Update an existing event (Admin-only).
- `DELETE /api/events/:id`: Delete an event (Admin-only).

### Discussions

- `GET /api/discussions`: Retrieve all discussions.
- `GET /api/discussions/:id`: Retrieve a specific discussion by ID.
- `POST /api/discussions`: Create a new discussion.
- `PUT /api/discussions/:id`: Update an existing discussion.
- `DELETE /api/discussions/:id`: Delete a discussion.

### Projects

- `GET /api/projects`: Retrieve all projects.
- `GET /api/projects/:id`: Retrieve a specific project by ID.
- `POST /api/projects`: Create a new project (Admin-only).
- `PUT /api/projects/:id`: Update an existing project (Admin-only).
- `DELETE /api/projects/:id`: Delete a project (Admin-only).

## Environment Variables

Create a `.env` file in the backend directory and configure the following variables:

```bash
PORT=YOUT_PORT
DATABASE_NAME=<your_database_name>
DATABASE_USER=<your_mysql_username>
DATABASE_PASSWORD=<your_mysql_password>
JWT_SECRET=<your_jwt_secret>
```

### Database
The application uses MySQL as the database. Models are defined using Sequelize.

- Organization: Contains organization details (person name, position, image).
- Event: Stores event data (title, date, description, image).
- Discussion: Stores discussions created by users.
- Project: Stores project data relevant to the organization.
- Ensure that your MySQL database is set up correctly with proper permissions, and the Sequelize migrations have been run to initialize the schema.

### Folder Structure
```
backend/
├── controllers/
│   ├── authController.js
│   ├── eventController.js
│   ├── organizationController.js
│   └── ...
├── middlewares/
│   ├── authMiddleware.js
│   └── uploadMiddleware.js
├── models/
│   ├── Organization.js
│   ├── Event.js
│   └── ...
├── routes/
│   ├── authRoutes.js
│   ├── organizationRoutes.js
│   └── eventRoutes.js
├── uploads/
│   └── (Stores uploaded images)
├── config/
│   └── config.js (Sequelize DB config)
├── app.js
└── server.js
```
### Contributing
Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create your feature branch:
```
git checkout -b feature/YourFeature
```
3. Commit your changes:
```
git commit -m 'Add some feature'
```
4. Push to the branch:
```
git push origin feature/YourFeature
```
5. Submit a pull request.

### License
```

Pastikan Anda memeriksa indentasi dan penggunaan tanda backticks (\`) untuk penulisan blok kode. Ini harus memperbaiki preview di GitHub Anda.
```
