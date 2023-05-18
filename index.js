const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://linda:denJuwon8228!@cluster0.mh0ws9h.mongodb.net/?retryWrites=true&w=majority',{
    //useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDb Connected....'))
  .catch(err => console.log(err))

app.get('/', (res,req) => res.send('Hello World'))

app.listen(port, () => console.log(`Example app listening on port ${port}`))


