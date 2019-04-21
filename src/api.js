import axios from 'axios';
const BASE_URL = 'https://ollie-nc-knews.herokuapp.com/api';


export const fetchAllUsers = async () => {
  const { data } = await axios.get(`${BASE_URL}/users`)
  return data.users
}

export const fetchArticles = async (sortBy) => {
  const { data } = await axios.get(`${BASE_URL}/articles?${sortBy}`).catch(err => {
    console.log(err)
  })
  console.log(data.articles)
  return data.articles
}


export const postNewArticle = async (newArticle) => {
  await axios.post(`${BASE_URL}/articles`, newArticle);
  return newArticle;
}