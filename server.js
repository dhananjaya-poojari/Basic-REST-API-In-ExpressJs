require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Port=process.env.Port||3000

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology: true});

const db=mongoose.connection;
db.on('error',(error)=>console.log(error))
db.once('open',()=>console.log('connected to database'))

app.use(express.json())

const subscribeRouter=require('./routers/subscribers')
app.use('/subscribers',subscribeRouter)


app.listen(Port,()=>console.log('Server started'))