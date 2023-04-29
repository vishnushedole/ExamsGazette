const cheerio = require('cheerio');
const axios = require('axios');
const mongodb = require('mongodb')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const global = require('global')

let news = [];
const Connect = require('../Database/connection.js')
exports.getNews = (req,res,next)=>{
    async function Fetchdata(url,res){
        try{
                const response = await axios.get(url)
            const data = cheerio.load(response.data);
            
            const Exams = data("article div .news_Itm");
            Exams.each(function(){
                let imgurl = data(this).find('.news_Itm-img a img')
                if(imgurl['0']!=undefined)
                {
                   
                imgurl = imgurl['0']['attribs']['src'];
                let Editor = data(this).find('div span a').text();
                let headline =data(this).find('div h2').text();
                let source =data(this).find('div h2 a');
                source = source['0']['attribs']['href']
                let discription = data(this).find('div p').text();
                news.push({imgurl,Editor,headline,discription,source});
                }
                
            })
            let exams = news;
            news = [];
            res.json(exams)
        }
        catch(err){
          console.log(err);
        }
    }
    Fetchdata('https://www.ndtv.com/education/page-1',res)
}

exports.postArticle =  async(req,res,next)=>{
    let Article = {
        username : req.body.username,
        heading : req.body.heading,
        discription : req.body.discription,
        content : req.body.content
    }
    
        const coll = await db.collection('Articles')
        const result = await coll.insertOne(Article)
        res.json(result)
}
exports.test = (req,res,next)=>{
    res.send("hello world")
}

exports.getArticles = async(req,res,next)=>{
   
        const coll = await global.db.collection('Articles')
        const cursor = await coll.find();
        let Articles = [];
        await cursor.forEach(element => {
            Articles.push(element);
        });
        res.json(Articles)
    
}
exports.ArticlebyId = async(req,res,next)=>{
    const id = req.query.id;
    console.log(id)
        const coll = await db.collection('Articles')
        const cursor = await coll.find();
        let Articles = [];
        await cursor.forEach(element => {
            if(element._id==id)
            Articles.push(element)
        });
        res.json(Articles)

}

exports.getStream = async(req,res,next)=>{
    const name = req.query.name;
    
        const coll = await db.collection('Stream')
        const cursor = await coll.find();
        let Articles = [];
        await cursor.forEach(element => {
            if(element.stream==name)
            Articles.push(element)
        });
        res.json(Articles)
}
exports.postComment =async(req,res,next)=>{
    const id = req.body.id;
    let newcomment = {
        user:req.body.user,
        comment:req.body.comment
    }
    let record;
    
        const coll = await global.db.collection('Articles')
        const cursor = await coll.find();
        let Articles = [];
        await cursor.forEach(element => {
            if(element._id==id)
              record = element;
        });
        record.comments.push(newcomment)
        var objId =  mongodb.ObjectId;
        var OId = new objId(record._id);
        await coll.updateOne({_id:OId}, { $set: { "comments" : record.comments} },).then(result=>{
            res.json(result)
        }).catch(err=>{
            res.json(err)
        })
   
}
exports.CreateUser = (req, res,next) =>{
    const{firstname, lastname, email, password} = req.body;
            //hashing the password
            
            bcrypt.hash(password, saltRounds, async(err, hash) =>{
            if(err){
                return console.log("Cannot hash the password");
            }
            else{
                const hashedPW = hash;
                const userData = {
                    firstname : firstname,
                    lastname : lastname,
                    email : email,
                    password : hashedPW
                };
                    console.log(userData);
                    const coll = await global.db.collection('User')
                    await coll.insertOne(userData).then((result)=>{
                        console.log("User created");
                        req.session.user = email;
                        req.session.username = firstname;
                        return res.json({valid: true, user : req.session.user, username: req.session.username}); 
                    }).catch(err=>{
                        console.log(err)
                    })
                
            }
});    
}
exports.Login = async(req, res,next) =>{
    
        console.log(req.body.email)
        const coll = await global.db.collection('User')
        await coll.findOne({email : req.body.email})
        .then(result =>{
            const pw = result.password;
            bcrypt.compare(req.body.password, pw, async(err, isMatch) =>{
                if(isMatch){
                    req.session.user = req.body.email;
                    req.session.username = result.firstname;
                    console.log(req.session);
                    return res.json({valid: true, user : req.session.user, username:result.firstname});
                }
                else{
                    return res.json({valid: false, user: null});
                }
            })
        })
   
    
};
exports.Logout = (req,res,next)=>{
    console.log("Reached")
    res.clearCookie("user_sid");
    return res.json({cleared : true});
}

exports.getUser = async(req,res,next)=>{
    
        const coll = await global.db.collection('User');
        const result = await coll.findOne({firstname:req.body.name});
        res.json(result)
   
}