
### Authentication Routes

These routes handle user authentication (sign-up, login) and JWT-based authorization.

| HTTP Method | Endpoint             | Description                 | Headers                     | Body                                                         |
|-------------|----------------------|-----------------------------|-----------------------------|--------------------------------------------------------------|
| `POST`      | `/login`             | Login and get JWT token      | None                        | `{ "username": "yourUsername", "password": "yourPassword" }`  |
| `POST`      | `/signup`            | Register a new user          | None                        | `{ "username": "yourUsername", "email": "yourEmail", "password": "yourPassword", "role":"your role"}` |

### Organization Routes

These routes allow admins to create, retrieve, update, and delete organizations. Regular users can retrieve organization details.

| HTTP Method | Endpoint                     | Description                           | Headers                | Body                                                     |
|-------------|------------------------------|---------------------------------------|------------------------|----------------------------------------------------------|
| `GET`       | `/organization`              | Get all organizations                 | None                   | None                                                     |
| `GET`       | `/organization/:id`          | Get a specific organization by ID     | None                   | None                                                     |
| `POST`      | `/organization`              | Create a new organization (Admin)     | `Authorization: Bearer <token>` | `{ "personName": "John Doe", "positionName": "CEO", "image": <file> }` |
| `PUT`       | `/organization/:id`          | Update an organization by ID (Admin)  | `Authorization: Bearer <token>` | `{ "personName": "Updated Name", "positionName": "Updated Position", "image": <file> }` |
| `DELETE`    | `/organization/:id`          | Delete an organization by ID (Admin)  | `Authorization: Bearer <token>` | None                                                     |

### Event Routes

These routes allow admins to create, update, and delete events, while regular users can view events.

| HTTP Method | Endpoint            | Description                         | Headers                | Body                                                         |
|-------------|---------------------|-------------------------------------|------------------------|--------------------------------------------------------------|
| `GET`       | `/events`           | Get all events                      | None                   | None                                                         |
| `GET`       | `/events/:id`       | Get a specific event by ID          | None                   | None                                                         |
| `POST`      | `/events`           | Create a new event (Admin)          | `Authorization: Bearer <token>` | `{ "title": "Event Title", "description": "Event Description", "date": "YYYY-MM-DD", "image": <file> }` |
| `PUT`       | `/events/:id`       | Update an event by ID (Admin)       | `Authorization: Bearer <token>` | `{ "title": "Updated Title", "description": "Updated Description", "date": "YYYY-MM-DD", "image": <file> }` |
| `DELETE`    | `/events/:id`       | Delete an event by ID (Admin)       | `Authorization: Bearer <token>` | None                                                         |

### Discussion Routes

These routes allow users to create, view, update, and delete discussions.

| HTTP Method | Endpoint              | Description                           | Headers                | Body                                                              |
|-------------|-----------------------|---------------------------------------|------------------------|-------------------------------------------------------------------|
| `GET`       | `/discussions`        | Get all discussions                   | None                   | None                                                              |
| `GET`       | `/discussions/:id`    | Get a specific discussion by ID       | None                   | None                                                              |
| `POST`      | `/discussions`        | Create a new discussion               | `Authorization: Bearer <token>` | `{ "title": "Discussion Title", "content": "Discussion Content" }` |
| `PUT`       | `/discussions/:id`    | Update an existing discussion by ID   | `Authorization: Bearer <token>` | `{ "title": "Updated Title", "content": "Updated Content" }`       |
| `DELETE`    | `/discussions/:id`    | Delete a discussion by ID             | `Authorization: Bearer <token>` | None                                                              |

### Project Routes

These routes allow admins to create, update, and delete projects, while regular users can view projects.

| HTTP Method | Endpoint            | Description                         | Headers                | Body                                                              |
|-------------|---------------------|-------------------------------------|------------------------|-------------------------------------------------------------------|
| `GET`       | `/projects`         | Get all projects                    | None                   | None                                                              |
| `GET`       | `/projects/:id`     | Get a specific project by ID        | None                   | None                                                              |
| `POST`      | `/projects`         | Create a new project (Admin)        | `Authorization: Bearer <token>` | `{ "title": "Project Title", "description": "Project Description", "startDate": "YYYY-MM-DD", "endDate": "YYYY-MM-DD" }` |
| `PUT`       | `/projects/:id`     | Update an existing project by ID    | `Authorization: Bearer <token>` | `{ "title": "Updated Title", "description": "Updated Description", "startDate": "YYYY-MM-DD", "endDate": "YYYY-MM-DD" }` |
| `DELETE`    | `/projects/:id`     | Delete a project by ID (Admin)      | `Authorization: Bearer <token>` | None                                                              |

### Headers

Most routes require a **JWT token** in the `Authorization` header to authenticate and authorize requests.

```bash
Authorization: Bearer <token>
