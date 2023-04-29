import {React,useEffect,useState} from 'react'
import { useParams  } from 'react-router-dom'
import axios from 'axios'

 function  FullArticle() {
    const [article,setArticle] = useState({})
    const [comment,saveComment] = useState("")
    const [comments,saveComments] = useState([])
    const [user,saveUser] = useState("");
    const [status,setStatus] = useState("")
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
            if(user!="")
            {
              axios.post('https://examsgazette.onrender.com/postComment',addcomment).then(()=>{
                setStatus("Comment has been uploaded")
              }).catch(err=>console.log(err))
            }
            else
            setStatus("Login to add a comment!")
    }
     useEffect(()=>{
        console.log("hi")
       const url = '/ArticlebyId?id='+id
       const fetchData = async ()=>
       {
          data = await fetch(url)
        data = await data.json()
        setArticle(data[0])
        console.log(data[0].comments)
        saveComments(data[0].comments)
        // console.log(comments)
       }
     fetchData()
    
    },[0])
    if(status!="")
     return (
      <>
      
      <div className='Article' >
        <h2>{article.heading}</h2>
        <p id="user">Published by {article.username}</p>
        <h4>{article.discription}</h4>
        <p id="content">{article.content}</p>
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
              <h5>{element.user}</h5>
             <p>{element.comment}</p></div>
             </>
         })}
      </div>
      </>
    )
    else
     return (
    <>
    <div className='Article' >
      <h2>{article.heading}</h2>
      <p id="user">Published by {article.username}</p>
      <h4>{article.discription}</h4>
      <p id="content">{article.content}</p>
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
            <img src={require("../images/logo.jpg")} width="35" height="30"/>
            <h5>{element.user}</h5>
           <p>{element.comment}</p></div>
           </>
       })}
    </div>
    </>
  )
}

export default FullArticle
