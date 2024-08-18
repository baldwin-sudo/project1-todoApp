# Project1 Todo App

## Overview

This project is a Todo application built with a React frontend, a Node.js backend, and MongoDB for data storage. It uses Docker Compose for containerization.

## Technologies

- **Frontend**: React
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Containerization**: Docker and Docker Compose

## Setup

### Prerequisites

- Docker
- Docker Compose

### Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/baldwin-sudo/project1-todoApp.git
    cd project1-todoApp
    ```

2. **Build and start the containers:**

    ```bash
    docker compose up --build
    ```

3. **Access the application:**

    - Frontend: [http://localhost:5173](http://localhost:5173)
    - API: [http://localhost:3002](http://localhost:3002)

### Project Structure

- **`frontend/`**: Contains the React frontend code.
- **`back/`**: Contains the Node.js backend code.
- **`mongo/`**: Contains the Dockerfile for the MongoDB container.
- **`docker-compose.yml`**: Docker Compose configuration file.

## Troubleshooting

- **Network Issues**: Ensure Docker and Docker Compose are installed and running correctly.
- **CORS Issues**: Verify CORS settings and the frontend URL in the backend configuration.
- **DNS Resolution**: Use service names (e.g., `api`, `front`) to connect containers.

## Contributing

Feel free to open issues and pull requests to contribute to the project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
