const cluster = require('cluster') //load cluster module
const os = require('os')  //load os module
const express = require('express')  //load express
const { query } = require('express-validator') //load input validation library
const caller = require('./modules/caller') //export http clinet module
const port = process.env.PORT || 3030  //set listning port

if (cluster.isMaster) {
    const cpuCount = os.cpus().length
    for (let i = 0; i < cpuCount; i++) {
        cluster.fork()
    }
}
else {
    // get a express app instance
    const app = express()

    //define GET end point to receive request from executor
    app.get('/sendNotifications',
        query('url').exists().withMessage('url is required').isURL({ protocols: ['https', 'http'], require_tld: false, require_protocol: true }).withMessage('url is invalid'),  //validate URL
        query('message').exists().withMessage('message is required').isLength({ min: 1 }).withMessage('message minimum lenght is 1'), //validate message
        caller)

    app.listen(port)
    console.log('app is running on port', port)
    
}

cluster.on('exit', (worker) => {
    console.log('Closing worker :', worker.id)
    cluster.fork()
})