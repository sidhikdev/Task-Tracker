const jwt = require('jsonwebtoken');
require('dotenv').config()


const generateAccessToken = (user) => {
    let token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '2m' })
    return token;
}

const generateRefreshToken = (user) => {
    let token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '15m' })
    return token;
}
module.exports = { generateAccessToken, generateRefreshToken }