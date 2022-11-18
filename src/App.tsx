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
  const [cachedPosts, setCachedPosts] = useState<Post[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  const addPostToCache = (newPost: Post) => {
    const maxId = cachedPosts
      .map(post => post.id)
      .reduce((a, b) => (a > b ? a : b), 0);

    const id = maxId === 0 ? newPost.id : maxId + 1;

    const post = {
      id: id,
      title: newPost.title,
      body: newPost.body,
      userId: newPost.userId
    };

    setCachedPosts([...cachedPosts, post]);

    const fromPage = location.state?.from?.pathname || `/posts/${id}`;
    navigate(fromPage, {replace: true});
  }

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />;
            <Route path="about" element={<AboutPage />} />;
            <Route path="posts" element={
              <BlogPage 
                cachedPosts={cachedPosts}
              />
            } />;
            <Route path="posts/:id" element={
              <SinglePage
                cachedPosts={cachedPosts}
              />
            } />
            <Route
              path="posts/new"
              element={
                <RequareAuth>
                  <CreatePost
                    addPost={addPostToCache} />
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
