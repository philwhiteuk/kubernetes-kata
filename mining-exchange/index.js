require('dotenv').config();
const _ = require('lodash');
const co = require('co');
const redis = require('redis');
const wrapper = require('co-redis');
const pug = require('pug');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const redisClient = redis.createClient(process.env.DB_HOST);
var client = wrapper(redisClient);

const app = express();
const upload = multer();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  co(function* () {
    let teams = yield client.smembers("teams");
    for(let i = 0; i < teams.length; i++){
      teams[i] = _.merge({ 'team': teams[i] }, yield client.hgetall(teams[i]));
    }
    teams = _.orderBy(teams, [ (o) => parseInt(o.score), 'team'], ['desc', 'asc']);
    res.send(pug.renderFile('index.pug', { teams }));
  });
});

app.post('/', upload.array(), function (req, res) {
  co(function* () {
    const teamName = _.get(req.body, 'teamName');
    if(teamName){
      client.sadd("teams", teamName);

      /*
       * Additional rules to the game go here
       * 
       */
      if(_.get(req.body, 'isRefinery')){
        const refineryKey = _.get(req.body, 'refinery');

      }

      client.hincrby(teamName, "score", "0.5");

      let result = yield client.hgetall(teamName);
      result = JSON.stringify(_.merge({ 'team': teamName }, result));
      console.log(result);
      res.send(result);
    } else {
      res.status(400).end();
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`listening on port ${port}`);
