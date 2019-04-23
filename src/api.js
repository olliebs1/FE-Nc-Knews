import axios from 'axios';
const BASE_URL = 'https://ollie-nc-knews.herokuapp.com/api';


export const fetchAllUsers = async () => {
  const { data } = await axios.get(`${BASE_URL}/users`)
  return data.users
}

export const fetchArticles = async (sortedBy) => {
  const { data } = await axios.get(`${BASE_URL}/articles?${sortedBy}`).catch(err => {
    console.log(err)
  })
  return data.articles
}


export const postNewArticle = async (newArticle) => {
  await axios.post(`${BASE_URL}/articles`, newArticle);
  return newArticle;
}

export const fetchArticleById = async (article_id) => {
  const { data } = await axios.get(`${BASE_URL}/articles/${article_id}`).catch(err => {
    console.log(err)
  })
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
  console.log(deletedComment_id)
  return axios.delete(`${BASE_URL}/comments/${deletedComment_id}`)
}

export const postNewComment = async (article_id, newComment) => {
  const { data } = await axios.post(`${BASE_URL}/articles/${article_id}/comments`, newComment);
  return data.comment;
}