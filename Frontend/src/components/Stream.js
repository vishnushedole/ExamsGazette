import {React,useEffect,useState,useContext} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import context from '../UserContext.js';

function Stream() {
    const [Exams,setExams] = useState([])
    const [Articles,setArticles] = useState([])
    const {stream} = useParams();
    const [user,setUser] = useContext(context);
    const [SavedExams,setSavedExams] = useState([]);
    let articles = [],exams=[];
     useEffect(()=>{
      
       const url = 'https://examsgazette.onrender.com/getStream?name='+stream
       const fetchData = async ()=>
       {
          exams = await fetch(url)
          exams = await exams.json()
          articles = await fetch('https://examsgazette.onrender.com/getArticles')
          articles = await articles.json()
         
          if(user!="" && user!=null)
          {
              let data = await fetch('https://examsgazette.onrender.com/getUser?name='+user)
              data = await data.json();
              console.log(data.SavedExams)
              setSavedExams(data.SavedExams);
              
          }
      
        setExams(exams)
        setArticles(articles)
       }
     fetchData()
    },[stream,SavedExams])
    const saveExam=(id,event)=>{
           if(event.target.value=="Save" && user)
           { 
              axios.defaults.withCredentials = true;
              axios.post('https://examsgazette.onrender.com/SaveExam',{id:id,user:user}).then((result)=>{
                setSavedExams(result.data);
                console.log(result.data)
              }).catch(err=>{
                console.log(err);
              })
           }
    }
  return  (
    <div className='streams'>
      <div className='sideArticles'>
        <h2>Read Articles</h2>
        {Articles.map((item,ind)=>{  
                          return <>
                      <div class="card">
                          <img className="card-img-top" src={require("../images/im1.jpg")} alt="Card image cap"/>
                          <div className="card-body">
                              <h5 class="card-title">{item.name}</h5>
                              <p class="card-text">{(item.discription.length>60)?item.discription.substr(0,60)+"...":item.discription}</p>
                              <p class="card-text">By {item.username}</p>
                              <button className='btnn'><a href={"/Article/"+item._id}>Read More</a></button>
                          </div>
                      </div></>
                  })
      }</div>
      <div>
      <div className='exams'>
      <h2>Exams</h2>
   {Exams.map((item,ind)=>{
     if(item.stream==stream)
      return <div className='exams_Itm' key={ind}>
              <img src={require("../images/JEE.jfif")} width='250' height='280'/>
              <div><h6>{item.name}</h6>
              <p>{(item.eligibility.length>400)?item.eligibility.substr(0,400)+"...":item.eligibility}</p>
              <p> Last Date To Apply : {item.last_date}</p>
              <button className='btnn'><a href={item.Apply} >Apply Now</a></button>
              <input type="button" className='btnn' onClick={(event)=>saveExam(item._id,event)} value={(SavedExams.includes(item._id))?"Saved":"Save"}></input>
              </div>
          </div> 
  })}
  </div></div>
    </div>
  )
}

export default Stream

