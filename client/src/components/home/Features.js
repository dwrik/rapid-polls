const Feature = ({ title, description}) => {
  return (
    <div className="col-sm-8 col-md-8 col-lg-3 mt-4">
      <h4 className="text-center">{title}</h4>
      <p className="lead text-center mt-2">{description}</p>
    </div>
  )
}

const Features = () => {
  return (
    <div className="mt-5">
      <h2 className="mt-4 text-center">What can you expect?</h2>
      <div className="mt-4 row d-sm-flex flex-sm-column align-items-sm-center flex-lg-row justify-content-lg-center"> 
        <Feature title="Results in real-time" description="Your poll results are visualized in real-time using progress bars and leaderboard rankings so that you're always caught up."/>
        <Feature title="No links, no problem" description="Want to invite your audience to a poll while you're streaming? Or maybe just don't feel like sharing a link? Use the QR instead."/>
        <Feature title="Absolutely no frills" description="I hate ads as much as you do and so one of my primary objectives while creating this app was to make sure that it was clean and minimal."/>
      </div>
      </div>
  )
}

export default Features