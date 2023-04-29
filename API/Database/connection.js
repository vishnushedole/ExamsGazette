const {MongoClient} = require('mongodb');

const url = "mongodb+srv://vishnushedole09:VishnuShedole@cluster0.ezy6iil.mongodb.net";
let db;
const  Connect =(callback)=>
{
     MongoClient.connect(url).then((result)=>{
        db = result.db('ExamGazzete');
        if(db)
        callback({db:db})
        else
        throw 'NO database found';
     }).catch(err=>{
        callback({db:null})
     })
}

module.exports = Connect;
