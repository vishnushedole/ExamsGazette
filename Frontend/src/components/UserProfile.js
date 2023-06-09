import React,{useState,useEffect,useContext} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StyledUserProfile } from "../Styled/UserProfile.styled";
import userimage from '../images/web-surfing.svg';
import { useNavigate } from 'react-router';
import axios from 'axios';
import context from '../UserContext.js';


function UserProfile() {
    const navigate = useNavigate();
    const [userdata,setUserdata] = useState({firstname:'fetching...',lastname:'fetching...',email:'fetching..',SavedExams:[]})
    const [Exams,setExams] = useState([]);
    const [user,setUser] = useContext(context);
    
    useEffect(() => {
        axios.defaults.withCredentials = true;
        
        if(user==null)
        navigate('/')

        axios.post('https://examsgazette.onrender.com/getUser',{name:user}).then(res=>{
            setUserdata(res.data);
            axios.get('https://examsgazette.onrender.com/getStream?name=').then(exams=>{
                let SavedExams = [];
                exams.data.forEach(element => {
                    if(res.data.SavedExams.includes(element._id))
                    SavedExams.push(element);
                });
                setExams(SavedExams);
            })
        })
        
    },[user])
    
   
    return (

        <StyledUserProfile>
            <div className="user">
                <div className="details">
                    <div className="user-img">
                        <img className="img" src={userimage} alt="user" />
                    </div>
                    <div className="user-details">
                        <h3>Basic Details</h3>
                        <div className="user-basic-details">
                            <p><span>First Name</span> : {userdata.firstname}</p>
                            <p><span>Last Name</span> : {userdata.lastname}</p>
                            <p><span>Email</span> : {userdata.email}</p>
                            <p><span>Date of Birth</span> : 01/01/2002</p>
                            <p><span>Address</span> : Kumaraswamy Layout</p>
                        </div>

                    </div>
                </div>

                <div className="saved-exams">
                    <h2>Saved Exams</h2>
                    {Exams.map((item, ind) => {
                            return <div className='exams_It' key={ind}>
                                <img src={require("../images/JEE.jfif")} width='150' height='150' />
                                <div className="content">
                                    <h6>{item.name}</h6>
                                    <p> Last Date To Apply : {item.last_date}</p>
                                    <button className='btnn'><a href={item.Apply} >Apply Now</a></button>
                                </div>
                            </div>
                    })}
                </div>
            </div>
            <ToastContainer position="top-center" theme="dark"/>

        </StyledUserProfile>
    );
}

export default UserProfile;