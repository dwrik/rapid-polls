import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import Error from './Error'
import pollService from '../services/poll'
import voteService from '../services/vote'

const Option = ({ id, value, onClick, isSelected }) => {
  return (
    <div id={id} onClick={onClick} className={`option-card option-card-vote mt-2 ${isSelected ? 'selected' : null}`}>
      {value}
    </div>
  )
}

const PollVote = () => {
  const [poll, setPoll] = useState(null)
  const [option, setOption] = useState(null)
  const [error, setError] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    pollService.get(id)
      .then((poll) => setPoll(poll))
      .catch((response) => console.log(response))
  }, [id])

  const changeOption = (event) => {
    const [option] = poll.options.filter((option) => option.id === event.target.id)
    setOption(option)
    setError(null)
  }

  const castVote = (event) => {
    event.preventDefault()
    if (option === null) {
      setError('Please select an option first')
      return
    }
    voteService.vote(id, option)
      .then((response) => {
        console.log(response)
        // upon successfull voting:
        //  - thank you message
        //  - link to results page
      })
      .catch((error) => setError(error.response.data.error))
  }

  if (poll === null) {
    return <Error topMargin={0}/>
  }
  
  if (poll.state === 'prior') {
    return (
      <Error>
        <p className='lead text-center'>
          You're a bit too early.<br/>
          The poll hasn't started yet!
        </p>
      </Error>
    )
  }
  
  if (poll.state === 'ended') {
    return (
      <Error>
        <p className='lead text-center'>
          Seems like you're a bit too late.<br/>
          The poll has already ended {':('}
        </p>
      </Error>
    )
  }

  return (
    <form method="POST" id="poll-container" onSubmit={castVote} className="container mt-4 col-sm-12 col-md-10 col-lg-8 col-xl-7 col-xxl-7">
      <div className="d-flex justify-content-between align-items-center">
        <div id="question" className="">{poll.question}</div>
      </div>

      <div className="mt-4" id="options-container">
        {poll.options.map(({ id, value }) => {
          return <Option id={id} key={id} value={value} onClick={changeOption} isSelected={option != null && id === option.id}/>
        })}
      </div>

      {error ? <div className="mt-2 text-danger">{error}</div> : null}

      <input className="btn btn-success btn-lg mt-4 col-12" type="submit" value="Vote"/>
    </form>
  )
}

export default PollVote