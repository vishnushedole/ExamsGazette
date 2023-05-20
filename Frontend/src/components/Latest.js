import React, { Component,useContext } from 'react'
import context from '../UserContext.js';

let data;
export class Latest extends Component {
    constructor()
    {
        super();
        this.state = {
            News:[],
            Key:""
        }
    }
    async componentDidMount()
    {

       data = await fetch('https://examsgazette.onrender.com/fetch')
       data = await data.json();
       
       this.setState({
        News:data
       })
       
    }
    SetKey = (event)=>
    {
        this.setState({
            Key : event.target.value
        })
    }
    Filter = ()=>{
        let SearchReasult = [];
        console.log(this.state.Key)
         this.state.News.forEach((element,ind)=>{
            if(element.discription.includes(this.state.Key)==true)
                SearchReasult.push(element);
        })
        this.setState({
            News:SearchReasult
        })
    }
  render() {
    return (
        <>
        <div className='searchBox'>
            <input type="search" onChange={this.SetKey} value={this.state.Key}/>
            <input type="button" className="btnn" onClick={this.Filter} value="Search"/>
        </div>
        <div className='news'>
         <h2>Latest News</h2>
         {this.state.News.map((item,ind)=>{
            return <div className='news_Itm' key={ind}>
                    <img src={item.imgurl} width='200' height='130'/>
                    <div><a href={item.source} style={{"text-decoration":"none","color":"Black"}}><h6>{item.headline}</h6></a>
                    <p> Edited by {item.Editor}</p>
                    <p> {item.discription}</p>
                    </div>
                </div> 
        })}
        </div></>
        )
  }
}

function LatestNews()
{
    const [user,setUser] = useContext(context);
    console.log(user);
    return <Latest/>
}
export default LatestNews;
