const express = require('express');
const taskModule = require('./Routes/taskRoute');
const { errorHandler } = require('./Middlewares/errorMiddleWare');
const app = express();
const port = 8000

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send("Welcome To Work item API")
});

app.use('/task', taskModule);



app.use(errorHandler)
app.listen(port, () => {
    console.log(`Server is running in this port: ${port}`)
})