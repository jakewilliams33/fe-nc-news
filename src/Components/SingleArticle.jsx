import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleArticle } from "../api";

export const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    getSingleArticle(article_id).then((article) => {
      setArticle(article);
    });
  }, [article_id]);

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
          <a className="topicLinkSingle" href={`/${article.topic}`}>
            {article.topic}
          </a>
        </p>
        <p>votes: {article.votes}</p>
      </div>
    </>
  );
};
