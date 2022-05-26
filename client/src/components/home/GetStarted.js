import { Link } from 'react-router-dom'

const GetStarted = () => {
  return (
    <div className="mt-5 text-center">
      <h2 className="mt-2 text-center">Ready to create a poll?</h2>
      <Link to="/create">
        <button className="btn btn-success btn-lg mt-3">Get started right away!</button>
      </Link>
    </div>
  )
}

export default GetStarted