import PollResults from '../components/PollResults'

const View = () => {
  return (
    <div className="container mt-4">
      <PollResults canManage={false}/>
    </div>
  )
}

export default View