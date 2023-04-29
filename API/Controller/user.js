const cheerio = require('cheerio');
const axios = require('axios');
const mongodb = require('mongodb')
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

exports.postArticle =  (req,res,next)=>{
    let Article = {
        username : req.body.username,
        heading : req.body.heading,
        discription : req.body.discription,
        content : req.body.content
    }
     Connect(async db=>{
        const coll = await db.collection('Articles')
        const result = await coll.insertOne(Article)
        res.json(result)
    })
}
exports.test = (req,res,next)=>{
    res.send("hello world")
}

exports.getArticles = (req,res,next)=>{
    Connect(async db=>{
        const coll = await db.collection('Articles')
        const cursor = await coll.find();
        let Articles = [];
        await cursor.forEach(element => {
            Articles.push(element);
        });
        res.json(Articles)
    })
}
exports.ArticlebyId = (req,res,next)=>{
    const id = req.query.id;
    console.log(id)
    Connect(async db=>{
        const coll = await db.collection('Articles')
        const cursor = await coll.find();
        let Articles = [];
        await cursor.forEach(element => {
            if(element._id==id)
            Articles.push(element)
        });
        res.json(Articles)
    })
}

exports.getStream = (req,res,next)=>{
    const name = req.query.name;
    Connect(async db=>{
        const coll = await db.collection('Stream')
        const cursor = await coll.find();
        let Articles = [];
        await cursor.forEach(element => {
            if(element.stream==name)
            Articles.push(element)
        });
        res.json(Articles)
    })
}
exports.postComment =(req,res,next)=>{
    const id = req.body.id;
    let newcomment = {
        user:req.body.user,
        comment:req.body.comment
    }
    let record;
    Connect(async db=>{
        const coll = await db.collection('Articles')
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
    })
}