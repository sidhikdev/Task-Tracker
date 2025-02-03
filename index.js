const express = require('express');
const taskModule = require('./Routes/taskRoute');
const loginModule = require('./Routes/loginRoute')
const { errorHandler } = require('./Middlewares/errorMiddleWare');
const { eventLogger } = require('./Middlewares/eventLogs');
const { authenticateUser } = require('./Middlewares/authMiddleware');
const cookieParser = require('cookie-parser');


const app = express();
const port = 8000

app.use(express.json());
app.use(cookieParser())
app.use(eventLogger);
app.get('/', (req, res) => {
    res.status(200).send("Welcome To Work Item Tracker API")
});

app.use('/task', authenticateUser, taskModule);
app.use('/account', loginModule);
app.use('/token', loginModule)

app.all('*', (req, res) => {
    res.status(404).json({
        status: "error",
        messgae: "Route not found. Please check the endpoint and try again"
    })
})

app.use(errorHandler)
app.listen(port, () => {
    console.log(`Server is running in this port: ${port}`)
})