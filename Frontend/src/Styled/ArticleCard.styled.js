import styled from "styled-components";
export const StyledArticle = styled.div
`
background-color:#eceff1;
margin-top:40px;
height:400px;
display:flex;
align-items:center;
justify-content:space-evenly;
.card{
    width:20rem;
    height:350px;
}

.card-img-top{
    margin-top:5px;
    height:150px;
    width:15rem;
}
.round {
    width:40px;
    height:40px;
    border-radius: 50%;
    border:1px white;
  }
.previous {
    color: black;
    font-weight:bold;
}
  
.next {
    color: black;
    font-weight:bold;
}
button:hover{
    background-color:grey;
    color:white;
}
`