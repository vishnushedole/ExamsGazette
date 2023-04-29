import styled from "styled-components";

export const StyledUserProfile = styled.div`
    .user{
        display: grid;
        grid-template-columns: 40% 60%;
    }   
    .user-img{
        display:flex;
        flex-direction:column;
        justify-content: center;
        align-items:center;
    }
    .img{
        width: 60%;
    }    
    .user-details{
        display:flex;
        flex-direction:column;
        justify-content: center;
        align-items:center;
    }
    .user-basic-details{
        font-size: 20px;
        margin-top: 10px;
        border: 1px solid grey;
        border-radius: 10px;
        width:auto;
        padding: 40px;
        box-shadow: 5px 5px 10px 5px #ffeb3b;
    }
    .user-basic-details span{
        font-weight: 500;
    }
    .saved-exams{
        display:flex;
        flex-direction:column;
        column-gap: 50px;
        justify-content: center;
        align-items:center;
    }
    .saved-exams h2{
        margin-top: 50px;
    }
    .exams_It{
        width:60%;
        height:25vh;
        padding: 10px;
        display: grid;
        grid-template-columns: 50% 50%;
        border: 3px solid grey;
        border-radius: 10px;
        margin: 10px;
    }
    .exams_It .content{
        margin-top: 20px;
    }
    .exams_It:hover{
        box-shadow: 5px 5px #ffeb3b;
    }
`