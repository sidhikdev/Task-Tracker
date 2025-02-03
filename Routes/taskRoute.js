const express = require('express');
const route = express.Router();
const taskController = require('../Controllers/taskController');
const taskValidator = require('../Middlewares/taskValidation')


route.get('/getTask', taskController.getUsertask);
route.post('/createTask', taskValidator.createTaskValidator, taskController.addTask);
route.put('/updateTask', taskValidator.updateTaskValidator, taskController.updateTask);
route.put('/completeTask', taskValidator.completeTaskValidator, taskController.CompleteTask);
route.delete('/deleteTask', taskValidator.deleteTaskValidator, taskController.deleteTask);


module.exports = route


