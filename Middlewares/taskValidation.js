const taskValidator = (req, res, next) => {
    const { taskName } = req.body;

    if (!taskName) {

        res.status(400).send({ "statusCode": 400, "message": "task name is must important" });
    }
    next()


}

module.exports = taskValidator