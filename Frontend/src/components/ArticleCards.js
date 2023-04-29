import {React,useState,Component} from 'react'
import { StyledArticle } from '../Styled/ArticleCard.styled'
import axios from 'axios'
export default class ArticleCards extends Component {
       constructor()
       {
        super();
        this.state={
            startIndex:0,
            endIndex:4,
            articles:[]
        }
       }
     
     next = ()=>{
        if(this.state.endIndex!=this.state.articles.length && this.state.articles.length>4)
         {
          this.setState({
            startIndex :this.state.startIndex+1,
            endIndex :this.state.endIndex+1
          })
         }
     }
      previous = ()=>{
      
      if(this.state.startIndex!=0 && this.state.articles.length>4)
       {
          this.setState({
            startIndex:this.state.startIndex-1,
            endIndex:this.state.endIndex-1
          })
       }
     }
   
     async componentDidMount()
     {
        console.log("hi")
        let Articles = await fetch('/getArticles')
        Articles = await Articles.json();
        console.log(Articles)
        let Art = [];
        await Articles.forEach(element => {
            Art.push(element)
        });
        this.setState({
            articles:Art
        })
        console.log(this.state.articles)
     }

  render() {
    
    return (
        <>
            <div id="articles">
                <h2 style={{"margin-top":"30px","textAlign":"center"}}>Articles</h2>
               
                <StyledArticle>
                <button  class="previous round" onClick={this.previous}>&#8249;&#8249;</button>
                    {this.state.articles.map((item,ind)=>{
                        if(ind>=this.state.startIndex && ind<this.state.endIndex)
                       {
                        return <>
                       <div class="card">
                        <img className="card-img-top" src={require("../images/im1.jpg")} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 class="card-title">{item.heading}</h5>
                            <p class="card-text">{(item.discription.length>60)?item.discription.substr(0,60)+"...":item.discription}</p>
                            <p class="card-text">By {item.username}</p>
                            <button className='btnn'><a href={"/Article/"+item._id}>Read More</a></button>
                        </div>
                    </div></>
                    }
                    })
                    }
                    <button  class="next round" onClick={this.next}>&#8250;&#8250;</button>
                </StyledArticle>
                
            </div>  
        </>
      )
  }
}









   
   
