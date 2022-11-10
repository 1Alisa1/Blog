import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Post } from "../models/post.model";
import left from "../img/left.png";
const SinglePage = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post>();

  const goBack = () => navigate(-1);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data))
  }, [id]);

  return (
    <div className="wrapper">
      <button className='buttonLeft'onClick={goBack}>
        <img src={left} alt='left'></img>
      </button>
      {post && (
        <>
          <div className="text">
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
          
        </>
      )}
    </div>
  );
}

export default SinglePage;