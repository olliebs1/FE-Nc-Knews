import React from 'react'
import { navigate } from '@reach/router/lib/history';

const InvalidInputError = () => {
  return (
    <div>
      <h1>Error, Input fields cannot be empty!</h1>
      <button onClick={handleClick}>Return</button>
    </div>
  )
}

const handleClick = (event) => {
  event.preventDefault();
  return navigate('/newArticle')
}

export default InvalidInputError