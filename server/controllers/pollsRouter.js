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
  const updated = await Poll.findByIdAndUpdate(id, request.body, { new: true, runValidators: true })
  response.json(updated)
})

pollsRouter.post('/', async (request, response) => {
  const { question, options, active } = request.body
  const poll = new Poll({ question, options, active })
  const saved = await poll.save()
  response.status(201).json(saved)
})

module.exports = pollsRouter