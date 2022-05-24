const Poll = require('../models/poll')
const pollsRouter = require('express').Router()

pollsRouter.get('/', async (request, response) => {
  const polls = await Poll.find({})
  response.status(200).json(polls)
})

pollsRouter.get('/:id', async (request, response) => {
  const poll = await Poll.findById(request.params.id)
  response.status(200).json(poll)
})

pollsRouter.put('/:id', async (request, response) => {
  const { id } = request.params
  const { question, options, state, totalVotes } = request.body

  if (!(question && options && state && totalVotes !== null && totalVotes != undefined)) {
    return response.status(400).json({ error: 'one or more poll properties are missing' })
  }

  const existing = await Poll.findById(id)
  if (existing.state === 'ended') {
    return response.status(400).json({ error: 'poll has already ended' })
  }

  options.forEach((option) => {
    option._id = option.id
    delete option.id
  })

  const modified = { question, options, state, totalVotes }
  const updated = await Poll.findByIdAndUpdate(id, modified, { new: true, runValidators: true })
  response.json(updated)
})

pollsRouter.post('/', async (request, response) => {
  const { question, options, state } = request.body
  const poll = new Poll({ question, options, state })
  const saved = await poll.save()
  response.status(201).json(saved)
})

module.exports = pollsRouter