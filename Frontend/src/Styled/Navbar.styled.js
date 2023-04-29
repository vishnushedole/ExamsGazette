import styled from 'styled-components'

export const ExamNavbar = styled.nav`
    color:;
    display:flex;
    align-items:center;
    justify-content:space-around;
    height:80px;
    background-color:#ffeb3b;
    h1{
        color:black;
        font-family:Arial;
        font-size:30px;
        text-transform-lowercase;
    }
    a{
        color:black;
        text-decoration:none;
        margin:0 1rem;
        font-size:17px;
        padding: 0px 15px;   
    }
    
    a:hover{
        border:1px solid skyblue;
        border-radius: 10px;
        transition:0.01s;   
    }
    button{
        
        border:none;
        color:black;
        font-size:17px;  
    }
    // .btn btn-secondary dropdown-toggle{
    //     margin-top:10px;
    //     background-color:#
    // }
`
