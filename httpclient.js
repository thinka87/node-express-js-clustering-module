const axios = require('axios'); //load axios library

module.exports = (url ,message,cb) => {

    axios.post(url, 
    //set body
    {"body":message}, 
    //set headers
    {
      headers: {
        'Content-Type': 'application/json',
        'Application-name': 'notifications http client'
        }
    })
    .then((response) => {
      return cb({"status_code":response.status , "message":"success"})
    }).catch(function (error) {  //catch errors
      
      if(typeof error.response !== 'undefined'){
        return cb({"status_code":error.response.status , "message": "Error ocuured calling to URL: "+url})
      }else {
        return cb({"status_code":403 , "message": "Error ocuured connecting to URL: "+url})
      }   
      
  });
}