import {React,useContext,Component} from 'react'
import { StyledArticle } from '../Styled/ArticleCard.styled'
import { useNavigate } from 'react-router';
import context from '../UserContext.js';

class ArticleCardsComp extends Component {
       constructor()
       {
        super();
        this.state={
            startIndex:0,
            endIndex:4,
            articles:[],
            user:''
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
      FullArticle(id){
        console.log(this.state.user);
         this.props.navigate("/Article/"+id)
     }
     async componentDidMount()
     {
        console.log("hi")
        this.setState ({
            user:this.props.User
        })
        let Articles = await fetch('https://examsgazette.onrender.com/getArticles')
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
                            <h5 class="card-title">{(item.heading.length>15)?item.heading.substr(0,15)+"...":item.heading}</h5>
                            <p class="card-text">{(item.discription.length>30)?item.discription.substr(0,30)+"...":item.discription}</p>
                            <p class="card-text">By {item.username}</p>
                            <button className='btnn' onClick={()=>this.FullArticle(item._id)}>Read More</button>
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


function ArticleCards() {
    
    const [user,setUser] = useContext(context);
    console.log(user)
    let navigate = useNavigate();
  return (
   <ArticleCardsComp User={user} navigate={navigate}/>
  )
}

export default ArticleCards;









   
   

