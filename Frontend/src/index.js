import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Navbar from './components/Navbar.js'
import NewsCarousel from './components/NewsCarousel.js'
import News from './components/News.js'
import WriteArticle from './components/WriteArticle.js'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import ArticleCards from './components/ArticleCards';
import Article from './components/FullArticle.js'
import Stream from './components/Stream';
import Latest from './components/Latest.js'
import Footer from'./components/footer.js'
import UserProfile from './components/UserProfile';
import SignUp from './components/SignUp';
import LoginPopup from './components/LoginPopup'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <Router>
    <Routes>
      <Route path="/" element={<>
        <Navbar/>
        <NewsCarousel/>
        <News/>
        <ArticleCards/>
      </>}/>
      <Route path="/writeArticle" element={<>
        <Navbar/>
        <WriteArticle/>
      </>}/>
      <Route path="/Article/:id" element={<>
        <Navbar/>
        <Article/>
      </>}/>
      <Route path="/Stream/:stream" element={
      <>
      <Navbar/>
      <Stream/>
      </>}/>
      <Route path="/latest" element={<>
        <Navbar/>
        <Latest/>
      </>}/>
      <Route path="/Profile" element={
      <>
      <Navbar/>
      <UserProfile/>
      </>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/login" element={<LoginPopup/>}/>
    </Routes>
  <Footer/>
  </Router>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
