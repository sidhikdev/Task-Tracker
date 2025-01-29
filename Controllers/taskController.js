const executeQuery = require('../Config/db')

const getUsertask = async (req, res, next) => {
    try {
        let query = 'select * from task_item'

        let result = await executeQuery(query);
        res.status(200).send(result.recordset)

    } catch (error) {
        next(error)
    }


}

const addTask = async (req, res, next) => {

    try {
        let query = `insert into task_item (task_name) values (@task)`
        let values = { task: req.body.taskName }

        let result = await executeQuery(query, values);

        let response = {}
        if (result.rowsAffected.length > 0) {
            response["statusCode"] = 200
            response["message"] = "Task Created Successfully."
        }
        res.status(201).send(response);

    } catch (error) {
        next(error);

    }


}


module.exports = { getUsertask, addTask }