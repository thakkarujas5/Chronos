## Introduction

This project offers a way to schedule tasks present on the server. This project has been made using NodeJS, Redis, RabbitMQ, MySQL.


## High Level Design

![Logo](images/Job-Scheduler.png)

## Getting Started

After Cloning the repository we need to set up MySQL, Redis and RabbitMQ.

Create a database in your system and navigate to db folder where there will be db.js. Enter your database name, your credentials.

Install docker on your system and run the following commands to run Redis and RabbitMQ

For Redis

```bash
docker run --name my-redis -p 6379:6379 -d redis
```

For RabbitMQ

```bash
docker run --name rabbitmq -p 5672:5672 rabbitmq
```

After this inside your repo on your local machine run the following command

```bash
npm install
```
This will install all the necessary dependencies for the project.

After this run

```bash
npm start
```
The server will start and we are good to go.

### Base URL

The base URL for all API endpoints is: `http://localhost:3002`

### POSTMAN

The postman collection for the API's can be imported from the json stored in the Collection folder

## API Specification

### Register '/register'

**Method**: `POST`

  Headers                           
| Key | Value                         | 
|------------------|------------------|
| Content-Type  | application/json    | 

Body Parameters:

```json
{
    "name": "ujas",
    "email": "test@test.com",
    "password": "password"
}
```




# Registration
