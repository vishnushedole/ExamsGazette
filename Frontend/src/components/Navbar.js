import { React, useContext, useEffect, useState } from 'react'
import { ExamNavbar } from '../Styled/Navbar.styled.js'
import { Link  } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router';
import context from '../UserContext.js';


function Navbar() {
  
  const[href, sethref] = useState('/login');
  const[btnText, setBtnText] = useState('Sign In');
  const[welcome, setWelcome] = useState('');

  const navigate = useNavigate();
  let loggedin = false;

  const [user,setUser] = useContext(context);
  console.log('test')
  useEffect(() =>{
       let User = localStorage.getItem('user');
       if(User!=null)
       setUser(User);

       axios.get('https://examsgazette.onrender.com/isLoggedin?name='+User).then(res=>{
        console.log(res)
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
       
  }, [user])

   const logout = ()=>
  {
      axios.defaults.withCredentials = true;
       axios.get("https://examsgazette.onrender.com/logout?name="+user) 
      .then(res =>{
        
        if(res.data.cleared){
          console.log("User logged out");
          setUser(null);
          localStorage.removeItem('user');
          sethref('/login');
        setBtnText("Sign In");
        setWelcome('');
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
      <Link to='/'>Home</Link>
      <Link to='/writeArticle'>Write an article</Link>
      <Link to='/latest'>Latest</Link>
      <Link class="btn dropdown-toggle" to="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Streams
  </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/Stream/Engineering">Engineering</Link></li>
          <li><Link className="dropdown-item" to="/Stream/Medical">Medical</Link></li>
          <li><Link className="dropdown-item" to="/Stream/Law">Law</Link></li>
          <li><Link className="dropdown-item" to="/Stream/CivilServices">Civil Services</Link></li>
          </ul>
      </div>
      <Link role='button' to = {href} className='' onClick={logout}>{btnText}</Link>
      <Link type="button" to="/Profile" class="" >Profile</Link>
      
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
      <a role='button' href = {href} className=''>{btnText}</a>
    </ExamNavbar>
    </>
  )
}

export default Navbar
