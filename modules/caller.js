const {validationResult } = require('express-validator') //load input validation library
const httpclient = require('./httpclient') //export http clinet module

module.exports = (req, res) => {
        //check has validation erros
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ "status_code": 400, "message": errors.array() });
    }

    //if validations OK
    const message = req.query.message
    const url = req.query.url
    httpclient(url, message, function (response) {
        res.status(response.status_code)
        return res.json(response);
    })
}