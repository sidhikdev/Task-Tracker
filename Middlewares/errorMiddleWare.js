exports.errorHandler = (err, req, res, next) => {
    console.error(err.stack, "midd");

    res.status(500).json(
        {
            statusCode: 500,
            message: "Internal Server Error",
            error: err.message
        }
    )

}