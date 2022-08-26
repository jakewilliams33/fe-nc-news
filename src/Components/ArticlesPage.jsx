import { useState, useEffect } from "react";
import { getArticles } from "../api";
import { useParams, Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import ErrorPage from "./ErrorPage";

export const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [queryStr, setQueryStr] = useState();
  const { topic } = useParams();
  const [error, setError] = useState(null);

  let placeholder = "";

  if (typeof topic === "string") {
    placeholder = topic + "/";
  }

  const navigate = useNavigate();

  const handleQuery = (event) => {
    setQueryStr(`sort_by=${event.value}`);
    navigate(`/${placeholder}${event.url}`, { replace: true });
  };

  useEffect(() => {
    getArticles(topic, queryStr)
      .then((articleList) => {
        console.log(queryStr);
        setArticles(articleList.articles);
      })
      .catch((err) => {
        setError({ err });
      });
  }, [topic, queryStr]);

  const options = [
    { url: "sort/1", value: "created_at&order=desc", label: "newest" },
    { url: "sort/2", value: "created_at&order=asc", label: "oldest" },
    { url: "sort/3", value: "title&order=asc", label: "title" },
    { url: "sort/4", value: "votes", label: "votes" },
    { url: "sort/5", value: "comment_count", label: "comments" },
  ];

  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <section>
      <Select className="sortBy" options={options} onChange={handleQuery} />
      <hr className="topLine"></hr>
      {articles.map((article) => {
        return (
          <div className="article" key={article.article_id}>
            <a
              className="topicLink"
              key={article.body}
              href={`/articles/${article.topic}`}
            >
              {article.topic}
            </a>
            <Link
              className="articleLinks"
              to={`/article/${article.article_id}`}
            >
              <h2 key={article.title}>{article.title}</h2>
            </Link>
            <p key={article.author}>{article.author}</p>
            <div className="articleFooter">
              <p key={article.created_at}>
                {new Date(article.created_at).toUTCString()}
              </p>
              <p>votes: {article.votes}</p>
            </div>
            <hr></hr>
          </div>
        );
      })}
    </section>
  );
};
