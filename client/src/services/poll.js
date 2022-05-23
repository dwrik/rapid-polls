import axios from 'axios'

const baseUrl = '/api/polls'

const get = async (id) => {
  const response = axios.get(`${baseUrl}/${id}`)
  return response.then((response) => response.data)
}

const create = async (poll) => {
  const response = axios.post(baseUrl, poll)
  return response.then((response) => response.data)
}

const update = async (modified) => {
  const response = axios.put(`${baseUrl}/${modified.id}`, modified)
  return response.then((response) => response.data)
}

const pollService = { get, create, update }
export default pollService
