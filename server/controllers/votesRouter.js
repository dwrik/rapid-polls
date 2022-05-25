const Poll = require('../models/poll')
const votesRouter = require('express').Router()
const middleware = require('../utils/middleware')
const { client } = require('../databases/redis')

const parseData = (sortedData) => {
  const options = []
  let totalVotes = 0
  for (let i = 0; i < sortedData.length; i += 2) {
    const [id, ...valueParts] = sortedData[i].split(' ')
    const value = valueParts.join(' ')
    const count = Number(sortedData[i + 1])
    options.push({ id, value, count })
    totalVotes += count
  }
  return [ options, totalVotes ]
}

votesRouter.post('/:id', middleware.pollRetriever, async (request, response) => {
  const { id } = request.params
  const { option } = request.body

  const poll = request.poll ?? await Poll.findById(id)

  if (poll.state !== 'started') {
    return response.status(400).send({ error: 'Poll is currently not active' })
  }

  await client.ZINCRBY(`options/${id}`, 1, `${option.id} ${option.value}`)
  const sortedData = await client.sendCommand(['ZREVRANGE', `options/${id}`, '0', '-1', 'WITHSCORES'])
  const [sortedOptions, totalVotes] = parseData(sortedData)

  poll.options = sortedOptions
  poll.totalVotes = totalVotes

  await client.SET(`polls/${id}`, JSON.stringify(poll))
  global.io.to(id).volatile.emit('poll-updated', poll)
  response.status(204).end()
})

module.exports = votesRouter