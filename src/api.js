import axios from "axios";

export const getTopics = () => {
  return axios
    .get("https://jakes-nc-news.onrender.com/api/topics")
    .then(({ data }) => {
      return data;
    });
};

export const getArticles = (topic, queryStr) => {
  const queryOption = queryStr ? queryStr : "";
  const topicOption = topic ? `?topic=${topic}` : "";
  const andOr = topic ? "&" : "?";
  return axios
    .get(
      `https://jakes-nc-news.onrender.com/api/articles${topicOption}${andOr}${queryOption}`
    )
    .then(({ data }) => {
      return data;
    });
};

export const getSingleArticle = (article_id) => {
  return axios
    .get(`https://jakes-nc-news.onrender.com/api/articles/${article_id}`)
    .then(({ data }) => {
      return data.article;
    });
};

export const updateVotes = (article_id, voteUpdate) => {
  axios
    .patch(
      `https://jakes-nc-news.onrender.com/api/articles/${article_id}`,
      voteUpdate
    )
    .then(({ data }) => {
      return data.article;
    });
};

export const getCommentsByArticle = (article_id) => {
  return axios
    .get(
      `https://jakes-nc-news.onrender.com/api/articles/${article_id}/comments`
    )
    .then(({ data }) => {
      return data.comments;
    });
};

export const postComment = (article_id, newComment) => {
  axios.post(
    `https://jakes-nc-news.onrender.com/api/articles/${article_id}/comments`,
    newComment
  );
};

export const deleteThisComment = (comment_id) => {
  axios.delete(`https://jakes-nc-news.onrender.com/api/comments/${comment_id}`);
};
