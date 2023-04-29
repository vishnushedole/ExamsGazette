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
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <Navbar/>
  <Router>
    <Routes>
      <Route path="/" element={<>
        <NewsCarousel/>
        <News/>
        <ArticleCards/>
      </>}/>
      <Route path="/writeArticle" element={<WriteArticle/>}/>
      <Route path="/Article/:id" element={<Article/>}/>
      <Route path="/Stream/:stream" element={<Stream/>}/>
      <Route path="/latest" element={<Latest/>}/>
    </Routes>
  </Router>
  <Footer/>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
