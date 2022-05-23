import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import pollService from '../services/poll'
import NotFound from './NotFound'

const PollSwitch = ({ poll, setPoll }) => {
  const togglePoll = () => {
    const modified = { ...poll, active: !poll.active }
    pollService.update(modified)
      .then((updated) => {
        setPoll(updated)
        updated.active
          ? toast.success('Poll started')
          : toast.error('Poll ended')
      })
  }

  return (
    <div className="form-check form-switch">
      <input className="form-check-input" type="checkbox" role="switch" id="poll-switch" defaultChecked={poll.active} onChange={togglePoll}/>
    </div>
  )
}

const Option = ({ id, value }) => {
  return (
    <div id={id} className="option-card option-card-result mt-2">
      <div className='option-background'></div>
      <div className='option-text'>{value}</div>
    </div>
  )
}

const PollResults = ({ canManage }) => {
  const [poll, setPoll] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    pollService.get(id)
      .then((poll) => setPoll(poll))
      .catch((response) => console.log(response))
  }, [id])

  if (poll === null) {
    return <NotFound topMargin={0}/>
  }

  // socket.io code here

  return (
    <div id="poll-container" className="container mt-4 col-sm-12 col-md-10 col-lg-7 col-xl-7 col-xxl-7">
      <div className="d-flex justify-content-between align-items-center">
        <div id="question" className="">{poll.question}</div>
        {canManage ? <PollSwitch poll={poll} setPoll={setPoll}/> : null}
      </div>
      <div className="mt-4" id="options-container">
        {poll.options.map(({ id, value }) => {
          return <Option id={id} key={id} value={value} />
        })}
      </div>
    </div>
  )
}

export default PollResults