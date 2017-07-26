require('dotenv').config();
const _ = require('lodash');
const co = require('co');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const request = require("co-request");

if(!process.env.EXCHANGE || !process.env.TEAM_NAME){
  console.error('To begin mining supply both the `EXCHANGE` and `TEAM_NAME` environment variables');
  process.exit(1);
}

console.log(`
Mining rig started...
See: /usr/src/app/instructions.txt for more details
Happy mining!
`)

/*
 * Mining algorithm
 */
let isMining;
function mine() {
	return co(function * () {
    const res = yield request({
      uri: process.env.EXCHANGE,
      form: { teamName: process.env.TEAM_NAME },
      method: "POST"
    })
    console.log(res.body);
    if(Math.floor(Math.random() * (10 - 0 + 1)) + 0 == 0){
      clearInterval(isMining);
      isMining = false;
      if(Math.floor(Math.random() * (1 - 0 + 1)) + 0 == 0){
        console.log('AN UNEXPECTED ERROR OCCURRED!');
        setInterval({}, 5000);
      } else {
        console.log('A FATAL ERROR HAS OCCURRED!');
        process.exit(1);
      }
    }
	})
};

co(function *() {
	isMining = setInterval(() => mine(isMining), 5000);
});

/*
 * HTTP Server
 */
const app = express();
app.get('/healthz', (req, res) => {
  res.status(isMining ? 200 : 500).end();
});

const port = process.env.PORT || 3000;
app.listen(port);
