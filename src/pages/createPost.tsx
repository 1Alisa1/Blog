import { useAuth } from '../hook/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Post } from '../models/post.model';

const CreatePost = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const [post, setPost] = useState<Omit<Post, 'id'> | null>(null);


  useEffect(() => {
    if (post !== null) {
      fetch('http://localhost:8000/posts', {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((response) => response.json())
      .then((json: Post) => {
        const fromPage = location.state?.from?.pathname || `/posts/${json.id}`;
        navigate(fromPage, {replace: true});
      });
    }
  }, [post]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setPost({
      title: title,
      body: body,
      userId: new Date().getMilliseconds(),
    });


  };

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.currentTarget.value);
  };

  const handleBodyChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setBody(e.currentTarget.value);
  };

  return (
    <div className='wrapper'>
      <h1 className='text-center'>Create a post</h1>
      <button onClick={() => signOut(() => navigate('/', { replace: true }))}>
        Log out
      </button>
      <div className="wrapper addPost">
        <form onSubmit={handleSubmit}>
          <input
            className="addTitle"
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
          />
          <textarea
            placeholder="Text..."
            value={body}
            onChange={handleBodyChange}
          ></textarea>
          <input type="submit" value="Add"></input>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
