import {Routes, Route} from 'react-router-dom';
import AboutPage from './pages/aboutPage';
import HomePage from './pages/homePage';
import BlogPage from './pages/blogPage';
import SinglePage from './pages/singlePage';
import NotFoundPage from './pages/notFoundPage';
import {Layout} from './components/layout';

function App() {
  return (
    <>
      
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />;
          <Route path='about' element={<AboutPage />} />;
          <Route path='posts' element={<BlogPage />} />;
          <Route path='posts/:id' element={<SinglePage />} />
          <Route path='*' element={<NotFoundPage />} />;
        </Route>
        
      </Routes>
    </>
  );
}

export default App;
