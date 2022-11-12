import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import BlogFilter from '../components/blogFilter';
import { Blog } from '../models/blog.model'


function BlogPage() {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const postQuery = searchParams.get('post') || '';
  const latest = searchParams.has('latest');

  const startsFrom = latest ? 80 : 1;

  

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
  }, []);

  return (
    <div className="wrapper">
      <BlogFilter 
        postQuery={postQuery}
        latest={latest}
        setSearchParams={setSearchParams}
      />
      <button className='addPost'>
        <Link to='/posts/new'>Add new post</Link>
      </button>
      {posts.filter(
        post => post.title.includes(postQuery) && +post.id >= startsFrom
      ).map(post => (
        <Link className='postTitle' key={post.id} to={`/posts/${post.id}`}>
          <li>{post.title}</li>
        </Link>
      ))}
    </div>
  );
}

export default BlogPage;