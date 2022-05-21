import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import pollService from './services/polls'

const Header = ({ text }) => <h1 className="display-1 mt-4">{text}</h1>

const Option = ({ id, value, onChangeHandler, onClickHandler }) => {
  return (
    <div className="option-card d-flex mt-2">
      <input id={id} value={value} onChange={onChangeHandler} className="form-control" required />
      <i className="close-btn bi bi-x-lg" onClick={onClickHandler}></i>
    </div>
  )
}

const PollForm = (props) => {
  return (
    <form method="POST" id="form-container" onSubmit={props.savePollHandler} className="container mt-4 col-sm-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
      <input
        id="prompt"
        type="text"
        name="prompt"
        placeholder="Your Prompt Here..."
        className="form-control form-control-lg"
        onChange={props.promptChangeHandler}
        value={props.prompt}
        required
      />

      <div className="mt-2" id="options-container">
        {props.options.map(({ id, value }) => {
          return (
            <Option
              id={id}
              key={id}
              value={value}
              onClickHandler={props.removeOptionHandler}
              onChangeHandler={props.optionChangeHandler}
            />
          )
        })}

        <div id="add-option-card" onClick={props.addOptionHandler} className="option-card mt-2 justify-content-center">
          <i className="bi bi-plus-lg"></i>
        </div>
      </div>

      {props.error ? <div className="mt-2 text-danger">{props.error}</div> : null}

      <input className="btn btn-success btn-lg mt-4 col-12" type="submit" value="Save"/>
    </form>
  )
}

const VerticalContainer = (props) => {
  return <div className="container d-flex flex-column align-items-center">{props.children}</div>
}

const App = () => {
  const [error, setError] = useState(null)
  const [prompt, setPrompt] = useState('')
  const [options, setOptions] = useState([])

  const promptChangeHandler = (event) => setPrompt(event.target.value)

  const optionChangeHandler = ({ target }) => {
    setOptions(options.map((option) => option.id !== target.id ? option : { ...option, value: target.value }))
  }

  const addOptionHandler = () => {
    options.length === 1 && setError(null)
    setOptions([ ...options, { id: uuid(), value: '' } ])
  }

  const removeOptionHandler = ({ target }) => {
    setOptions(options.filter((option) => option.id !== target.previousSibling.id))
  }

  const savePollHandler = (event) => {
    event.preventDefault()
    if (options.length < 2) {
      setError('Please provide atleast 2 options!')
      return
    }
    pollService.create({ prompt, options })
      .then((savedPoll) => {
        console.log(savedPoll)
        setPrompt('')
        setOptions([])
      })
      .catch((response) => console.log(response))
  }

  return (
    <VerticalContainer>
      <Header text="Live Poll"/>
      <PollForm
        error={error}
        prompt={prompt}
        options={options}
        addOptionHandler={addOptionHandler}
        optionChangeHandler={optionChangeHandler}
        promptChangeHandler={promptChangeHandler}
        removeOptionHandler={removeOptionHandler}
        savePollHandler={savePollHandler}
      />
    </VerticalContainer>
  )
}

export default App