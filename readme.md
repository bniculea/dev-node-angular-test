# Application details

## Content

1. Project structure
2. How to run
   - Tools needed
   - Step by step
3. Known problems and limitations

## 1. Project Structure

- My project is structured in 3 bigger parts:
  - The Client application
  - The Server application
  - The Docker compose file

### The **Client** application

- It is an Angular 10 application
- Currently there are only 4 views in the application:
  1. The Login page
     - Here, everyone can log in as long as the username and password fields are filled.
     - The user is persisted across the entire navigation
       - Note: at refresh, you will be redirected to the login page
  2. The Landing page
     - Here the user is able to choose from the hamburger menu where to navigate
  3. The Generate data view
     - Here the user is able to trigger a new data insertion into the database. More on this in the description of the server application
  4. The Performance check view
     - Here the user is able to see how much time it took the server to aggregate the entire collection, in high resolution milliseconds
- As soon as the user is logged in, the navigation bar should display the name of the logged in user and also the logout button

#### Dockerization

- The client app will be dockerized and it will run in a Nginx server instance.
- The docker image resulted will be a combination of two base images, namely the `node:12` image and the `nginx` image.
- The server will simply run the static files generated after running the `build` command in `production` mode.

#### Local run

- In order to run this application on your local machine, make sure that you are in the `client` folder and then run `ng serve --open`.
  - I do recomend to run by following the guidelines in the [Step by step section](<#step-by-step-running-procedure-(docker-only)>))

### The **Server** application

- It is a Node.js application which exposes its api using a HapiJS server.
- The application exposes the following 3 endpoints
  - `/health`
    - This api expects a `GET` request and checks if the connection to the MongoDB is successfully running.
    - If the connection is up and running, a `200` status code the following payload will be returned:
      ```json5
      {
        mongoState: "UP",
      }
      ```
    - If the connection to the MongoDB is lost, a `503` code and the following payload will be returned:
      ```json5
      {
        mongoState: "Down",
      }
      ```
  - `/create`
    - This api accepts a `POST` request and it will trigger the addition of random data into the database
    - Each time this endpoint is called, a random number between 12 and 50 `users` will be entered
    - If the operation successfully finishes, a `201` status code and the following paylod will be returned:
      ```json5
      {
        message: "Successfully generated data",
      }
      ```
    - If a problem occurs during the call of this endpoint, a `503` status code and the following paylod will be returned:
      ```json5
      {
        message: "There was a problem while generating data",
      }
      ```
  - `/time`
    - This api accepts a `GET` request and it will return the aggregation time of the entire MongoDB `users` collection. More on this below, in the data model description.
    - The time will be returned in high resolution milliseconds
    - If the call is successfull, a `200` status code a payload similar to the one below will be returned:
      ```json5
      {
        duration: 11.455657667,
      }
      ```
    - If there was a problem during while aggregating the data, a `503` status code and the following payload will be returned:
      ```json5
      {
        message: "Something bad happened on our side! Please try again later",
      }
      ```

### Data model

- The data model of this application is very simple.
- There is only one entity present in the database and has the following schema:

```json5
    firstName: String,
    lastName: String,
    email: String,
    country: String,
    age: Number,
```

- In order to generate data and avoid the user to endlessly insert test data, I have used the [faker](https://www.npmjs.com/package/faker) package which will randomly create data for me.
  - Just to play with the simulation, each time when the addition is performed, a random number between 12 and 50 of users will be created using the `faker` api. Also, the age of each user will be randomly selected, from a range of values between `1` and `100`.

#### Aggregation performed

- The aggregation of the data inside the `users` collection is very simple and it will perform the following logic:
  - It will calculate the age of the people from each country and then it will see if the population is mostly young (below 50 years as age) or older (above 50 years as age).

### HapiJS plugins

- The Server applications makes use of two HapiJS plugin, one created by me and another one used for allowing CORS (or more exactly, disabling it :) ).
- My plugin will contain all the routes explained above.

### Connection to the Database

- The Server connects to the MongoDB database using the Mongoose ORM
- Apart from connecting to the MongoDB, Mongoose also helps in defining the Schema of the `User` entity.

### Dockerization

- The Server application is dockerized in a docker image starting from the `node` base image
  - Also, the docker image exposes the 3000 port which will be the port on which the application is running inside the `container`

## Docker-Compose

- The docker-compose.yml file contains the definition of the following services:
  - `mongo`
    - This is the official MongoDB image taken from the DockerHub
    - It runs on the `27017` port
  - `mongo-expres`
    - This is also the official Mongo-Express image taken from the DockerHub
    - I have used this image just to ease the data manipulation which is persisted in the MongoDb
    - It can be reachable by going to the `8888` port.
  - `hapi-server`
    - This is the image which results from our `Dockerfile`, in the `server` folder.
    - As you can see, there is a `mongo` dependency here which simply indicates that it will wait until the `mongo` container will be up and running and then will trigger the starting process
  - `client`
    - This is the image which results from our `Dockerfile` in the `client` folder.
    - Also this image as a dependency on the `mongo` one, just to be sure that it will not start until `mongo` is up and running
    - It can be reached by going to the `9000` port.
- networks:
  - All the images will run in the same network called `application-network` which is a `bridge`network connection. This allows our containers to communicate between them.

## 2. How to run

## Tools needed

- There are two ways to run this project in your local machine:

  - as docker containers (the recommended way):
  - Git (to clone the repository)
  - [Docker](https://docs.docker.com/docker-for-windows/install/) and [Docker Compose](https://docs.docker.com/docker-for-windows/install/)
  - A Modern browser (I am looking at you, IE!!)

- But if you want to run each part individually, you will need the following tools:
  - Git
  - Node and Npm
  - A text editor (preferrably an IDE. ps: Visual Studio rocks!)
  - Angular CLI (for the client application)
  - Docker (this is needed in order to fire up a mongo container)

## Step by step running procedure (docker-only)

1. Clone this repository
2. Make sure that Docker is up and running (maybe play with a simple command like `docker ps -a` which will display all the containers that are running and/or stopped)
3. `cd` into the root folder. Note: you have to be at the same level with the `docker-compose.yml` file.
4. Build the docker images by running `docker-compose build`.
5. Run `docker-compose up` in your favorit terminal/cli
6. When the docker-compose has finished its job go and visit the `http://localhost:9000` endpoint in your browser.
   Note: If you want to see the data which is currently persisted in the database, visit `http://localhost:8888` and open the `test` database and then the `users` collection.
