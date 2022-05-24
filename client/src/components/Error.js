const Error = ({ message = "Oops, there's nothing here!", topMargin = 4, children }) => {
  return (
    <div className={`container mt-${topMargin} d-flex justify-content-center`}>
      {children ?? <p className="lead">{message}</p>}
    </div>
  )
}

export default Error