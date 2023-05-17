const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://linda:denJuwon8228!@cluster0.mh0ws9h.mongodb.net/', {
     useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
}).then(() => console.log('MongoDB Coonnected......'))
  .catch(err => console.log(err))

app.get('/', (req,res) => res.send('Hello world! 안녕하세요'))

app.listen(port, () => console.log(`Example app listening on port ${port}`))
