import React, {useState, useEffect, useCallback} from 'react'
import PostCard from '../../components/postCard/PostCard'
import NavigationBar from '../../components/NavBar/NavigationBar'
import './PostPage.css'
import Comment from '../../components/comments/Comment'
function PostPage({match}) {
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchPost = useCallback(async (id) => {

    await fetch("http://localhost:9001/posts")
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      const post = json[id]
    console.log({post})
    setPost({...post})
    }).catch((excep)=>{
      console.log(excep);
    })

    
    
  }, [])

  const fetchComments = useCallback(async (id) => {
    console.log('Before fetch comment ')
    const data = null;
    await fetch("http://localhost:9001/authors")
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      data = json.filter(
        cmt => parseInt(cmt.postId) === parseInt(id),
      );
      console.log('After fetch comment ', data)
    setLoading(false)
    setComments([...data])
    }).catch((excep)=>{
      console.log(excep);
    })


    
  }, [])

  useEffect(() => {
    fetchPost(match.params.postId)
  }, [fetchPost, match.params.postId])

  useEffect(() => {
    fetchComments(match.params.postId)
  }, [fetchComments, match.params.postId])

  return (
    <div>
      {post.title === undefined ? (
        <h1>Loading....</h1>
      ) : (
        <PostCard
          title={post.title}
          authorId={post.authorId}
          date={post.datePublished}
          numLikes={post.numLikes}
          description={post.description}
        />
      )}

      <h4 className="mt-4 text-center">Comments</h4>
      <div className="comment-box d-flex justify-content-center">
        <br></br>
        <ul className="list-unstyled m-4 ">
          {loading ? (
            <h1>loading</h1>
          ) : comments.length === 0 ? (
            <h1>No comment </h1>
          ) : (
            comments.map(comment => <Comment key={comment.id} data={comment} />)
          )}
        </ul>
      </div>
    </div>
  )
}

export default PostPage
