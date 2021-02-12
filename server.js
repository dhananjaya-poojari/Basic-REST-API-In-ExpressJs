require('dotenv').config()

const express = require('express')
const app = express()
const Port=process.env.Port||3000;

const db=require('./DB/connection')
db();
app.use(express.json())

const subscribeRouter=require('./routers/userApi')
app.use('/user',subscribeRouter)


app.listen(Port,()=>console.log('Server started'))