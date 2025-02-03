const jwt = require('jsonwebtoken');

exports.authenticateUser = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization || req.headers.Authorization;
        const token = authHeader.split(" ")[1];
        console.log(token, "authenticate");

        if (!token) {
            return res.status(403).json({ statusCode: 401, error: "Missing Token Access denied" })
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decode;
        console.log(decode, "ppp");
        next()

    } catch (error) {
        console.log("errorsss", error.message);

        return res.status(401).json({ statusCode: 401, error: error.message })
    }

}