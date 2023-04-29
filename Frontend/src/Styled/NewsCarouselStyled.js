import styled from "styled-components";

export const StyledNewsCarousel = styled.div`

display:flex;
align-items:center;
justify-content:center;

a {
    text-decoration: none;
    display: inline-block;
    padding: 8px 16px;
  }
  
  a:hover {
    background-color: #ddd;
    color: black;
  }
  
  .previous {
    color: black;
    font-weight:bold;
  }
  
  .next {
    color: black;
    font-weight:bold;
  }
  .round {
    border-radius: 50%;
  }
  img{
    margin: 20px;
    width:70%;
    height:350px;
    border-radius:20px;
  }
`