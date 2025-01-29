const express = require('express');
const route = express.Router();
const taskController = require('../Controllers/taskController');
const taskValidator = require('../Middlewares/taskValidation')


route.get('/getTask', taskController.getUsertask)

route.post('/createTask', taskValidator, taskController.addTask)



route.put('/updateTask', async (req, res) => {
    let result = await taskController.updateTask(req, res);
    console.log(req.body);
    res.status(200).send(result);

})


module.exports = route


