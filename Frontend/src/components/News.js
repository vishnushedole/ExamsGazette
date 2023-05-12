import React, { Component } from 'react'

let data = [];

export class News extends Component {
    constructor()
    {
        super();
        this.state = {
            News:[]
        }
    }
     async componentDidMount()
    {
       data = await fetch('https://examsgazette.onrender.com/fetch',{credentials:"include"});
       data = await data.json();
       
       this.setState({
        News:data
       })
    }
  render() {
    let toDisplay = [];
    toDisplay = this.state.News.slice(0,5);
    
    return (
    <div className='news'>
     <h2>Latest News</h2>
     {toDisplay.map((item,ind)=>{
        return <div className='news_Itm' key={ind}>
                <img src={item.imgurl} width='200' height='130'/>
                <div><a href={item.source} style={{"text-decoration":"none","color":"Black"}}><h6>{item.headline}</h6></a>
                <p> Edited by {item.Editor}</p>
                <p> {item.discription}</p>
                </div>
            </div> 
    })}
    <button class="btnn"><a href="/latest">More News</a></button>
    </div>
    )
    
  }
}

export default News;
