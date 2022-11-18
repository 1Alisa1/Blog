import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Post } from "../models/post.model";
import left from "../img/left.png";

interface SinglePageProps{
  cachedPosts: Post[]
}

const SinglePage = (props: SinglePageProps) => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post>();

  const goBack = () => navigate(-1);

  useEffect(() => {
    if(props.cachedPosts.some(post => (post.id).toString() === id)) {
      setPost(props.cachedPosts.filter(post => (post.id).toString() === id)[0]);
    } else {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(res => res.json())
        .then(data => setPost(data))
    }
  }, [id, props.cachedPosts]);

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