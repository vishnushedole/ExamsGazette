import React from "react";
import { useState } from "react";
import { StyledNewsCarousel } from "../Styled/NewsCarouselStyled.js";

const newsArray = ["news1.jpg", "news2.jpg", "news3.jpg"]

function NewsCarousel()
{
    
    let [image, setImage] = useState(0);
    const nextImage = ()=>{
        if(image == 2){
            image = 0;
            setImage(image);
        }
        else{
            image++;
            setImage(image);
        }
    }
    const prevImage = ()=>{
        if(image == 0){
            image = 0;
            setImage(image);
        }
        else{
            image--;
            setImage(image);
        }
    }
    // setInterval(nextImage, 5000);
    return(
        <StyledNewsCarousel>
            <a href="#" class="previous round" onClick={prevImage}>&#8249;&#8249;</a>
            <img src={require(`../images/${newsArray[image]}`)}/>
            <a href="#" class="next round" onClick={nextImage}>&#8250;&#8250;</a>
        </StyledNewsCarousel>
    )
}
export default NewsCarousel