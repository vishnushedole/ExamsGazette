const express = require('express')
const app = express();
const router = require('./Routes/user.js');
const bodyparser = require('body-parser')

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods','GET,POST');
    res.setHeader('Access-Control-Allow-Headers','*');
    next();
})

app.use('/',router);

app.listen(8080);