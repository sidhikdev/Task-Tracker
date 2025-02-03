const { body, validationResult, checkExact } = require("express-validator");

const createTaskValidator = [

    body('taskName')
        .exists().withMessage("Task Name is required")
        .bail()
        .notEmpty().withMessage("Task Name cannot be empty"),

    body('taskDescription').exists().withMessage('Task Description is required').notEmpty().bail().withMessage('Task Description should be empty'),
    checkExact(),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ statusCode: 400, message: errors.array().map(item => item.msg) })
        }

        next();

    }


]


const updateTaskValidator = [

    body('taskId')
        .exists().withMessage('Task Id is required')
        .bail()
        .notEmpty().withMessage('Task Id should be empty'),

    body('taskName').exists().withMessage("Task Name is required").bail().notEmpty().notEmpty().withMessage("Task Name cannot be empty"),


    body('taskDescription').exists().withMessage('Task Description is required').bail().notEmpty().withMessage('Task Description should be empty'),
    checkExact(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ statusCode: 400, error: errors.array().map(item => item.msg) })
        }
        next()

    }

]


// const updateTaskValidators = (req, res, next) => {
//     const { taskName, taskDescription, taskId } = req.body;

//     if (!taskName || !taskId || !taskDescription) {
//         res.status(400).send({ "statusCode": 400, "message": `Task id, Taks Name and Task Description is missing` });

//     }
//     next()
// }

const completeTaskValidator = [
    body('taskId').exists().withMessage('Task Id is required')
        .bail()
        .notEmpty().withMessage('TaskId is should not be empty'),

    body('taskStatus').exists().withMessage('Task status is required')
        .bail()
        .notEmpty().withMessage('Task status is should be empty'),

    checkExact(),

    (req, res, next) => {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).send({ "statusCode": 400, "error": error.array().map(item => item.msg) });

        }
        next()
    }


]

const deleteTaskValidator = [
    body('taskId').exists().withMessage('taskId is required')
        .bail()
        .notEmpty()
        .withMessage('TaskId is should not be empty'),
    checkExact(),


    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({ statusCode: 404, error: errors.array().map(item => item.msg) })
        }
        next();

    }

]






module.exports = { createTaskValidator, updateTaskValidator, completeTaskValidator, deleteTaskValidator }