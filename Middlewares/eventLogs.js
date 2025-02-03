const fs = require('fs').promises;
const path = require('path');
let date = new Date().toLocaleString('en-US', { timeZone: 'IST' })


exports.eventLogger = async (req, res, next) => {
    try {

        // console.log(path.join(__dirname, '..', 'logs', 'errorFile.txt'), req.method, "LLLL")
        await fs.appendFile(path.join(__dirname, '..', 'logs', 'access.csv'), `${date},\t ${req.method},\t ${req.originalURL}, ${JSON.stringify(req.body)}\n`)
        next()

    } catch (error) {

        next(error)

    }

}