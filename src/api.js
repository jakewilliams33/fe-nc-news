import axios from "axios";

export const getTopics = () => {
  return axios
    .get("https://jakes-nc-news-app.herokuapp.com/api/topics")
    .then(({ data }) => {
      return data;
    });
};

export const getArticles = (topic) => {
  if (topic) {
    return axios
      .get(
        `https://jakes-nc-news-app.herokuapp.com/api/articles?topic=${topic}`
      )
      .then(({ data }) => {
        return data;
      });
  } else {
    return axios
      .get(`https://jakes-nc-news-app.herokuapp.com/api/articles`)
      .then(({ data }) => {
        return data;
      });
  }
};

export const getSingleArticle = (article_id) => {
  return axios
    .get(`https://jakes-nc-news-app.herokuapp.com/api/articles/${article_id}`)
    .then(({ data }) => {
      return data.article;
    });
};

export const updateVotes = (article_id, voteUpdate) => {
  axios
    .patch(
      `https://jakes-nc-news-app.herokuapp.com/api/articles/${article_id}`,
      voteUpdate
    )
    .then(({ data }) => {
      return data.article;
    });
};

export const getCommentsByArticle = (article_id) => {
  return axios
    .get(
      `https://jakes-nc-news-app.herokuapp.com/api/articles/${article_id}/comments`
    )
    .then(({ data }) => {
      return data.comments;
    });
};
