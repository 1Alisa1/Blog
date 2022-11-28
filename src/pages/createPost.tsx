import { useAuth } from '../hook/useAuth';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Post } from '../models/post.model';

export enum CreatePostMode {
  Create = 1,
  Edit = 2,
}

interface CreatePostProps {
  mode: CreatePostMode;
}

const CreatePost = (props: CreatePostProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const [post, setPost] = useState<Omit<Post, 'id'> | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (post !== null) {
      switch (props.mode) {
        case CreatePostMode.Create: {
          fetch('http://localhost:8000/posts', {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then((response) => response.json())
            .then((json: Post) => {
              const fromPage =
                location.state?.from?.pathname || `/posts/${json.id}`;
              navigate(fromPage, { replace: true });
            });
          break;
        }
        case CreatePostMode.Edit: {
          fetch(`http://localhost:8000/posts/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(post),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then((response) => response.json())
            .then((json: Post) => {
              const fromPage =
                location.state?.from?.pathname || `/posts/${json.id}`;
              navigate(fromPage, { replace: true });
            });
          break;
        }
      }
    }
  }, [post]);

  useEffect(() => {
    if (props.mode === CreatePostMode.Edit && id) {
      fetch(`http://localhost:8000/posts/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json: Post) => {
          setTitle(json.title);
          setBody(json.body);
        });
    }
  }, [id]);

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

  const handleBodyChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    setBody(e.currentTarget.value);
  };

  const handleDeleteClick = () => {
    fetch(`http://localhost:8000/posts/${id}`, {
      method: 'DELETE',
    });

    navigate('/posts', { replace: true });
  }

  return (
    <div className="wrapper">
      <h1 className="text-center">Create a post</h1>
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
          <div className='buttons'>
            <input type="submit" value="Submit"></input>
            <button onClick={handleDeleteClick}>Delete</button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export { CreatePost };
