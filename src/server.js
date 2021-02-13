require('dotenv').config()

const express = require('express')
const app = express()
const serverless = require("serverless-http");

const db=require('./DB/connection')
db();
//app.use(express.json())

const subscribeRouter=require('./routers/userApi')
app.use('/.netlify/functions/server',subscribeRouter)


module.exports = app;
module.exports.handler = serverless(app);