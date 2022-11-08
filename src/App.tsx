import {Routes, Route, Link} from 'react-router-dom';
import AboutPage from './pages/aboutPage';
import HomePage from './pages/homePage';
import BlogPage from './pages/blogPage';
import NotFoundPage from './pages/notFoundPage';

function App() {
  return (
    <>
      <header>
        <Link to='/'>Home</Link>
        <Link to='/blog'>Blog</Link>
        <Link to='/about'>About</Link>
      </header>
      <Routes>
        <Route path='/' element={<HomePage />} />;
        <Route path='/about' element={<AboutPage />} />;
        <Route path='/blog' element={<BlogPage />} />;
        <Route path='*' element={<NotFoundPage />} />;
      </Routes>
    </>
  );
}

export default App;
