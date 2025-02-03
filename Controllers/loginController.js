const executeQuery = require('../Config/db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const generateToken = require('../Utils/tokenUtils');



const register = async (req, res, next) => {
    try {

        let checkEmailQuery = `select user_email from register_user where user_email = @email OR user_name = @userName`;

        let checkEmailResult = await executeQuery(checkEmailQuery, { email: req.body.email, userName: req.body.userName })

        if (checkEmailResult.rowsAffected[0] > 0) {
            return res.status(404).json({ statusCode: 404, messgae: "Email or UserName is already in use" })
        }

        //  Hasing password

        let hasingPassword = await bcrypt.hash(req.body.password, 10);

        let query = `INSERT INTO register_user (user_name, user_email, password) VALUES (@user, @email, @pass)`;

        let values = {
            user: req.body.userName,
            email: req.body.email,
            pass: hasingPassword
        }

        let result = await executeQuery(query, values);

        if (result.rowsAffected[0] > 0) {
            res.status(201).json({ statusCode: 201, messgae: "Account created" })
        }
        else {
            res.status(500).send({ messgae: 'User registration failed' })
        }

    } catch (error) {
        next(error)
    }


}

const login = async (req, res, next) => {
    try {
        let emailQuery = 'select user_id, user_email, password, user_name from register_user where user_name = @userName OR user_email = @userName';

        let loginEmail = await executeQuery(emailQuery, { userName: req.body.userName, email: req.body.email });

        if (loginEmail.rowsAffected[0] === 0) {
            return res.status(401).json({ statusCode: 401, error: "Invalid account email or password" })
        }
        console.log("password", req.body.password);

        let isPasswordValid = await bcrypt.compare(req.body.password, loginEmail.recordset[0].password)

        // console.log(isPasswordValid, "ispassword")

        if (!isPasswordValid) {
            return res.status(401).json({ statusCode: 401, error: "Invalid account email or password" })
        }

        let payload = {
            userId: loginEmail.recordset[0].user_id,
            userName: loginEmail.recordset[0].user_name

        }

        const accessToken = generateToken.generateAccessToken(payload)
        const refreshToken = generateToken.generateRefreshToken(payload);
        console.log(payload, "payload")

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,   // Use true if your app runs on HTTPS
            sameSite: 'None',
            path: '/'       // This ensures you can remove it later
        });

        return res.status(200).json({ statusCode: 200, message: 'Login Successful', accessToken: accessToken, refreshToken: refreshToken })

    } catch (error) {
        next(error)

    }


}


const refreshToken = (req, res, next) => {

    console.log("**", req.cookies, "PP");

    let accessToken = req.cookies.refreshToken;
    console.log(accessToken, "acc");


    if (!accessToken) {
        return res.status(403).json({ statusCode: 403, error: 'Unauthorized token missing' })
    }

    try {
        let decode = jwt.verify(accessToken, process.env.SECRET_KEY);
        console.log(decode);

        const newAccessToken = generateToken.generateAccessToken({ userId: decode.userid, userName: decode.userName });

        console.log(newAccessToken, "acc")

        return res.status(200).json({ statusCode: 200, accessToken: newAccessToken })


    } catch (error) {
        // console.log(error.message, "::")
        // if ('jwt expired' == error.message) {
        // }
        console.log(error.messgae, "KKLL")
        res.status(401).json({ statusCode: 401, error: error.message })

    }

}

const logOut = async (req, res, next) => {
    let insertQuery = `INSERT INTO user_activity (user_id, user_log_name, user_token) VALUES ( @userId, 'logout', @token)`
    let values = { userId: req.user.userId, token: req.cookies.refreshToken }
    try {

        let result = await executeQuery(insertQuery, values);
        res.clearCookie('refreshToken', { path: '/' });

        console.log(res.cookies, "::Cookies still there")
        return res.status(200).json({ statusCode: 200, message: 'logged out sussessful' })

    } catch (error) {
        res.clearCookie('refreshToken', { path: '/' });

        next(error)

    }




}

module.exports = { register, login, refreshToken, logOut }