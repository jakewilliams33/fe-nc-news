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
