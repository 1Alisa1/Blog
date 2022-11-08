import {Routes, Route} from 'react-router-dom';
import AboutPage from './pages/aboutPage';
import HomePage from './pages/homePage';
import BlogPage from './pages/blogPage';
import NotFoundPage from './pages/notFoundPage';
import {Layout} from './components/layout';

function App() {
  return (
    <>
      
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />;
          <Route path='about' element={<AboutPage />} />;
          <Route path='blog' element={<BlogPage />} />;
          <Route path='*' element={<NotFoundPage />} />;
        </Route>
        
      </Routes>
    </>
  );
}

export default App;
