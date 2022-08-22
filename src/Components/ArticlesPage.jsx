import { useState, useEffect } from "react";
import { getArticles } from "../api";

export const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then((articleList) => {
      setArticles(articleList.articles);
    });
  }, []);

  return (
    <section>
      {articles.map((article) => {
        return (
          <div>
            <h2 key={article.article_id}>{article.title}</h2>
            <p>{article.author}</p>
            <p>{article.created_at}</p>
            <hr></hr>
          </div>
        );
      })}
    </section>
  );
};
