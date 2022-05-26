import { useState, useEffect, forwardRef } from 'react'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import { io } from 'socket.io-client'
import FlipMove from 'react-flip-move'
import pollService from '../services/poll'
import Error from './Error'

const PollSwitch = ({ poll, setPoll }) => {
  const togglePoll = () => {
    const modified = {
      ...poll,
      state: poll.state === 'prior' ? 'started' : 'ended'
    }
    pollService.update(modified)
      .then((updated) => {
        setPoll(updated)
        updated.state === 'started'
          ? toast.success('Poll started')
          : toast.error('Poll ended')
      })
      .catch((error) => console.log(error))
  }

  return (
    <div className="form-check form-switch">
      <input className="form-check-input" type="checkbox" role="switch" id="poll-switch" defaultChecked={poll.state === 'started'} onChange={togglePoll}/>
    </div>
  )
}

const Option = forwardRef(({ id, value, count, total }, ref) => {
  const percentage = Math.round((count / total) * 100)
  return (
    <div id={id} ref={ref} className="option-card option-card-result mt-2">
      <div className='option-background' style={{width: `${percentage}%`}}></div>
      <div className="w-100 d-flex justify-content-between align-items-center position-absolute px-3">
        <div>{value}</div>
        <div className="percentage-text">
          <b>{percentage}%</b>
        </div>
      </div>
    </div>
  )
})

const PollResults = ({ canManage }) => {
  const [poll, setPoll] = useState(null)
  const { id } = useParams()

  // const getRandomColor = () => {
  //   return `hsl(${(Math.random() * 360) + 0}, 60%, 50%)`
  // }

  useEffect(() => {
    pollService.get(id)
      .then((poll) => {
        if (poll.state !== 'ended') {
          const socket = io()
          socket.on('poll-updated', (poll) => setPoll(poll))
          socket.on('send-poll-id', () => socket.emit('poll-id-sent', poll.id))
          socket.on('poll-ended', () => socket.disconnect() && console.log('disconnected from socket.io server'))
        }
        setPoll(poll)
      })
      .catch((response) => {
        console.log(response)
      })
  }, [id])

  if (poll === null) {
    return <Error topMargin={0}/>
  }

  return (
    <div id="poll-container" className="container mt-4 col-sm-12 col-md-10 col-lg-7 col-xl-7 col-xxl-7">
      <div className="d-flex justify-content-between align-items-center">
        <div id="question" className="">{poll.question}</div>
        {canManage && poll.state !== 'ended' ? <PollSwitch poll={poll} setPoll={setPoll}/> : null}
      </div>
      <div className="mt-4" id="options-container">
        <FlipMove duration="650">
          {poll.options.map(({ id, value, count }) => {
            return <Option id={id} key={id} value={value} count={count} total={poll.totalVotes}/>
          })}
        </FlipMove>
      </div>
    </div>
  )
}

export default PollResults