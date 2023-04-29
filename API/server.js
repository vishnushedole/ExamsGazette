const express = require('express')
const app = express();
const router = require('./Routes/user.js');
const bodyparser = require('body-parser')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials:true
}));
app.use(cookieParser());
app.use(session({
    key: "user_sid",
    secret : "AuthenticationUsingSessionsAnsCookies",
    resave : true,
    saveUninitialized : true,
    cookie :{
        expires:600000
    }
}
))
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