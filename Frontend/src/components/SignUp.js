import React from 'react'
import {StyledPopup}  from '../Styled/LoginPopup.styled'
import { useState,useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import context from '../UserContext.js';

function SignUp() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [SavedExams, setSavedExams] = useState([]);
  const [errorText, setErrorText] = useState('');
  const [user,setUser] = useContext(context);
  const navigate = useNavigate();
  


  async function submit(e){
    e.preventDefault();
    if(firstname == '' || lastname == '' || email == '' || password == '' || confirm == ''){
      setErrorText("*Please fill all the fields!");
    }
    else if(password !== confirm){
      setErrorText("*Passwords don't match");
    }
    else{
      try{
        setErrorText('');
        axios.defaults.withCredentials = true;
        await axios.post("https://examsgazette.onrender.com/signup",{
          firstname, lastname, email, password,SavedExams
        })
        .then(res =>{
          if(res.data.valid){
            setUser(res.data.user);
            localStorage.setItem('user',res.data.user);
             navigate('/');
          }
        })
        .catch(err => console.log(err));
      }
      catch(e){
        console.log(e);
      }
    }
  }


  return (
    <>
    <StyledPopup>
      <h1>Sign Up</h1>
      <p>{errorText}</p>
      <form>
        <div className='formdiv'>
            <div className='formelements'>
                <label>Firstname</label>
                <br/>
                <input name='firstname' placeholder='Firstname' type='text' onChange={(e) => {setFirstname(e.target.value)}}></input>
            </div>
            <div className='formelements'>
                <label>Lastname</label>
                <br/>
                <input name='lastname' placeholder='Lastname' type='text' onChange={(e) => {setLastname(e.target.value)}}></input>
            </div>
            <div className='formelements'>
                <label>Username or email address</label>
                <br/>
                <input name='email' placeholder='Email' type='email' onChange={(e) => {setEmail(e.target.value)}}></input>
            </div>
            <div className='formelements'>
                <label>Password</label>
                <br/>
                <input type='password' name='password' placeholder='Password' onChange={(e) => {setPassword(e.target.value)}}></input>
            </div>
            <div className='formelements'>
                <label>Confirm Password</label>
                <br/>
                <input type='password' name='confirm' placeholder='Confirm password' onChange={(e) => {setConfirm(e.target.value)}}></input>
            </div>
            <div className='formelements'>
                  <button type='submit' onClick={submit}>Create Account</button>
            </div>
        </div>
      </form>
    </StyledPopup>
    </>
  )
}

export default SignUp
