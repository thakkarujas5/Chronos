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

### Login '/login'

**Method**: `POST`

  Headers                           
| Key | Value                         | 
|------------------|------------------|
| Content-Type  | application/json    | 


```json
{
    "email": "a@a.com",
    "password": "aaa"
}
```

This method will return a access token which can be further used to make API calls.

### Schedule Job '/schedule'

**Method**: `POST`

  Headers                           
| Key | Value                         | 
|------------------|------------------|
| Content-Type  | application/json    | 
| Authorization | Bearer {token}      |

```json
{
    "script": "node x.js",
    "startTime": "17:55", // This takes UTC time as input in 24h format
    "executeAgainAfter": "1d", // This can take input like 1d 5h 4m 3s or 4h 3s or 4s as long as it follows d,h,m,s serial 
    "times": 5  // The number of times we want out task to execute
}
```
### Cancel Job '/cancel'

**Method**: `PUT`

  Headers                           
| Key | Value                         | 
|------------------|------------------|
| Content-Type  | application/json    | 
| Authorization | Bearer {token}      |

```json
{
    "id": 36    // id here is the job id which the user wants to cance;
}
```

### Reschedule Job '/reschedule'

**Method**: `PUT`

  Headers                           
| Key | Value                         | 
|------------------|------------------|
| Content-Type  | application/json    | 
| Authorization | Bearer {token}      |

```json
{
    "id": 123,
    "startTime": "18;00",
    "executeAgainAfter": "5s",
    "timesLeft": 5

}
```

### Status of Job '/status'

**Method**: `GET`

  Headers                           
| Key | Value                         | 
|------------------|------------------|
| Authorization | Bearer {token}      |