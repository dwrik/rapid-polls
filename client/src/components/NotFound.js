const NotFound = ({ topMargin = 4 }) => {
  return (
    <div className={`container mt-${topMargin} d-flex justify-content-center`}>
      <p className="lead">Oops, there's nothing here!</p>
    </div>
  )
}

export default NotFound