import react ,{Component} from 'react';
import '../App.css';
import axios from 'axios';
export default class About extends Component{
    constructor()
    {
        super();
        this.state={
            username:"",
            txt : "",
            words:0,
            heading:"Heading of your article",
            content:"It should me maximum of 1000 words.",
            Discription:"Discription.",
            comments:[],
            status:""
        };
        
    }
    
    Change_title=(event)=>{
        this.setState({
          heading:event.target.value
        })
    }
    Change_content=(event)=>{
        
        let count=0;
        for(let i=0;i<event.target.value.length;i++)
        {
            if(this.state.content[i]==' ')
            count++;
        }
        if(count<=1000)
        {
            this.setState({
                content:event.target.value,
                words:count
              })
        }
    }
    Change_discription = (event)=>{
        this.setState({
            Discription:event.target.value
        })
    }
    
    saveArticle =async ()=>{
        let Article = {
            username : this.state.username,
        heading : this.state.heading,
        discription : this.state.Discription,
        content : this.state.content,
        comments:[]
    }
    if(this.state.username!="")
    {
        axios.post('/postArticle',Article).then(()=>{
        this.setState({
            words:0,
            heading:"Heading of your article",
            content:"It should me maximum of 1000 words.",
            Discription:"Discription.",
            status:"Congraturaltions,Your Article has been successfully published!"
        })
    });
    }
    else
    this.setState({
        status:"You must login before publishing article."
    })
    
    }
    render(){
        
        if(this.state.status.length!=0)
            return (
                <>
                <div className='status'>{this.state.status}</div>
              <div className="publish_article">
              <p>Share your experiance with other students</p>
              <div id="title">Heading  <input type="text" value={this.state.heading} onChange={this.Change_title}></input></div>
              <div id="Disc">Discription  <input type="text" value={this.state.Discription} onChange={this.Change_discription}></input></div>
               <textarea className="editor" value={this.state.content} onChange={this.Change_content}></textarea>
              <p id="wordCount">{this.state.words}/1000</p>
              <input className="Btn" type="submit" value="POST" onClick={this.saveArticle}></input>
              </div>
            </>
            )
            else
            return (
                <>
              <div className="publish_article">
              <p>Share your experiance with other students</p>
              <div id="title">Heading  <input type="text" value={this.state.heading} onChange={this.Change_title}></input></div>
              <div id="Disc">Discription  <input type="text" value={this.state.Discription} onChange={this.Change_discription}></input></div>
               <textarea className="editor" value={this.state.content} onChange={this.Change_content}></textarea>
              <p id="wordCount">{this.state.words}/1000</p>
              <input className="Btn" type="submit" value="POST" onClick={this.saveArticle}></input>
              </div>
            </>
            )
        
    }
}
