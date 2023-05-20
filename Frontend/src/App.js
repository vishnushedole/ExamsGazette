import './App.css';
import {useState} from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import ArticleCards from './components/ArticleCards';
import Article from './components/FullArticle.js'
import Stream from './components/Stream';
import Latest from './components/Latest.js'
import Footer from'./components/footer.js'
import UserProfile from './components/UserProfile';
import SignUp from './components/SignUp';
import LoginPopup from './components/LoginPopup';
import UserContext from './UserContext';
import Navbar from './components/Navbar.js'
import NewsCarousel from './components/NewsCarousel.js'
import News from './components/News.js'
import WriteArticle from './components/WriteArticle.js'
function App() {
  const [user,setUser] = useState(null);
  return (
    <>
    <UserContext.Provider value={[user,setUser]}>
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
  </UserContext.Provider>
    </>
  );
}

export default App;
