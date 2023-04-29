import React, { Component } from 'react'

export class footer extends Component {
  render() {
    return (
      <div className='footer'>
        <div className='FootNav'>
            <div id="logo">
            <a href="#"><img src={require("../images/Facebook.png")} width="30" height="30"></img></a>
            <a href="#"><img src={require("../images/instagram.png")} width="30" height="30"></img></a>
            <a href="#"><img src={require("../images/linkedin.png")} width="30" height="30"></img></a>
            <a href="#"><img src={require("../images/twitter.png")} width="30" height="30"></img></a>
            </div>
            <div id="sections">
                <a href="/">Home</a><p>|</p>
                <a href="/latest">Latest News</a><p>|</p>
                <a  href="/writeArticle">Articles</a><p>|</p>
                <a  href="/">Exams</a>
            </div>
        </div>
        <div className='Footlogo'>
            <h4>ExamsGazette</h4>
            <p>Copyright © 2023</p>
        </div>
      </div>
    )
  }
}

export default footer
