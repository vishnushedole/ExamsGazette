import React from 'react'
import { ExamNavbar } from '../Styled/Navbar.styled.js'

function Navbar() {
  return (
    <ExamNavbar>
      <h1>ExamsGazette</h1>
      <div className='dropdown show'>
          <a href='/'>Home</a>
          <a href='/writeArticle'>Write an article</a>
          <a href='/latest'>Latest</a>
          <a className="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Streams</a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="/Stream/Engineering">Engineering</a></li>
            <li><a className="dropdown-item" href="/Stream/Medical">Medical</a></li>
            <li><a className="dropdown-item" href="/Stream/Law">Law</a></li>
            <li><a className="dropdown-item" href="/Stream/CivilServices">Civil Services</a></li>
          </ul>
      </div>
      <button type="button" className="btn btn-primary">Sign In</button>
    </ExamNavbar>
  )
}

export default Navbar
