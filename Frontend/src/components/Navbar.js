import { React, useEffect, useState } from 'react'
import { ExamNavbar } from '../Styled/Navbar.styled.js'
import axios from 'axios';
import { useNavigate } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';


function Navbar() {
  // console.log(props.btnText);
  const[href, sethref] = useState('/login');
  const[btnText, setBtnText] = useState('Sign In');
  const[welcome, setWelcome] = useState('');
  const navigate = useNavigate();
  let loggedin = false;
  useEffect(() =>{
       axios.defaults.withCredentials = true;
       axios.get('https://examsgazette.onrender.com/isLoggedin').then(res=>{
      
        if(res.data.user){
          sethref('');
          setBtnText("Sign Out");
          setWelcome("Welcome "+res.data.user);
          if(loggedin==false)
          {
            loggedin = true;
          }
        }
      else{
        sethref('/login');
        setBtnText("Sign In");
        setWelcome('');
      }
       }).catch(err=>{
        console.log("error");
       })
       
  }, [])

   const logout = ()=>
  {
      axios.defaults.withCredentials = true;
       axios.get("https://examsgazette.onrender.com/logout") //clear the cookie on the server
      .then(res =>{
        console.log(res.data)
        if(res.data.cleared){
          console.log("User logged out");
          navigate('/');
        }
      })
  }
  if(welcome.length>0)
  return (
    <>
    <ExamNavbar>
      <h1>ExamsGazette</h1>
      <div  className="dropdown show">
      <a href='/'>Home</a>
      <a href='/writeArticle'>Write an article</a>
      <a href='/latest'>Latest</a>
      <a class="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Streams
  </a>
          <ul className="dropdown-menu">
          <li><a className="dropdown-item" href="/Stream/Engineering">Engineering</a></li>
            <li><a className="dropdown-item" href="/Stream/Medical">Medical</a></li>
            <li><a className="dropdown-item" href="/Stream/Law">Law</a></li>
            <li><a className="dropdown-item" href="/Stream/CivilServices">Civil Services</a></li>
          </ul>
      </div>
      <a role='button' href = {href} className='' onClick={logout}>{btnText}</a>
      <a type="button" href="/Profile" class="" >Profile</a>
      
    </ExamNavbar>
    </>
  )
  else
  return (
    <>
    <ExamNavbar>
      <h1>ExamsGazette</h1>
      <div  className="dropdown show">
      <a href='/'>Home</a>
      <a href='/writeArticle'>Write an article</a>
      <a href='/latest'>Latest</a>
      <a class="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Streams
  </a>
          <ul className="dropdown-menu">
          <li><a className="dropdown-item" href="/Stream/Engineering">Engineering</a></li>
            <li><a className="dropdown-item" href="/Stream/Medical">Medical</a></li>
            <li><a className="dropdown-item" href="/Stream/Law">Law</a></li>
            <li><a className="dropdown-item" href="/Stream/CivilServices">Civil Services</a></li>
          </ul>
      </div>
      <a role='button' href = {href} className='' onClick={logout}>{btnText}</a>
    </ExamNavbar>
    </>
  )
}

export default Navbar
