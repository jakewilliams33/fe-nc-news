import { useState, useEffect } from "react";
import { getArticles } from "../api";
import { useParams, Link } from "react-router-dom";

export const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const { topic } = useParams();
  console.log(topic);

  useEffect(() => {
    getArticles(topic).then((articleList) => {
      setArticles(articleList.articles);
    });
  }, [topic]);

  return (
    <section>
      <hr className="topLine"></hr>
      {articles.map((article) => {
        return (
          <div className="article" key={article.article_id}>
            <a
              className="topicLink"
              key={article.body}
              href={`/${article.topic}`}
            >
              {article.topic}
            </a>
            <Link
              className="articleLinks"
              to={`articles/${article.article_id}`}
            >
              <h2 key={article.title}>{article.title}</h2>
            </Link>
            <p key={article.author}>{article.author}</p>
            <div className="articleFooter">
              <p key={article.created_at}>
                {new Date(article.created_at).toUTCString()}
              </p>
              <p>upvotes: {article.votes}</p>
            </div>
            <hr></hr>
          </div>
        );
      })}
    </section>
  );
};
