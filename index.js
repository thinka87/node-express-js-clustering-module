const cluster = require('cluster')
const os = require('os')
const express = require('express')
const { query, validationResult } = require('express-validator')
const httpclient = require('./httpclient')

if (cluster.isMaster) {
    const cpuCount = os.cpus().length
    for (let i = 0; i < cpuCount; i++) {
        cluster.fork()
    }
}
else {
    const app = express()

    app.get('/sendNotifications', 
    query('url').exists().withMessage('url is required').isURL({ protocols: ['https','http'] , require_tld: false, require_protocol: true }).withMessage('url is invalid'),  //validate URL
    query('message').exists().withMessage('message is required').isLength({ min: 1 }).withMessage('message minimum lenght is 1'), //validate message
    
    (req, res) => {

        //check has validation erros
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({"status_code":400 , "message": errors.array()});
        }

        //if validation OK
        const message= req.query.message
        const url =req.query.url
        httpclient(url ,message ,function (response) {
            res.status(response.status_code)
            return res.json(response);
        })
        
    })
 
    const port = process.env.PORT || 3030
    app.listen(port)
    console.log('app is running on port', port)
}

cluster.on('exit', (worker) => {
    console.log('Closing worker :', worker.id)
    cluster.fork()
})