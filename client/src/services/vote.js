import axios from 'axios'

const baseUrl = '/api/votes'

const vote = (id, option) => {
  const response = axios.post(`${baseUrl}/${id}`, option)
  return response.then((response) => response.data)
}

const voteService = { vote }
export default voteService