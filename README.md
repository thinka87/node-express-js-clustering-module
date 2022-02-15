# node-express-js-clustering-module examples

## Technologies
***
A list of technologies used within the project:
* node js with express, and axios
* shell scripts


## How to setup the project
***
Steps
* Download code and run npm install command inside http_client folder using terminal
* listning port can be change in index.js line 6
* in terminal -> npm start
* Now http_client service should be run in http://localhost:3030

## How to test using executer
***
Steps
* open executer shell script in "executer folder"
* change the http_client_url in line 4 (in case different from defult settings)
* http clinet listening send notfication service on the GET endpoint "http://localhost:3030/sendNotifications"
* run shell script in terminal using commnd-  ~/executor -u http://sample_receiver/ -i 2 < msg.txt
* Where -u = url of notifications receiver , -i = interval value that nottifications need to send msg.txt = notifications list text file

## How to run test cases
***
* integration test -> run 'npm test' in terminal
