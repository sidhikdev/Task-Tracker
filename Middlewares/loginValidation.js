const { body, validationResult, checkExact, check } = require('express-validator')

const registerValidation = [
    body('userName').exists().withMessage('userName is reqired')
        .bail()
        .notEmpty().withMessage('userName value is missing'),

    body('email').exists().withMessage('email is required')
        .bail()
        .notEmpty().withMessage('Email should not be empty')
        .bail()
        .isEmail().withMessage('Enter valid email'),

    body('password').exists().withMessage('Password required')
        .bail()
        .notEmpty().withMessage('Password should not be empty')
        .isLength({ min: 6 }).withMessage('Passowrd must be atleast 6 character'),

    checkExact(),


    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(404).json({ statusCode: 404, error: errors.array().map(item => item.msg) })
        }

        next()

    }
]

const loginValidator = [
    body('userName').exists().withMessage('userName or email is required')
        .bail()
        .notEmpty().withMessage('userName should not be empty'),

    body('password').exists().withMessage('Passowrd is required')
        .bail()
        .notEmpty().withMessage('Password must be atleast 6 character'),

    checkExact(),

    (req, res, next) => {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(404).json({ statusCode: 404, error: errors.array().map(item => item.msg) })
        }

        next()
    }

]

module.exports = { loginValidator, registerValidation }