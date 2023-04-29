import React,{useState,useEffect} from "react";
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StyledUserProfile } from "../Styled/UserProfile.styled";
import userimage from '../images/web-surfing.svg';
import { useNavigate } from 'react-router';
import axios from 'axios';

function UserProfile() {
    const navigate = useNavigate();
    const [user,setUser] = useState({firstname:'fetching...',lastname:'fetching...',email:'fetching..'})
    const [Exams,setExams] = useState([
        {
        "_id": "6448df352704179bec51155a",
        "stream": "Law",
        "image": "../images/CLAT.jpg",
        "name": "CLAT",
        "last_date": "25 Apr",
        "eligibility": "Candidates should have passed Class 12 with at least 45% marks (40% in the case of SC and ST students) from a recognized board or institution.Candidates who will appear in Class 12th board exams in April-May 2024 are also eligible to appear in the exam. However, the admission of such students will be subject to fulfilling the required eligibility criteria.",
        "Apply": "https://consortiumofnlus.ac.in/"
        },
        {
        "_id": "6448dfe92704179bec51155b",
        "stream": "Law",
        "image": "../images/CLAT.jpg",
        "name": "AILET ",
        "last_date": "25 Apr",
        "eligibility": "10+2 or equivalent examination with minimum 45% aggregate marks (40% in case of SC/ST/Persons with Disabilities).Candidates appearing for their 10+2 exam can also apply for UG programme.",
        "Apply": "https://nationallawuniversitydelhi.in/"
        },
        {
        "_id": "6448e0a22704179bec51155c",
        "stream": "Law",
        "image": "../images/ULSAT.jpg",
        "name": "ULSAT",
        "last_date": "25 Apr",
        "eligibility": "Candidates need to have at least 50% marks in the 10th and 12th classes of 10+2 educational system.",
        "Apply": "https://nationallawuniversitydelhi.in/"
        },
        {
        "_id": "6448e0a22704179bec51155d",
        "stream": "Law",
        "image": "../images/LAWCET.jpg",
        "name": "TS LAWCET",
        "last_date": "25 Apr",
        "eligibility": "45% marks in aggregate",
        "Apply": "https://lawcet.tsche.ac.in/"
        },
        {
        "_id": "6448e2972704179bec51155e",
        "stream": "Law",
        "image": "../images/LAWCET.jpg",
        "name": "MH CET LAW",
        "last_date": "25 Apr",
        "eligibility": "Qualifying exam : The candidate needs to have passed 10+2 or an equivalent exam (including 3-year diploma in engineering)Minimum marks : Maharashtra state candidates needs to secure a minimum aggregate of: 45% - General category, 40% - SC/ST, 42% - VJ / DT / NT(A) / NT / O.B.C./ S.B.C. category.Others : Candidates who have passed senior secondary or obtained a first-degree certificates through distance education or correspondence method are also eligible for admission",
        "Apply": "https://cetcell.mahacet.org/"
        }
        ])
    const stream="Law";

    useEffect(() => {
        let sessionUser = sessionStorage.getItem('sessionUser');
        if(sessionUser==null)
        navigate('/')

        axios.post('/getUser',{name:sessionUser}).then(res=>{
            setUser(res.data);
        })
    })
    // console.log(Exams)
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
                            <p><span>First Name</span> : {user.firstname}</p>
                            <p><span>Last Name</span> : {user.lastname}</p>
                            <p><span>Email</span> : {user.email}</p>
                            <p><span>Date of Birth</span> : 01/01/2002</p>
                            <p><span>Address</span> : Kumaraswamy Layout</p>
                        </div>

                    </div>
                </div>

                <div className="saved-exams">
                    <h2>Saved Exams</h2>
                    {Exams.map((item, ind) => {
                        console.log(item)
                        if (item.stream === stream)
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