import { useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import { Post } from "../models/post.model";
import BackButton from "../components/backButton";

interface SinglePageProps{
  cachedPosts: Post[]
}

const SinglePage = (props: SinglePageProps) => {
  const {id} = useParams();
  const [post, setPost] = useState<Post>();

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
  );
}

export default SinglePage;