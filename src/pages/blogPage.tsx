import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Blog } from '../models/blog.model'


function BlogPage() {
  const [posts, setPosts] = useState<Blog[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
  }, []);

  return (
    <div className="wrapper">
      {posts.map(post => (
        <Link className='postTitle' key={post.id} to={`/posts/${post.id}`}>
          <li>{post.title}</li>
        </Link>
      ))}
    </div>
  );
}

export default BlogPage;