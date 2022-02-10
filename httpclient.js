const axios = require('axios');

module.exports = (url ,message,cb) => {

    axios.post(url, 
    
    {"body":message}, 
    
    {
      headers: {
        'Content-Type': 'application/json',
        'Application-name': 'notifications http client'
        }
    })
    .then((response) => {
      return cb({"status_code":response.status , "message":"success"})
    }).catch(function (error) {
      
      if(typeof error.response !== 'undefined'){
        return cb({"status_code":error.response.status , "message": "Error ocuured calling to URL: "+url})
      }else {
        return cb({"status_code":403 , "message": "Error ocuured connecting to URL: "+url})
      }   
      
  });
}