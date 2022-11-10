import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Post } from "../models/post.model";

const SinglePage = () => {
  const {id} = useParams();
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data))
  }, [id]);

  return (
    <div className="wrapper">
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