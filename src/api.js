import axios from "axios";

export const getTopics = () => {
  return axios
    .get("https://jakes-nc-news-app.herokuapp.com/api/topics")
    .then(({ data }) => {
      return data;
    });
};

export const getArticles = () => {
  return axios
    .get("https://jakes-nc-news-app.herokuapp.com/api/articles")
    .then(({ data }) => {
      return data;
    });
};
