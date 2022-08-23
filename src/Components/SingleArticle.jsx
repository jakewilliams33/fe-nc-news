import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSingleArticle, updateVotes } from "../api";

export const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});

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
    </>
  );
};
