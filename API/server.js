const express = require('express')
const app = express();
const router = require('./Routes/user.js');
const bodyparser = require('body-parser')
const session = require('cookie-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Connect = require('./Database/connection.js')
const global = require('global')

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','https://examsgazette.netlify.app');
    res.setHeader('Access-Control-Allow-Methods','*');
    res.setHeader('Access-Control-Allow-Headers','*');
    next();
})

app.use(cors({
    origin: ["https://examsgazette.netlify.app"],
    methods: ["GET", "POST","FETCH"],
    credentials:true
}));

app.use('/',router);

Connect((obj)=>{
    if(obj.db!=null)
    {
        console.log("Mongodb connection established")
        global.db = obj.db;
    }
    else{
        console.log("Mongodb connection failed")
    }
})

app.listen(8080);
