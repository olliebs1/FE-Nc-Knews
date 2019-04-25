import axios from 'axios';
const BASE_URL = 'https://ollie-nc-knews.herokuapp.com/api';


export const fetchAllUsers = async () => {
  const { data } = await axios.get(`${BASE_URL}/users`)
  return data.users
}

export const fetchArticles = async (topic, sortedBy, order) => {
  const response = await axios.get(`${BASE_URL}/articles`,
    {
      params: {
        sort_by: sortedBy,
        topic,

      }
    }
  )
  return response.data.articles
}


export const postNewArticle = async (newArticle) => {
  await axios.post(`${BASE_URL}/articles`, newArticle);
  return newArticle;
}

export const fetchArticleById = async (article_id) => {
  const { data } = await axios.get(`${BASE_URL}/articles/${article_id}`)
  return data.article
}

export const deleteArticle = (article_id) => {
  return axios.delete(`${BASE_URL}/articles/${article_id}`)
}

export const getAllComments = async (article_id) => {
  const { data } = await axios.get(`${BASE_URL}/articles/${article_id}/comments`).catch(err => {
    console.log(err)
  })
  return data.comments
}

export const deleteComment = (deletedComment_id) => {
  return axios.delete(`${BASE_URL}/comments/${deletedComment_id}`)
}

export const postNewComment = async (article_id, newComment) => {
  const { data } = await axios.post(`${BASE_URL}/articles/${article_id}/comments`, newComment);
  return data.comment;
}

export const getTopics = async () => {
  const { data } = await axios.get(`${BASE_URL}/topics`)
  return data.topics
}

export const postTopic = async (newPostTopic) => {
  const { data } = await axios.post(`${BASE_URL}/topics`, newPostTopic)
  return data.topic
}

export const patchArticleVote = async (article_id, newVote) => {
  const patchedVote = { inc_votes: newVote }
  const { data } = await axios.patch(`${BASE_URL}/articles/${article_id}`, patchedVote)
  return data
}

export const patchCommentVote = async (comment_id, newVote) => {
  const patchedVote = { inc_votes: newVote }
  const { data } = await axios.patch(`${BASE_URL}/comments/${comment_id}`, patchedVote)
  return data
}

export const postUser = async (newUser) => {
  const { data } = await axios.post(`${BASE_URL}/users`, newUser)
  return data.user
}