import { Outlet } from 'react-router'
import { ToastContainer, Slide } from 'react-toastify'

const Header = () => <h1 className="display-1 mt-4">Live Poll</h1>

const VerticalContainer = (props) => {
  return <main className="container d-flex flex-column align-items-center">{props.children}</main>
}

const App = () => {
  return (
    <VerticalContainer>
      <ToastContainer
        rtl={false}
        autoClose={3000}
        transition={Slide}
        newestOnTop={true}
        closeButton={false}
        position="top-right"
        hideProgressBar
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Header/>
      <Outlet/>
    </VerticalContainer>
  )
}

export default App