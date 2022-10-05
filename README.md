# Express.js Backend Server Boilerplate
This is a boilerplate Express.js / PostgreSQL REST API starter project. It is built using the TDD (Test Driven Development) methodology and includes an example `GET`, `POST` and `DELETE` routes. The project is also Dockerized. 

<br>You can fork this project to begin building RESTful APIS using Express.js/Node.js.

## Technologies used
- Docker
- PostgreSQL
- Node.js
- Express.js 
- Prettier
- Jest
- Supertest
- Prettier

## Requirements
- You should have Docker Desktop installed on your local machine.
- You should create a Docker volume: `postgres-data` to persist database data.
- You should have Node and npm installed on your machine to run the npm scripts.
- You should run the docker container in a Linux/MacOS environment to enable hot reloading (Nodemon) in the container.
- You should have an `.env` file created in the root directory of this project. Details of `.env` file will be provided below.

### Environment File Contents

Create `.env` file, put in root directory. Contents:

```
BACKEND_PORT=8085
FRONTEND_PORT=5000

POSTGRES_USER=postgres
POSTGRES_PASSWORD=<choose any password>
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_DB=defaultdb

FRONTEND_APP_URL=<For deployment, not needed for local development.>
```
## Scripts
- `npm run test` to run automated tests built using Jest and Supertest.
- `npm run start` to start project using Node
- `npm run dev` to start project using Nodemon (Auto Refresh on change)
- `npm run beautify` to run Prettier on project (CI/CD code beautification tool)
- `npm run docker-compose-down` to stop running Dockerized containers built by `docker-compose.yml` and removes the stopped containers.
- `npm run docker-compose-up:dev` to create and start containers built by `docker-compose.yml`.
- `npm run docker:dev` to automate building of containers, running `docker-compose up` and `docker-compose down` as well as real time logging including `docker-compose logs`.

You should be able to start the application using `npm run docker:dev`

## General development guide
### Setup
- Make sure you have Docker on your machine. Use the command `docker ps` to check.
- Create the postgres volume.
```
// Creating the docker volume
docker volume create postgres-data

// Check if volume was created
docker volume ls
```

- Create the `.env` file and put it in the root directory.
- Run the command `npm run docker:dev` to start the docker container.
- You should see this if the container was run correctly.

```
Server has successfully started on port: 8085
```

### Prettier, code beautification
To achieve a similar standard of coding standards throughout the codebase, run `npm run beautify` before every code commit.
### Test Driven Development (TDD)
#### Methodology
This project was created with TDD in mind. This means that software test cases are written before developing the software completely. For more information: https://blog.logrocket.com/node-js-express-test-driven-development-jest/

### Running tests
- Try to use a Linux / MacOS distribution to start the container.
- Run the tests inside the container
- To run tests inside container, use the command: 
```
// To get container name
docker ps

// This will start the terminal shell in container
docker exec -it <your container name> sh

# npm run tests
```

### Structure of the project

The project is divided into 3 main sections:
- `src`: all source code pertaining to the REST API server.
- `db`: all databases configuration and code.
- `test`: all tests.

#### src
```
├── src (source code directory)
|   ├── controller (contains all business logic)
|   |   ├── vehicle.js (Vehicle Controller)
|   |   ├── ... 
|   ├── lib (contains a library of other functions used throughout the project)
|   |   ├── utils (utility functions)
|   |   ├── vehicle (Vehicle functions)
|   |   ├── ... 
|   ├── middleware (Express middleware)
|   ├── routes (Routers used throughout the project)
|   ├── app.js (main application builder)
|   ├── server.js (Build app and server to ports)
```

- `controller` contains all business logic in the project. For example, logic needed to complete certain features (getting vehicles, deleting vehicles, etc...)
- `lib` contains all other functions needed in the project. It can be further subdivided into `utils` (which contains utility functions used throughout all modules) and `<controller based functions>` which contains functions used in the specific controller/service subdomain only.
- `middleware` contains all Express middleware used thorughout the project
- `routes` contains all the API routes used in the project. They are linked to the controller
- `app.js` is the application builder based on a Database object `(Depedency Injection)`
- `server.js` is the main entrypoint of the application. It builds an app and serves to it to ports.
  - CORS (Cross origin resoure sharing) is also enabled for the frontend. It is controlled using the `FRONTEND_PORT` (local) and `FRONTEND_APP_URL` (production) environment variables. 

#### db
```
├── db (database directory)
|   ├── psql (PostgreSQL database Object)
|   |   ├── relations
|   |   |   ├── index (entrypoint to database.js)
|   |   |   ├── vehicle (Vehicle Table relation)
|   |   |   ├── ...
|   ├── config.js (config file)
|   ├── database.js (helps map database relations)
|   ├── index.js (Main entrypoint to server.js.)
```
- More info on dependency injection: https://www.youtube.com/watch?v=yOC0e0NMZ-E&ab_channel=SamMeech-Ward
- The database is injected into the express app. 
- Each relation is accessed through its own file and has their own functions to query the database. 
- A config file helps build the database using `.env` variables set.

#### tests
Tests are also subdivided into their own directories mapped to the project structure.

