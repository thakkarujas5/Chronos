const express = require('express')
const {
    Sequelize,
    DataTypes
} = require('sequelize')
const redis = require('redis')
const Redis = require('ioredis');
const bodyParser = require('body-parser')
const amqp = require('amqplib')
const Job = require('./models/job')
const User = require('./models/user')
const UserJob = require('./models/userjob')
const executionLog = require('./models/executionlog')
const registerRoute = require('./routes/register')
const loginRoute = require('./routes/login')
const scheduleRoute = require('./routes/schedule')
const cancelRoute = require('./routes/cancel')
const statusRoute = require('./routes/jobstatus')
const rescheduleRoute = require('./routes/reschedule')
const sequelize = require('./db/db')
const sub = require('./redis/sub')
const extractNumbersFromString = require('./utils/extractNumber')
const addJobwithDelay = require('./utils/addJobWithDelay')
const syncDatabase = require('./db/sync')
const taskExecutor = require('./utils/executor')
const getMillisecondsDifference = require('./utils/getMilliSecond')


const app = express()

const channelR = "my_sorted_set";

app.use(bodyParser.json())



const client = redis.createClient({
    url: 'redis://localhost:6379'
});



const connectionURL = "amqp://localhost:5672"
const queuename = "myqueue"



async function abcd() {
    await client.connect()
    await client.on('connect', () => {
        console.log('Connected')
    })
}

async function run() {
    await abcd();
}
run();


//syncDatabase()

sub.subscribe("__keyevent@0__:expired");

client.on('error', (err) => {
    console.log(err);
})


app.use('/', registerRoute);
app.use('/', loginRoute)
app.use('/', scheduleRoute)
app.use('/', cancelRoute)
app.use('/', statusRoute)
app.use('/', rescheduleRoute)



app.listen(3002, () => {
    console.log('Server started');
})


async function handleExpiredEvent(key) {
    try {
        const entry = await Job.findOne({
            where: {
                id: key
            }
        })
        await sendMessage(entry.dataValues);
    } catch (err) {
        console.log(err)
    }
}

// Receive expired events from Redis
sub.on("message", async (channel, key) => {

    const id = extractNumbersFromString(key);

    const jobdata = await Job.findOne({
        where: {
            id: id
        }
    });

    const logupdate = await executionLog.create({
        jobId: id,
        status: jobdata.dataValues.status,
        timesLeft: jobdata.dataValues.timesLeft,
        log: 'Received from Redis'
    })

    handleExpiredEvent(id);
});

async function connectToRabbitMQ() {
    try {
        const connection = await amqp.connect(connectionURL);
        const channel = await connection.createChannel();
        await channel.assertQueue(queuename, {
            durable: true
        });

        // Consume messages from RabbitMQ
        channel.consume(queuename, async (message) => {
            if (message) {

                const json = JSON.parse(message.content.toString())

                const logupdate = await executionLog.create({
                    jobId: json.id,
                    status: json.status,
                    timesLeft: json.timesLeft,
                    log: 'Received from the Queue'

                })

                const jobinfo = await Job.findByPk(json.id);


                if (jobinfo.dataValues.status === 'cancelled') {

                    channel.ack(message);
                    console.log('Job cancelled:', jobinfo.dataValues.id)
                } else {
                    
                    channel.ack(message);

                    const job = await Job.update({
                        timesLeft: json.timesLeft - 1,
                        status: 'executing'
                    }, {
                        where: {
                            id: json.id
                        }
                    })


                    const newjob = await Job.findByPk(json.id);

                    taskExecutor(newjob.dataValues);


                    if (json.timesLeft - 1 > 0) {

                        addJobwithDelay(json.id, channel, newjob.dataValues, newjob.dataValues.executeAgainAfter / 1000)
                    } else {
                        await Job.update({
                            status: 'completed'
                        }, {
                            where: {
                                id: json.id
                            }
                        })
                    }
                }

            }
        });

        return channel;
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error.message);
        process.exit(1);
    }
}
async function sendMessage(message) {
    const channel = await connectToRabbitMQ();
    const logupdate = await executionLog.create({
        jobId: message.id,
        status: message.status,
        timesLeft: message.timesLeft,
        log: 'Sent to the Queue'

    })
    channel.sendToQueue(queuename, Buffer.from(JSON.stringify(message)), {
        persistent: true
    });
}