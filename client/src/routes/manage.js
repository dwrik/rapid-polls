import PollResults from '../components/PollResults'
import PollLinks from '../components/PollLinks'

const Manage = () => {
  return (
    <div className="container mt-4 col-12">
      <div className="row">
        <PollResults canManage={true}/>
        <PollLinks/>
      </div>
    </div>
  )
}

export default Manage