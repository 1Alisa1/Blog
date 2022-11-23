import { useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import AboutPage from './pages/aboutPage';
import HomePage from './pages/homePage';
import BlogPage from './pages/blogPage';
import SinglePage from './pages/singlePage';
import NotFoundPage from './pages/notFoundPage';
import LoginPage from './pages/loginPage';
import { Layout } from './components/layout';
import RequareAuth from './hoc/requireAuth';
import { AuthProvider } from './hoc/authProvider';
import { Post } from './models/post.model';
import CreatePost from './pages/createPost';


function App() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />;
            <Route path="about" element={<AboutPage />} />;
            <Route path="posts" element={
              <BlogPage />
            } />;
            <Route path="posts/:id" element={
              <SinglePage />
            } />
            <Route
              path="posts/new"
              element={
                <RequareAuth>
                  <CreatePost />
                </RequareAuth>
              }
            />
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />;
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
