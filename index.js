const express = require('express');
const app = express();
const port = 5000
const bodyParser = require('body-parser');
const {User} = require("./models/User");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const config = require('./config/key')

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    //useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDb Connected....'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello World! Hi Linda')
  })

app.post('/register', async(req, res) => {
    const user = new User(req.body)
    await user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      console.error(err);
      res.json({
        success: false,
        err: err,
      });
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`))


