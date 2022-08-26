import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import {
  getCommentsByArticle,
  getSingleArticle,
  postComment,
  updateVotes,
  deleteThisComment,
} from "../api";

//main function
export const SingleArticle = () => {
  const { article_id } = useParams();
  const [val, setVal] = useState("");
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    username: "jessjelly",
    body: "",
  });

  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  //get article info
  useEffect(() => {
    getSingleArticle(article_id).then((article) => {
      setArticle(article);
    });
  }, [article_id]);

  //votes
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

  //get Comments array
  useEffect(() => {
    getCommentsByArticle(article_id).then((comments) => {
      comments.sort((a, b) => {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      });
      setComments(comments);
    });
  }, [article_id]);

  // set state to current string in comment field
  const handleChange = (event) => {
    const newCommentCopy = { ...newComment };
    newCommentCopy.body = event.target.value;
    setNewComment(newCommentCopy);
    setVal(event.target.value);
  };

  //submit comment
  const handleSubmit = (event) => {
    event.preventDefault();
    postComment(article_id, newComment);

    const commentsCopy = [
      {
        author: "jessjelly",
        body: newComment.body,
        posted: timeAgo.format(new Date()),
        tempKey: Date.now().toString(),
      },
      ...comments,
    ];
    setComments(commentsCopy);
    setVal("");
  };

  //delete comment
  const handleDelete = (event) => {
    deleteThisComment(event.target.value);
    console.log(event.target.value);
    const commentsTemp = [...comments];

    for (let i = 0; i < commentsTemp.length; i++) {
      if (
        comments[i].comment_id &&
        comments[i].comment_id.toString() === event.target.value
      ) {
        comments[i].body = "comment deleted";
        comments[i].created_at = new Date();
        comments[i].author = "";
      }
    }
    setComments([...commentsTemp]);
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
          value={val}
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
          ? timeAgo.format(new Date(comment.created_at))
          : comment.posted;
        return (
          <div key={comment.comment_id ? comment.comment_id : comment.tempKey}>
            <p key={comment.author} className="commentAuthor">
              {comment.author}
            </p>
            {comment.comment_id && comment.author === "jessjelly" && (
              <button
                onClick={handleDelete}
                value={
                  comment.comment_id ? comment.comment_id : comment.tempKey
                }
              >
                Delete
              </button>
            )}
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
