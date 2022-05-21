import axios from 'axios'

const baseUrl = 'http://localhost:3004'

const get = async () => {
  const response = axios.get(`${baseUrl}/polls`)
  return response.then((response) => response.data)
}

const create = async (poll) => {
  const response = axios.post(`${baseUrl}/polls`, poll)
  return response.then((response) => response.data)
}

const pollService = { get, create }
export default pollService
