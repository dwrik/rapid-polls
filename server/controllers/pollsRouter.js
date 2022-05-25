const Poll = require('../models/poll')
const pollsRouter = require('express').Router()
const middleware = require('../utils/middleware')
const { client } = require('../databases/redis')

pollsRouter.get('/', async (request, response) => {
  const polls = await Poll.find({})
  response.status(200).json(polls)
})

pollsRouter.get('/:id', middleware.pollRetriever, async (request, response) => {
  const poll = request.poll ?? await Poll.findById(request.params.id)
  response.status(200).json(poll)
})

pollsRouter.put('/:id', middleware.pollRetriever, async (request, response) => {
  const { id } = request.params
  const { question, options, state, totalVotes } = request.body

  if (!(question && options && state && totalVotes !== null && totalVotes != undefined)) {
    return response.status(400).json({ error: 'one or more poll properties are missing' })
  }

  const existing = await Poll.findById(id)
  if (existing.state === 'ended') {
    return response.status(400).json({ error: 'poll has already ended' })
  }

  if (state === 'ended') {
    global.io.to(id).emit('poll-ended')
    global.io.in(id).disconnectSockets(true)
    await client.DEL(`polls/${id}`)
    await client.DEL(`options/${id}`)
  }

  const changes = request.poll !== null
    ? { ...request.poll, state }
    : { state }

  const updated = await Poll.findByIdAndUpdate(id, changes, { new: true, runValidators: true })
  response.json(updated)
})

pollsRouter.post('/', async (request, response) => {
  const { question, options, state } = request.body
  const poll = new Poll({ question, options, state })
  const saved = await poll.save()
  response.status(201).json(saved)
})

module.exports = pollsRouter