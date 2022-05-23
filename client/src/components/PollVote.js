import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import NotFound from './NotFound'
import pollService from '../services/poll'

const Option = ({ id, value, onClick, isSelected }) => {
  return (
    <div id={id} onClick={onClick} className={`option-card option-card-vote mt-2 ${isSelected ? 'selected' : null}`}>
      {value}
    </div>
  )
}

const PollVote = () => {
  const [poll, setPoll] = useState(null)
  const [optionId, setOptionId] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    pollService.get(id)
      .then((poll) => setPoll(poll))
      .catch((response) => console.log(response))
  }, [id])

  const changeOptionId = (event) => {
    setOptionId(event.target.id)
  }

  const castVote = () => {
    // api call for voting
    // two different ways:
    //  - update entire poll object
    //  - send only the poll id and option id in payload

    // upon successfull voting:
    //  - thank you message
    //  - link to results page

    // if poll present but poll is not
    // active show a poll ended message
  }

  if (poll === null) {
    return <NotFound topMargin={0}/>
  }

  return (
    <form method="POST" id="poll-container" onSubmit={castVote} className="container mt-4 col-sm-12 col-md-10 col-lg-8 col-xl-7 col-xxl-7">
      <div className="d-flex justify-content-between align-items-center">
        <div id="question" className="">{poll.question}</div>
      </div>

      <div className="mt-4" id="options-container">
        {poll.options.map(({ id, value }) => {
          return <Option id={id} key={id} value={value} onClick={changeOptionId} isSelected={id === optionId}/>
        })}
      </div>

      <input className="btn btn-success btn-lg mt-4 col-12" type="submit" value="Vote"/>
    </form>
  )
}

export default PollVote