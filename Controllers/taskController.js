const executeQuery = require('../Config/db')

const getUsertask = async (req, res, next) => {
    try {
        let query = 'select * from task_item where is_active = 1 and user_id = @userId'
        let values = { userId: req.user.userId }
        let result = await executeQuery(query, values);
        res.status(200).send(result.recordset)

    } catch (error) {
        next(error);
    }


}

const addTask = async (req, res, next) => {
    // console.log(req.body);

    try {
        let query = `insert into task_item (task_name, task_description, user_id) values (@taskname, @taskdes, @userId)`
        let values = { taskname: req.body.taskName, taskdes: req.body.taskDescription, userId: req.user.userId }

        let result = await executeQuery(query, values);

        let response = {}
        if (result.rowsAffected[0] > 0) {
            response["statusCode"] = 200
            response["message"] = "Task Created Successfully."
        }
        res.status(201).json(response);

    } catch (error) {
        next(error);

    }


}


const updateTask = async (req, res, next) => {
    console.log(req.body);

    try {

        let query = `UPDATE task_item SET task_name = @taskName, task_description=@taskDescription where task_id = @taskId and is_active = 1`
        let values = {
            taskName: req.body.taskName,
            taskDescription: req.body.taskDescription,
            taskId: req.body.taskId
        }

        let result = await executeQuery(query, values);

        if (result.rowsAffected[0] > 0) {
            return res.status(200).json({ statusCode: 200, data: 'Task updated successfully' });
        } else {
            return res.status(404).json({ statusCode: 404, data: 'Task not found' });
        }

    } catch (error) {
        next(error)

    }

}


const CompleteTask = async (req, res, next) => {
    console.log(req.body);

    try {
        let query = 'UPDATE task_item SET task_status = @taskstatus where task_id= @taskid and is_active = 1';
        let values = { taskid: req.body.taskId, taskstatus: req.body.taskStatus }
        console.log(values);


        let result = await executeQuery(query, values);
        if (result.rowsAffected[0] > 0)
            res.status(200).json({ statusCode: 204, message: "Task completed successfully!" })
        else {
            res.status(404).json({ statusCode: 404, message: "Task not found" })

        }
    } catch (error) {
        next(error)

    }


}


const deleteTask = async (req, res, next) => {
    console.log(req.body);

    try {
        let query = `UPDATE task_item SET is_active = 0 WHERE task_id = @taskId and is_active = 1`
        let values = { taskId: req.body.taskId }
        let result = await executeQuery(query, values);

        if (result.rowsAffected[0] > 0) {
            res.status(204).send({ message: "Task Deleted Successfully" })
        } else {
            res.status(404).json({ statusCode: 404, message: "Task not found" })


        }


    } catch (error) {
        next(error)
    }


}

module.exports = { getUsertask, addTask, updateTask, CompleteTask, deleteTask }