import { useState, forwardRef, useRef } from 'react'
import { useNavigate } from 'react-router'
import { v4 as uuid } from 'uuid'
import { toast } from 'react-toastify'
import FlipMove from 'react-flip-move'
import pollService from '../services/poll'

const Option = forwardRef(({ id, value, onChange, onClick }, ref) => {
  const inputRef = useRef(null)
  const focusInput = () => inputRef.current.focus()

  return (
    <div className="option-card d-flex mt-2" onClick={focusInput} ref={ref}>
      <input id={id} value={value} onChange={onChange} className="form-control" ref={inputRef} required/>
      <i className="close-btn bi bi-x-lg" onClick={onClick}></i>
    </div>
  )
})

const PollForm = () => {
  const [error, setError] = useState(null)
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState([])
  const navigate = useNavigate()

  const changeQuestion = (event) => {
    setQuestion(event.target.value)
  }

  const changeOption = ({ target }) => {
    setOptions(options.map((option) => option.id !== target.id ? option : { ...option, value: target.value }))
  }

  const addOption = () => {
    options.length === 1 && setError(null)
    setOptions([ ...options, { id: uuid(), value: '', count: 0 } ])
  }

  const removeOption = ({ target }) => {
    setOptions(options.filter((option) => option.id !== target.previousSibling.id))
  }

  const savePoll = (event) => {
    event.preventDefault()
    if (options.length < 2) {
      setError('Please provide atleast 2 options!')
      return
    }
    pollService.create({ question, options, active: false })
      .then((saved) => {
        console.log(saved)
        setQuestion('')
        setOptions([])
        toast.success('Poll created')
        navigate(`/manage/${saved.id}`)
      })
      .catch((response) => console.log(response))
  }

  return (
    <form method="POST" id="poll-container" onSubmit={savePoll} className="container mt-4 col-sm-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
      <input value={question} onChange={changeQuestion} id="question" type="text" name="question" placeholder="Your question here..." className="form-control form-control-lg" required/>

      <div className="mt-2" id="options-container">
        <FlipMove duration="650">
          {options.map(({ id, value }) => {
            return <Option key={id} id={id} value={value} onChange={changeOption} onClick={removeOption}/>
          })}
        </FlipMove>

        <div id="add-option-card" onClick={addOption} className="option-card mt-2 justify-content-center">
          <i className="bi bi-plus-lg"></i>
        </div>
      </div>

      {error ? <div className="mt-2 text-danger">{error}</div> : null}

      <input className="btn btn-success btn-lg mt-4 col-12" type="submit" value="Save"/>
    </form>
  )
}

export default PollForm