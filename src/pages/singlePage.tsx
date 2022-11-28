import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Post } from '../models/post.model';
import BackButton from '../components/backButton';

const SinglePage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [id]);

  return (
    <>
      <div className="wrapper">
        <BackButton step={-1} />
        {post && (
          <>
            <div className="text">
              <h1>{post.title}</h1>
              <p>{post.body}</p>
            </div>
          </>
        )}
      </div>
      <button className='editPost'>
        <Link to={`/posts/edit/${id}`}>Edit</Link>
      </button>
    </>
  );
};

export default SinglePage;
