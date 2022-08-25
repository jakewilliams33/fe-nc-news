import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getCommentsByArticle,
  getSingleArticle,
  postComment,
  updateVotes,
} from "../api";

export const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    username: "jessjelly",
    body: "",
  });

  useEffect(() => {
    getSingleArticle(article_id).then((article) => {
      setArticle(article);
    });
  }, [article_id]);

  const handleUpvote = () => {
    updateVotes(article_id, { inc_votes: 1 });
    const newArticle = { ...article };
    newArticle.votes += 1;
    setArticle(newArticle);
  };

  const handleDownvote = () => {
    updateVotes(article_id, { inc_votes: -1 });
    const newArticle = { ...article };
    newArticle.votes -= 1;
    setArticle(newArticle);
  };

  useEffect(() => {
    getCommentsByArticle(article_id).then((comments) => {
      setComments(comments);
    });
  }, [article_id]);

  const handleChange = (event) => {
    const newCommentCopy = { ...newComment };
    newCommentCopy.body = event.target.value;
    setNewComment(newCommentCopy);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postComment(article_id, newComment);
    const commentsCopy = [
      {
        author: "jessjelly",
        body: newComment.body,
        posted: "now",
        tempKey: Date.now().toString(),
      },
      ...comments,
    ];
    setComments(commentsCopy);
  };

  return (
    <>
      <h1>{article.title}</h1>
      <p>{article.author}</p>
      <p>{new Date(article.created_at).toUTCString()}</p>
      <hr></hr>
      <p>{article.body}</p>
      <hr></hr>
      <div className="articleEnd">
        <p>
          tagged:{" "}
          <Link className="topicLinkSingle" to={`/${article.topic}`}>
            {article.topic}
          </Link>
        </p>
        <div className="votes">
          <p>votes: {article.votes}</p>
          <button onClick={handleUpvote} className="up">
            upvote
          </button>
          <button onClick={handleDownvote} className="down">
            downvote
          </button>
        </div>
      </div>
      <hr></hr>
      <div className="commentsCount">
        <h3 className="commentsHeader">Comments</h3>
        <p className="num">{article.comment_count}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          onChange={(event) => {
            handleChange(event);
          }}
          type="text"
          placeholder="Add a comment..."
          required
        ></input>
        <input type="submit"></input>
      </form>

      {comments.map((comment) => {
        const date = comment.created_at
          ? new Date(comment.created_at).toUTCString()
          : "now";
        return (
          <div key={comment.comment_id ? comment.comment_id : comment.tempKey}>
            <p key={comment.author} className="commentAuthor">
              {comment.author}
            </p>
            <p key={comment.created_at} className="commentDate">
              {date}
            </p>
            <p key={comment.body} className="commentBody">
              {comment.body}
            </p>
            <hr></hr>
          </div>
        );
      })}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </>
  );
};
