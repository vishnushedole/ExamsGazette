import {React,useContext,useEffect,useState} from 'react'
import { useParams  } from 'react-router-dom'
import axios from 'axios'
import context from '../UserContext.js';

 function  FullArticle() {
    const [article,setArticle] = useState({})
    const [comment,saveComment] = useState("")
    const [comments,saveComments] = useState([])
    const [user,setUser] = useContext(context);
    const [status,setStatus] = useState("");
    const [likes,setLikes] = useState(0);
    const [liked,setLiked] = useState(false);
    const {id} = useParams();
    
    let data = [];
    const  Change_comment =(event)=>
    {
         saveComment(event.target.value)
    }
    function postComment()
    {
            let addcomment = {
              id:id,
              user:user,
              comment:comment
            }
            if(user)
            {
              
              axios.post('https://examsgazette.onrender.com/postComment',addcomment).then(()=>{
                setStatus("Comment has been uploaded")
              }).catch(err=>console.log(err))
            }
            else
            setStatus("Login to add a comment!")
    }
    function Liked()
    {
          if(!liked && user)
          {
            axios.defaults.withCredentials = true;
            axios.post('https://examsgazette.onrender.com/postLike',{id:id,user:user}).then((result)=>{
              setLikes(likes+1);
              setLiked(true);
            }).catch((err)=>{
              console.log("error");
            })
            
          }
    }
    
     useEffect(()=>{
       let url = 'https://examsgazette.onrender.com/ArticlebyId?id='+id
       const fetchData = async ()=>
       {
          data = await fetch(url)
        data = await data.json()
        setArticle(data[0])
        console.log(data[0].comments)
        saveComments(data[0].comments)
        setLikes(data[0].Likes.length)
        for(let i=0;i<data[0].Likes.length;i++)
        {
           if(data[0].Likes[i]==user)
           setLiked(true);
        }
        
       }
     fetchData()
    },[user,comments])
    if(status!="")
    {
      
     return (
      <>
      <div className='Article' >
      
        <h2>{article.heading}</h2>
        <p id="user">Published by - {article.username}</p>
        <h4>{article.discription}</h4>
        <p id="content">{article.content}</p>
        <section className='likecount'>
      <button type="button" onClick={Liked} style={(liked)?{'backgroundColor':'skyblue','color':'white','border':'none'}:{'backgroundColor':'white','color':'black','border':'none'}} value="&#8593;"><img src={require("../images/thumb-up.png")} width="30" height="30"/></button>
          <p>{likes}</p>
        </section>
      </div>
      <div className='status'>{status}</div>
      <div className='writecomment'>
      <textarea className="editor" value={comment} onChange={Change_comment}></textarea>
      <input className="btnn" type="submit" value="Add Comment" onClick={postComment}></input>
      </div>
      <div className='comments'>
         <h4>Comments</h4>
         {comments.map((element,ind)=>{
             return <>
             <div>
              <img src={require("../images/logo.jpg")} width="35" height="30"/>
              <h6>{element.user}</h6><br/>
             <p>{element.comment}</p></div>
             </>
         })}
      </div>
      </>
    )
        }
    else
    {
      
     return (
    <>
    <div className='Article' >
    
      <h2>{article.heading}</h2>
      <p id="user">Published by - {article.username}</p>
      <h4>{article.discription}</h4>
      <p id="content">{article.content}</p>
      <section className='likecount'>
          <button type="button" onClick={Liked} style={(liked)?{'backgroundColor':'skyblue','color':'white','border':'none'}:{'backgroundColor':'white','color':'black','border':'none'}} value="&#8593;"><img src={require("../images/thumb-up.png")} width="30" height="30"/></button>
          <p>{likes}</p>
        </section>
    </div>
    <div className='writecomment'>
    <textarea className="editor" value={comment} onChange={Change_comment}></textarea>
    <input className="btnn" type="submit" value="Add Comment" onClick={postComment}></input>
    </div>
    <div className='comments'>
       <h4>Comments</h4>
       {comments.map((element,ind)=>{
           return <>
           <div>
            <img src={require("../images/logo.jpg")} width="30" height="25"/>
            <h6>{element.user}</h6>
            </div>
             <p>{element.comment}</p> 
             <hr/>
           </>
       })}
    </div>
    </>
  )}
}

export default FullArticle
